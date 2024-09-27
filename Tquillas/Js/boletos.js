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

                let passengerTypeText;

                switch (e.PassengerType) {
                    case 'ADULT':
                        passengerTypeText = 'Adulto';
                        break;
                    case 'CHILD':
                        passengerTypeText = 'Niño';
                        break;
                    case 'STUDENT':
                        passengerTypeText = 'Estudiante';
                        break;
                    case 'OLDER_ADULT':
                        passengerTypeText = 'Inapam';
                        break;
                    case 'OLDER ADULT':
                        passengerTypeText = 'Inapam';
                        break;
                    default:
                        passengerTypeText = 'Tipo desconocido'; // Manejo de casos no esperados
                }


                tr.innerHTML =
                    `
                        <td>${e.Origin}</td>
                        <td>${e.Destination}</td>
                        <td>${datosCombinados.departingOrigen}</td>
                        <td>${datosCombinados.bus}</td> 
                        <td>${e.PassengerName}</td>
                        <td>${passengerTypeText}</td>
                        <td>${e.TicketId}</td>
                        <td>${e.SeatName}</td>
                        <td>${e.SoldPrice}</td>
                        <td><button class="btn btn-dark" id="btn-download" onclick="Descargar('${e.TicketId}', '${e.PassengerName}', '${e.Origin}', '${e.Destination}', '${datosCombinados.departingOrigen}', '${datosCombinados.bus}', '${passengerTypeText}', '${e.SeatName}', ${e.SoldPrice});"> <ion-icon name="download-outline"></ion-icon>Descargar</button></td>
                    `;

                tbodyrsumeefectiivo.appendChild(tr);
            });
        });
});


function generateQRCode(text) {
    return new Promise((resolve, reject) => {
        try {
            const div = document.createElement('div');
            new QRCode(div, {
                text: text,
                width: 128,
                height: 128,
                errorCorrectionLevel: 'H'
            });

            setTimeout(() => {
                const canvas = div.querySelector('canvas');
                if (canvas) {
                    canvas.toBlob(blob => {
                        const reader = new FileReader();
                        reader.onloadend = function () {
                            resolve(new Uint8Array(reader.result));
                        }
                        reader.readAsArrayBuffer(blob);
                    });
                } else {
                    const img = div.querySelector('img');
                    if (img) {
                        fetch(img.src)
                            .then(res => res.arrayBuffer())
                            .then(buffer => resolve(new Uint8Array(buffer)))
                            .catch(reject);
                    } else {
                        reject(new Error('No se pudo generar el QR'));
                    }
                }
            }, 100);
        } catch (error) {
            console.error("Error en generateQRCode:", error);
            reject(error);
        }
    });
}

async function Descargar(folio, pasajero, origen, destino, departingOrigen, bus, tipo, asiento, precio) {
    try {
        document.getElementById('btn-download').textContent = "Descargando...";

        const url = '/Assets/formticket.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

        const taquillero = localStorage.getItem('name');
        var datosViajeString = localStorage.getItem("datos_viaje");
        var datosViajeObj = JSON.parse(datosViajeString);
        const precio_base = datosViajeObj.precio;
        const llegada = datosViajeObj.departingDestino;
        const corrida = datosViajeObj.corrida;

        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

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
        form.getTextField('total').setText(String(precio));
        form.getTextField('product').setText(corrida);
        form.getTextField('passenger_type').setText(tipo);

        // Hacer los campos de solo lectura
        ['passenger_name', 'origen', 'ticket_id', 'seat', 'Destino', 'departure_origen', 'fecha',
            'saleman_name', 'subtotal', 'departure_destino', 'total', 'product', 'passenger_type'].forEach(field => {
                const textField = form.getTextField(field);
                if (textField) {
                    textField.enableReadOnly();
                } else {
                    console.warn(`Campo no encontrado: ${field}`);
                }
            });

        // Generar y añadir el QR
        console.log("Generando QR para:", folio);
        const qrImageBytes = await generateQRCode(folio);
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        const qrField = form.getButton('qr_af_image');
        if (qrField) {
            qrField.setImage(qrImage);
            console.log("QR añadido al campo 'qr_af_image'");
        } else {
            console.warn("Campo 'qr_af_image' no encontrado. Insertando QR en la página.");
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            firstPage.drawImage(qrImage, {
                x: 50,
                y: 50,
                width: 100,
                height: 100,
            });
        }

        // Añadir marca de agua
        const watermarkImageBytes = await fetch('/Assets/logoSag.png').then(res => res.arrayBuffer());
        const watermarkImage = await pdfDoc.embedPng(watermarkImageBytes);
        const pages = pdfDoc.getPages();
        pages.forEach(page => {
            const { width, height } = page.getSize();
            page.drawImage(watermarkImage, {
                x: (width - watermarkImage.width / 6) / 2,
                y: (height - watermarkImage.height / 6) / 2,
                width: watermarkImage.width / 6,
                height: watermarkImage.height / 6,
                opacity: 0.2,
            });
        });
        console.log("Marca de agua añadida");

        // Generar y descargar el PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const urlObject = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = urlObject;
        link.download = `${folio}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        document.getElementById('btn-download').textContent = "Volver a Descargar";

        // Abrir el PDF en una nueva pestaña
        setTimeout(() => {
            window.open(urlObject, '_blank');
        }, 1000);

    } catch (error) {
        console.error("Error al descargar el PDF:", error);
        document.getElementById('btn-download').textContent = "Error al descargar";
    }
}