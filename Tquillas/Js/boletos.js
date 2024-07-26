document.addEventListener('DOMContentLoaded', () => {
    var tbodyrsumeefectiivo = document.getElementById("table-descarga-boletos").getElementsByTagName('tbody')[0];
    var datais = localStorage.getItem("datosInternetsale");
    datais = JSON.parse(datais);

    var dataviaje = localStorage.getItem("datos_viaje");
    var datosCombinados = JSON.parse(dataviaje);
    var folio = localStorage.getItem('folio');

    fetch(`http://apitaquillassag.dyndns.org/Home/ConsultaBoletos?folio=${folio}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loaderboletos').style.display = 'none';
            document.getElementById('section-tabla-boletos').style.display = 'block';

            console.log(data);

            data.forEach(e => {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    `
                        <td>${e.Origin}</td>
                        <td>${e.Destination}</td>
                        <td>${datosCombinados.departingOrigen}</td>
                        <td>${datosCombinados.bus}</td> 
                        <td>${e.PassengerName}</td>
                        <td>${e.PassengerType}</td>
                        <td>${e.TicketId}</td>
                        <td>${e.SeatName}</td>
                        <td>${e.SoldPrice}</td>
                        <td><button class="btn btn-dark" onclick="Descargar('${folio}', '${e.PassengerName}', '${e.Origin}', '${e.Destination}', '${datosCombinados.departingOrigen}', '${datosCombinados.bus}', '${e.PassengerType}', '${e.SeatName}', ${e.SoldPrice});"> <ion-icon name="download-outline"></ion-icon>Descargar</button></td>
                    `;

                tbodyrsumeefectiivo.appendChild(tr);
            });
        });
});

function generateQRCode(text) {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, (error, url) => {
            if (error) reject(error);
            resolve(url);
        });
    });
}

async function Descargar(folio, pasajero, origen, destino, departingOrigen, bus, tipo, asiento, precio) {
    try {
        // Descargar el formulario PDF
        const url = '/Assets/formticket.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name');
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
        var datosViajeString = localStorage.getItem("datos_viaje");
        var datosViajeObj = JSON.parse(datosViajeString);
        const precio_base = datosViajeObj.precio;
        const llegada = datosViajeObj.departingDestino;
        const corrida = datosViajeObj.corrida;

        // Obtener la fecha actual
        const fechaActual = new Date();
        const día = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const año = fechaActual.getFullYear();
        const fechaFormateada = `${día < 10 ? '0' : ''}${día}-${mes < 10 ? '0' : ''}${mes}-${año}`;

        const total = String(precio);

        // Obtener el formulario del PDF
        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('passenger_name').setText(pasajero);
        form.getTextField('origen').setText(origen);
        form.getTextField('ticket_id').setText(folio);
        form.getTextField('seat').setText(asiento);
        form.getTextField('Destino').setText(destino);
        form.getTextField('departure_origen').setText(departingOrigen);
        form.getTextField('fecha').setText(fechaFormateada);
        form.getTextField('saleman_name').setText(taquillero);
        form.getTextField('subtotal').setText(precio_base);
        form.getTextField('departure_destino').setText(llegada);
        form.getTextField('total').setText(total);
        form.getTextField('product').setText(corrida);
        form.getTextField('passenger_type').setText(tipo);

        // Hacer los campos de solo lectura
        ['ticket_id', 'passenger_name', 'passenger_type', 'origen', 'seat', 'Destino', 'departure_origen', 'fecha', 'saleman_name', 'subtotal', 'departure_destino', 'total', 'product'].forEach(field => form.getTextField(field).enableReadOnly());

        // Generar el código QR con el mensaje "hola"
        const qrCodeDataURL = await generateQRCode(folio);
        const qrImageBytes = await fetch(qrCodeDataURL).then(res => res.arrayBuffer());
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        // Obtener el campo de imagen 'qr' y establecer la imagen del código QR
        const qrField = form.getButton('qr_af_image');
        qrField.setImage(qrImage);

        // Agregar la marca de agua
        const watermarkImageBytes = await fetch('/Assets/logoSag.png').then(res => res.arrayBuffer());
        const watermarkImage = await pdfDoc.embedPng(watermarkImageBytes);
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            const { width, height } = page.getSize();
            const watermarkWidth = watermarkImage.width / 6;
            const watermarkHeight = watermarkImage.height / 6;
            const x = (width - watermarkWidth) / 2;
            const y = (height - watermarkHeight) / 2;
            page.drawImage(watermarkImage, {
                x: x,
                y: y,
                width: watermarkWidth,
                height: watermarkHeight,
                opacity: 0.2,
            });
        }

        // Generar un nuevo PDF con los datos ingresados
        const pdfBytes = await pdfDoc.save();

        // Descargar el PDF resultante
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const urlObject = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = `${folio}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error:', error);
    }
}