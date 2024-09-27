function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queries = queryString.split("&");

    queries.forEach(query => {
        const pair = query.split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
    });

    return params;
}

// Obtener los parámetros de la URL

document.addEventListener('DOMContentLoaded', () => {


    const queryParams = getQueryParams();
    const isaleid = queryParams['isaleid'];
    const shortid = queryParams['shortid'];

    // Definir la URL de la API con el parámetro isaleid
    const apiUrl = `http://apitaquillassag.dyndns.org/Home/detalleventa?isaleid=${isaleid}`;

    // Realizar la solicitud fetch
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            document.getElementById('loaderboletos').style.display = 'none'
            document.getElementById('section-tabla-boletos').style.display = 'block'

            var tabla = document.getElementById('table-descarga-boletos').getElementsByTagName('tbody')[0]

            data.forEach(e => {

                const tr = document.createElement('tr')

                tr.innerHTML = `

                <td>${e.Descripcion}</td>
                <td>${e.Origen}</td>
                <td>${e.Destino}</td>
                <td>${e.Remitente}</td>
                <td>${e.Destinatario}</td>
                <td>${e.IdGuia}</td>
                  <td><button class="btn btn-primary" onclick="Descargarguia('${e.Origen}', '${e.Destino}', '${e.Folio}', '${e.Total}', '${e.Corrida}', '${e.IdGuia}', '${e.IdSale}', '${e.Remitente}',  '${e.Destinatario}'  )">Descargar</button></td>
                <td><button class="btn btn-dark" onclick="Descargar('${e.Origen}', '${e.Destino}', '${e.Folio}', '${e.Total}', '${e.Corrida}')">Descargar</button></td>
            
                `;
                tabla.appendChild(tr)
            })

        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });


})

function generateQRCode(text) {
    return new Promise((resolve, reject) => {
        try {
            const div = document.createElement('div');
            new QRCode(div, {
                text: text,
                width: 128,
                height: 128,
            });

            // Esperar un poco para asegurarse de que el QR se ha generado
            setTimeout(() => {
                const img = div.querySelector('img');
                if (img) {
                    resolve(img.src);
                } else {
                    reject(new Error('No se pudo generar el QR'));
                }
            }, 100);
        } catch (error) {
            console.error("Error en generateQRCode:", error);
            reject(error);
        }
    });
}
async function Descargarguia(Origen, Destino, Folio, Total, Corrida, IdGuia, IdSale, Remitente, Destinatario) {
    try {
        // Descargar el formulario PDF
        const url = '/Assets/etiqueta.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name');
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
       

        // Obtener la fecha actual
 

        // Obtener el formulario del PDF
        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('folio').setText(Folio);
        form.getTextField('origen').setText(Origen);
        form.getTextField('destino').setText(Destino);
        form.getTextField('corrida').setText(Corrida);
        form.getTextField('sale').setText(IdSale);
        form.getTextField('idticket').setText(IdGuia);
        form.getTextField('remitente').setText(Remitente);
        form.getTextField('destinatario').setText(Destinatario);
     

        // Hacer los campos de solo lectura
        ['folio', 'origen', 'destino', 'corrida', 'sale', 'idticket','remitente', 'destinatario'].forEach(field => form.getTextField(field).enableReadOnly());

        // Generar el código QR con el mensaje "hola"
        const qrCodeDataURL = await generateQRCode(IdGuia);
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

        const logoImageBytes = await fetch('/Assets/logoSag.png').then(res => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoImageBytes);
        const logoField = form.getButton('logosag_af_image');
        logoField.setImage(logoImage);


        // Generar un nuevo PDF con los datos ingresados
        const pdfBytes = await pdfDoc.save();

        // Descargar el PDF resultante
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const urlObject = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = `${Folio}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error:', error);
    }
}



async function Descargar(Origen, Destino, Folio, Total, Corrida) {
    try {
        // Descargar el formulario PDF
        const url = '/Assets/ticketpaquete.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name');
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);


        // Obtener la fecha actual


        // Obtener el formulario del PDF
        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('folio').setText(Folio);
        form.getTextField('origen').setText(Origen);
        form.getTextField('destino').setText(Destino);
        form.getTextField('corrida').setText(Corrida);
        form.getTextField('total').setText(Total);
        form.getTextField('taquillero').setText(taquillero);


        // Hacer los campos de solo lectura
        ['folio', 'origen', 'destino', 'corrida', 'total', 'taquillero'].forEach(field => form.getTextField(field).enableReadOnly());

        // Generar el código QR con el mensaje "hola"
        const qrCodeDataURL = await generateQRCode(Folio);
        const qrImageBytes = await fetch(qrCodeDataURL).then(res => res.arrayBuffer());
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        // Obtener el campo de imagen 'qr' y establecer la imagen del código QR
        const qrField = form.getButton('idfolio_af_image');
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
        link.download = `${Folio}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error:', error);
    }
}


