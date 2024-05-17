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
                            <button class="btn btn-dark" id="btn-download" onclick="Descargar('${data[i].ticket_id}');"> <ion-icon name="download-outline"></ion-icon>Descargar</button>
                            
                            </td>
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




async function Descargar(ticket) {
    try {
        document.getElementById('btn-download').textContent = "Descargando..."
        const response = await fetch(`http://apitaquillassag.dyndns.org/Home/ConsultarBoletos?folio=${ticket}`);
        const data = await response.json();
        console.log(data);

        const url = '/Assets/formticket.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name');
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
        //var datosViajeString = localStorage.getItem("datos_viaje");
        //var datosViajeObj = JSON.parse(datosViajeString);
        //precio_base = datosViajeObj.precio;
        //var llegada = datosViajeObj.departingDestino;
        //var corrida = datosViajeObj.corrida;
        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener día, mes y año
        const día = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Se agrega 1 porque los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
        const año = fechaActual.getFullYear();

        // Formatear la fecha con cuatro dígitos en el año
        const fechaFormateada = `${día < 10 ? '0' : ''}${día}-${mes < 10 ? '0' : ''}${mes}-${año}`;

        console.log("Fecha formateada:", fechaFormateada);



        const form = pdfDoc.getForm();

        data.map(e => {


            form.getTextField('passenger_name').setText(e.PassengerName);
            form.getTextField('origen').setText(e.Origin);
          
            form.getTextField('ticket_id').setText(e.TicketId);
            form.getTextField('seat').setText(e.SeatName);
            form.getTextField('Destino').setText(e.Destination);
           // form.getTextField('departure_origen').setText(departingOrigen);
            form.getTextField('fecha').setText(fechaFormateada);
            form.getTextField('saleman_name').setText(taquillero);
            form.getTextField('subtotal').setText(String(e.SoldPrice));
            form.getTextField('departure_destino').setText(e.llegada);
            form.getTextField('departure_origen').setText(e.Salida);
            form.getTextField('total').setText(String(e.PayedPrice));
            form.getTextField('product').setText(e.product);
            form.getTextField('passenger_type').setText(e.PassengerType);

            form.getTextField('ticket_id').enableReadOnly();
            form.getTextField('passenger_name').enableReadOnly();
            form.getTextField('passenger_type').enableReadOnly();
            form.getTextField('origen').enableReadOnly();
            form.getTextField('seat').enableReadOnly();
            form.getTextField('Destino').enableReadOnly();
            form.getTextField('departure_origen').enableReadOnly();
            form.getTextField('fecha').enableReadOnly();
            form.getTextField('saleman_name').enableReadOnly();
            form.getTextField('subtotal').enableReadOnly();
            form.getTextField('departure_destino').enableReadOnly();
            form.getTextField('total').enableReadOnly();
            form.getTextField('product').enableReadOnly();



      


        });

        const watermarkImageBytes = await fetch('/Assets/logoSag.png').then(res => res.arrayBuffer());
        const watermarkImage = await pdfDoc.embedPng(watermarkImageBytes);
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            const { width, height } = page.getSize();
            // Definir el tamaño deseado para la imagen de marca de agua
            const watermarkWidth = watermarkImage.width / 6; // Reducir el tamaño a la mitad
            const watermarkHeight = watermarkImage.height / 6; // Reducir el tamaño a la mitad
            // Calcular las coordenadas centradas para la posición de la imagen de marca de agua
            const x = (width - watermarkWidth) / 2;
            const y = (height - watermarkHeight) / 2;
            // Dibujar la imagen de marca de agua en la página del PDF
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

        // Crear un enlace y hacer clic en él para iniciar la descarga
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = `${ticket}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.getElementById('btn-download').textContent = "Volver a Descargar"
        // Imprimir el documento después de descargar
        setTimeout(() => {
            window.open(urlObject, '_blank');
        }, 1000);
    } catch (error) {
        console.error("Error al descargar el PDF:", error);
    }
}



function CancelarBoleto(ticket) {

    alert("Cancelado:  " + ticket)

}


function limpiarTabla() {
    var tabla = document.getElementById('table');

    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}




