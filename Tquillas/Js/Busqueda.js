document.addEventListener('DOMContentLoaded', (event) => {



    const btn_buscar = document.getElementById('btn-buscar')
    btn_buscar.addEventListener('click', () => {

        btn_buscar.textContent = "Buscando..."

        limpiarTabla()




        var codigo = document.getElementById('textconcepto').value

        fetch(`https://api.sagautobuses.com/Home/busqueda_boleto?concepto=${codigo}`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
            },
            body: JSON.stringify({})  // Si es necesario enviar datos en el cuerpo, reemplaza {} con tus datos
        })
            .then(response => response.json())
            .then(data => {

                if (data.respuesta == "No existe registros") {

                    Swal.fire({
                        title: "Error",
                        text: `Boleto inexistente`,
                        icon: "error"
                    });


                    btn_buscar.textContent = "Buscar"

                } else {

                    // Supongamos que tienes una tabla con id "miTabla" en tu HTML
                    var tabla = document.getElementById("table").getElementsByTagName('tbody')[0];

                    for (var i = 0; i < data.length; i++) {
                        var tipo = ""
                        var tr = document.createElement("tr");

                        if (data[i].passenger_type == "ADULT") {
                            tipo = "Adulto"
                        }
                        if (data[i].passenger_type == "CHILD") {
                            tipo = "Niño"
                        }
                        if (data[i].passenger_type == "OLDER_ADULT") {
                            tipo = "Adulto Mayor"
                        }
                        if (data[i].passenger_type == "STUDENT") {
                            tipo = "Estudiante"
                        }

                        tr.innerHTML =

                            `
                            <td>${data[i].passenger_name}</td>
                            <td>${tipo}</td>                    
                            <td>${data[i].ticket_id}</td>          
                            <td>${data[i].sold_price}</td>
                            <td>${data[i].short_id}</td>
                            <td>${data[i].payment_provider}</td>
                            <td>${data[i].date_created}</td>
                            <td>${data[i].seat_name}</td>
                            <td>${data[i].status}</td>
                            <td>
                            <button class="btn btn-dark" id="btn-download" onclick="Descargar('${data[i].ticket_id}', '${data[i].payment_provider}', '${data[i].date_created}');"> <ion-icon name="download-outline"></ion-icon>Descargar</button>
                             
                                  <td>
                            ${data[i].status !== 'USED' ? `
          <button class="btn btn-danger mt-2" id="btn-cancel" onclick="SolicitarCodigo('${data[i].ticket_id}');">
            Cancelar Boleto
          </button> </td>` : ''}
                        
                            
                            
                        `;

                        tabla.appendChild(tr);  // Agrega el nuevo elemento tr a la tabla
                        btn_buscar.textContent = "Buscar"

                    }

                }


            })
            .catch(error => {


                Swal.fire({
                    title: "Error!",
                    text: `Ocurrio un error al consultar los datos: mensaje de error(${error})`,
                    icon: "error"
                });
            });


    })


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

async function Descargar(ticket, tipopago, date) {
    try {
        document.getElementById('btn-download').textContent = "Descargando...";


        // Obtener datos del boleto
        const response = await fetch(`http://apitaquillassag.dyndns.org/Home/ConsultarBoletos?folio=${ticket}`);
        const data = await response.json();
        console.log("Datos del boleto:", data);

        if (!data || data.length === 0) {
            throw new Error("No se encontraron datos para el boleto");
        }
        const boleto = data[0]; // Usamos el primer elemento del array

        const taquilleroResponse = await fetch(`http://apitaquillassag.dyndns.org/Home/buscartaquilleroporticket?id=${boleto.TicketId}`);
        if (!taquilleroResponse.ok) {
            throw new Error('Error en la solicitud para obtener el nombre del taquillero');
        }
        const taquilleroData = await taquilleroResponse.json();
        var nametaquillero = "";
        taquilleroData.forEach(e => { nametaquillero = e.name.length == 0 ? "INTERNET" : e.name; });


        // Cargar el PDF base
        const url = '/Assets/formticketB.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

        const taquillero = localStorage.getItem('name');


        // Rellenar el formulario
        const form = pdfDoc.getForm();

        // Establecer los valores de los campos de texto
        form.getTextField('passenger_name').setText(boleto.PassengerName);
        form.getTextField('origen').setText(boleto.Origin);
        form.getTextField('ticket_id').setText(boleto.TicketId);
        form.getTextField('seat').setText(boleto.SeatName);
        form.getTextField('Destino').setText(boleto.Destination);
        form.getTextField('departure_origen').setText(formatearfecha(boleto.Salida));
        form.getTextField('fecha').setText(`Fecha venta: ${date}`);
        form.getTextField('saleman_name').setText(tipopago == 'BOOTH' ? `Vendido por: ${nametaquillero}` : `Mediante: ${tipopago}`);

        form.getTextField('subtotal').setText(String(boleto.PayedPrice));
        form.getTextField('departure_destino').setText(formatearfecha(boleto.llegada));

        form.getTextField('total').setText(String(boleto.SoldPrice));


        const precioSinIVA = boleto.PayedPrice / (1 + 16 / 100);

        // Calcular el IVA
        const iva = boleto.PayedPrice - precioSinIVA;




        form.getTextField('IVA').setText(String(iva.toFixed(2)));
        form.getTextField('product').setText(boleto.product);


        switch (boleto.PassengerType) {
            case "ADULT":
                await form.getTextField('passenger_type').setText("Adulto");
                break;
            case "OLDER_ADULT":
                await form.getTextField('passenger_type').setText("Inapam");
                break;
            case "CHILD":
                await form.getTextField('passenger_type').setText("Niño");
                break;
            case "STUDENT":
                await form.getTextField('passenger_type').setText("Estudiante");
                break;
            default:
                await form.getTextField('passenger_type').setText("??");
                break;
        }


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
        console.log("Generando QR para:", ticket);
        const qrImageBytes = await generateQRCode(ticket);
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        // Insertar el QR en el campo 'qr_af_image'
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
        link.download = `${ticket}.pdf`;
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

function SolicitarCodigo(ticket) {

    var officename = localStorage.getItem('office_name')

    fetch(`http://apitaquillassag.dyndns.org/Home/GenerarTokenCancelacion?oflname=${officename}&ticket_id=${ticket}`)
    //fetch(`http://apitaquillassag.dyndns.org/Home/GenerarTokenCancelacion?oflname=${officename}&ticket_id=${ticket}`)
        .then(res => res.json())
        .then(data => {

            localStorage.setItem("tokenCancelacionBoleto", data.token)
        })
    document.getElementById('section-code').style.display = 'block'

}

function ProcederCancelacion() {

    Swal.fire({
        title: '¿Está seguro?',
        text: 'Esta acción no podrá deshacerse',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            // Acción cuando se hace clic en "Sí"
            validardata()
        } else {
            // Acción cuando se hace clic en "No"

        }
    })


    function validardata() {
        var code = document.getElementById('code').value
        var key = localStorage.getItem('tokenCancelacionBoleto')

        fetch(`http://apitaquillassag.dyndns.org/Home/ValidarTokenCancelacion?code=${code}&key=${key} `)
            .then(res => res.text())
            .then(data => {
                if (data == "Ok") {

                    cancelarBoleto()

                }
                else {
                    Swal.fire({
                        title: "Ocurrio un error",
                        text: 'intenta de nuevo',
                        icon: "error"
                    });
                }
            })
    }

}


function cancelarBoleto() {

    var boleto = document.getElementById('textconcepto').value
    var userid = localStorage.getItem('id')


    const boletocambio =
    {

        "oldticket": boleto,
        "cancelUserId": userid,
        "saleshift": localStorage.getItem('saleshift_id')

    }


    fetch('http://apitaquillassag.dyndns.org/Home/CancelarBoleto', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Otros encabezados si es necesario
        },
        body: JSON.stringify(boletocambio)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.text();
        })
        .then(data => {
            console.log('Recurso eliminado:', data);


            Swal.fire({
                title: "Cambios Realizados",
                text: 'Boleto Cancelado',
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    location.reload();
                }
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });

}


function formatearfecha(fechain) {

    let fecha = new Date(fechain);

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    let fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

    return fechaFormateada
}


function limpiarTabla() {
    var tabla = document.getElementById('table');

    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}




