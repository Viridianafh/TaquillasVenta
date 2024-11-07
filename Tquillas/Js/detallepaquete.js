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
                  <td><button class="btn btn-primary" onclick="Descargarguia( '${e.Descripcion}',  '${e.Origen}', '${e.Destino}', '${e.Folio}', '${e.Total}', '${e.Corrida}', '${e.IdGuia}', '${e.IdSale}', '${e.Remitente}',  '${e.Destinatario}'  )">Descargar</button></td>
                <td><button class="btn btn-dark" onclick="Descargar( '${e.Descripcion }', '${e.Origen}', '${e.Destino}', '${e.Folio}', '${e.Total}', '${e.Corrida}')">Descargar</button></td>
            
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
async function Descargarguia(Descripcion ,Origen, Destino, Folio, Total, Corrida, IdGuia, IdSale, Remitente, Destinatario) {
    try {


       
        // Creamos la fecha en el nuevo formato dd/mm/yyyy h:mm:ss
     
        // Descargar el formulario PDF
        const url = '/Assets/etiqueta.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name');
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

        const jsonviaje = localStorage.getItem('datos_viaje')
        const viaje = JSON.parse(jsonviaje)
        const salida = viaje.departingOrigen
        const llegada = viaje.departingDestino
        // Obtener la fecha actual




        
        // Obtener el formulario del PDF
        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('folio').setText(Folio);
        form.getTextField('origen').setText(Origen);
        form.getTextField('destino').setText(Destino);
        form.getTextField('corrida').setText(Corrida);
       
        form.getTextField('idticket').setText(IdGuia);
        form.getTextField('remitente').setText(Remitente);
        form.getTextField('destinatario').setText(Destinatario);
        form.getTextField('description').setText(Descripcion);
        form.getTextField('salida').setText(formatearfecha(salida));
        form.getTextField('llegada').setText(formatearfecha(llegada));
     
     

        // Hacer los campos de solo lectura
        ['folio', 'origen', 'destino', 'corrida','idticket','remitente', 'destinatario', 'description','salida', 'llegada'].forEach(field => form.getTextField(field).enableReadOnly());

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





function formatearfecha(fechain) {




    let fecha = new Date(fechain);

    // Extraemos el día, mes, año, horas, minutos y segundos
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0 (enero = 0)
    let anio = fecha.getFullYear();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    // Formateamos los valores a dos dígitos (añadiendo ceros si es necesario)
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    let fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

    return fechaFormateada
}

async function Descargar(Descripcion, Origen, Destino, Folio, Total, Corrida) {
    try {
        // Descargar el formulario PDF
        const url = '/Assets/ticketpaquete.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name');
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

        const jsonviaje = localStorage.getItem('datos_viaje')
        const viaje = JSON.parse(jsonviaje)

        const envioJSON = localStorage.getItem('REMIDES');

        // Convertir el JSON a un objeto
        const envio = JSON.parse(envioJSON);



        // Obtener las variables del remitente
        const nombreRemitente = envio.NombreRemitente;
        const direccionRemitente = envio.DireccionRemitente;
        const phoneRemitente = envio.PhoneRemitente;
        const correoRemitente = envio.CorreoRemitente;

        const nombreDestinatario = envio.NombreDestinatario
        const phoneDestinatario = envio.PhoneDestinatario
        const salida = viaje.departingOrigen
        const llegada = viaje.departingDestino
        // Obtener la fecha actual


        // Obtener el formulario del PDF
        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('folio').setText(Folio);
        form.getTextField('origen').setText(Origen);
        form.getTextField('destino').setText(Destino);
        form.getTextField('corrida').setText(Corrida);
        form.getTextField('taquillero').setText(taquillero);
        form.getTextField('description').setText(Descripcion);
        form.getTextField('nombreemisor').setText(nombreRemitente);
        form.getTextField('telemisor').setText(phoneRemitente);
        form.getTextField('nombrereceptor').setText(nombreDestinatario);
        form.getTextField('telreceptor').setText(phoneDestinatario);
        form.getTextField('fechasalida').setText(formatearfecha(salida));
        form.getTextField('fechallegada').setText(formatearfecha(llegada));

        form.getTextField('fechallegada').setText(formatearfecha(llegada));

        const precioSinIVA = Total / (1 + 16 / 100);

        // Calcular el IVA
        const iva = Total - precioSinIVA;

        form.getTextField('total').setText(iva.toFixed(2));
        // Hacer los campos de solo lectur
        ['folio', 'origen', 'destino', 'corrida', 'total', 'taquillero', 'description', 'nombreemisor', 'telemisor', 'nombrereceptor', 'telreceptor', 'fechasalida', 'fechallegada' ].forEach(field => form.getTextField(field).enableReadOnly());

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


