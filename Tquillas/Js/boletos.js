let pdfDocs = [];
let nombre_pdf_comb = "";
document.addEventListener('DOMContentLoaded', async function () {
    var tbodyrsumeefectiivo = document.getElementById("table-descarga-boletos").getElementsByTagName('tbody')[0];
    var datais = localStorage.getItem("datosInternetsale");
    datais = JSON.parse(datais);

    var dataviaje = localStorage.getItem("datos_viaje");
    var datosCombinados = JSON.parse(dataviaje);
    var folio = localStorage.getItem('folio');

    await fetch(`http://apitaquillassag.dyndns.org/Home/ConsultaBoletos?folio=${folio}`)
        .then(response => response.json())
        .then(async data => {  // Cambié a async para usar await dentro de la función
            document.getElementById('loaderboletos').style.display = 'none';
            document.getElementById('section-tabla-boletos').style.display = 'block';
            let tam = data.length;
            let cont = 0;
            console.log(data);

            for (const e of data) {  // Usamos 'for...of' para iterar
                cont++;
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

                var tr = document.createElement('tr');
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
                nombre_pdf_comb += e.TicketId;
                if (cont != tam) {
                    nombre_pdf_comb += ", ";
                }
                // Esperar a que la función Descargar termine antes de continuar
                await Descargar(e.TicketId, e.PassengerName, e.Origin, e.Destination, datosCombinados.departingOrigen, datosCombinados.bus, passengerTypeText, e.SeatName, e.SoldPrice);
            }
            combinarPDFs(pdfDocs, nombre_pdf_comb);
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

        let fechas = new Date(departingOrigen);

        // Extraemos el día, mes, año, horas, minutos y segundos
        let dia = fechas.getDate();
        let mes = fechas.getMonth() + 1; // Los meses en JavaScript empiezan en 0 (enero = 0)
        let anio = fechas.getFullYear();
        let horas = fechas.getHours();
        let minutos = fechas.getMinutes();
        let segundos = fechas.getSeconds();

        // Formateamos los valores a dos dígitos (añadiendo ceros si es necesario)
        dia = dia < 10 ? '0' + dia : dia;
        mes = mes < 10 ? '0' + mes : mes;
        horas = horas < 10 ? '0' + horas : horas;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;
        let fechaFormateadaori = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

        let fechass = new Date(llegada);

        // Extraemos el día, mes, año, horas, minutos y segundos
        let dia2 = fechass.getDate();
        let mes2 = fechass.getMonth() + 1; // Los meses en JavaScript empiezan en 0 (enero = 0)
        let anio2 = fechass.getFullYear();
        let horas2 = fechass.getHours();
        let minutos2 = fechass.getMinutes();
        let segundos2 = fechass.getSeconds();

        // Formateamos los valores a dos dígitos (añadiendo ceros si es necesario)
        dia2 = dia2 < 10 ? '0' + dia2 : dia2;
        mes2 = mes2 < 10 ? '0' + mes2 : mes2;
        horas2 = horas2 < 10 ? '0' + horas2 : horas2;
        minutos2 = minutos2 < 10 ? '0' + minutos2 : minutos2;
        segundos2 = segundos2 < 10 ? '0' + segundos2 : segundos2;
        let fechaFormateadades = `${dia2}/${mes2}/${anio2} ${horas2}:${minutos2}:${segundos2}`;

        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('passenger_name').setText(pasajero);
        form.getTextField('origen').setText(origen);
        form.getTextField('ticket_id').setText(folio);
        form.getTextField('seat').setText(asiento);
        form.getTextField('Destino').setText(destino);
        form.getTextField('departure_origen').setText(fechaFormateadaori);
        form.getTextField('fecha').setText(`Fecha venta: ${fechaFormateada}`);
        form.getTextField('saleman_name').setText(taquillero);
        form.getTextField('subtotal').setText(precio_base);
        form.getTextField('departure_destino').setText(fechaFormateadades);
        form.getTextField('total').setText(String(precio));
        form.getTextField('product').setText(corrida);
        form.getTextField('passenger_type').setText(tipo);
        const precioSinIVA = precio_base / (1 + 16 / 100);

        // Calcular el IVA
        const iva = precio_base - precioSinIVA;




        form.getTextField('IVA').setText(String(iva.toFixed(2)));

        // Hacer los campos de solo lectura
        ['passenger_name', 'origen', 'ticket_id', 'seat', 'Destino', 'departure_origen', 'fecha', 'IVA',
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
        pdfDocs.push(pdfBytes);

        const link = document.createElement('a');
        link.href = urlObject;
        link.download = `${folio}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        document.getElementById('btn-download').textContent = "Volver a Descargar";

        // Abrir el PDF en una nueva pestaña
        setTimeout(() => {
            //window.open(urlObject, '_blank');
        }, 1000);

    } catch (error) {
        console.error("Error al descargar el PDF:", error);
        document.getElementById('btn-download').textContent = "Error al descargar";
    }
}

async function combinarPDFs(pdfs, nombre_pdf_comb) {
    console.log(pdfs)
    try {
        // Crear un nuevo documento PDF vacío
        const combinedPdf = await PDFLib.PDFDocument.create();

        // Recorrer cada uno de los PDFs que quieres combinar
        for (let i = 0; i < pdfs.length; i++) {
            // Cargar el PDF actual
            const pdfDoc = await PDFLib.PDFDocument.load(pdfs[i]);

            // Copiar todas las páginas del PDF actual al nuevo documento combinado
            const copiedPages = await combinedPdf.copyPages(pdfDoc, pdfDoc.getPages().map((_, index) => index));
            copiedPages.forEach(page => combinedPdf.addPage(page));
        }

        // Guardar el PDF combinado
        const pdfBytes = await combinedPdf.save();

        // Crear un Blob con el PDF combinado y generar el enlace de descarga
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const urlObject = URL.createObjectURL(blob);

        // Crear un enlace para descargar el PDF combinado
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = `${nombre_pdf_comb}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Opcional: abrir el PDF combinado en una nueva pestaña
        setTimeout(() => {
            window.open(urlObject, '_blank');
        }, 1000);

    } catch (error) {
        console.error('Error al combinar los PDFs:', error);
    }
}