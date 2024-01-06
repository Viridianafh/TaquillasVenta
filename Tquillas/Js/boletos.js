﻿document.addEventListener('DOMContentLoaded', () => {


    var tbodyrsumeefectiivo = document.getElementById("table-descarga-boletos").getElementsByTagName('tbody')[0]
    var folio = localStorage.getItem('folio')
    var datais = localStorage.getItem("datosInternetsale")
    datais = JSON.parse(datais)

    var dataviaje = localStorage.getItem("datos_viaje");
    var datosCombinados = JSON.parse(dataviaje);

    for (var i = 0; i < datais.length; i++) {


        var tr = document.createElement("tr");
        var tipo = datais[i].tipo
        if (tipo.includes("adulto")) {
            tipo = "Adulto"
        } else if (tipo.includes("nino")) {
            tipo = "Niño"

        } else if (tipo.includes("inapam")) {
            tipo = "Adulto mayor"

        } else if (tipo.includes("estudiante")) {
            tipo = "Estudiante"

        }

        tr.innerHTML =
        `
            <td>${datosCombinados.origen}</td>
            <td>${datosCombinados.destino}</td>
            <td>${datosCombinados.departingOrigen}</td>
            <td>${datosCombinados.bus}</td> 
            <td>${datais[i].pasajero}</td>
            <td>${tipo}</td>
            <td>${folio}<td>
            <td>${datais[i].asiento}</td>
            <td>${datais[i].precio}</td>
            <td><button class="btn btn-dark" onclick="Descargar('${folio}' ,'${datais[i].pasajero}', '${datosCombinados.origen}', '${datosCombinados.destino}', '${datosCombinados.departingOrigen}', '${datosCombinados.bus}', '${tipo}', '${datais[i].asiento}', ${datais[i].precio});"> <ion-icon name="download-outline"></ion-icon>Descargar</button></td>
        `;


        tbodyrsumeefectiivo.appendChild(tr);



    }




})



async function Descargar(folio, pasajero, origen, destino, departingOrigen, bus,  tipo, asiento, precio ) {

 
    try {


        //console.log(pasajero)
        //console.log(origen)
        //console.log(destino)
        //console.log(departingOrigen)
        //console.log(bus)
        //console.log(tipo)
        //console.log(asiento)
        //console.log(precio)

  

        // Descargar el formulario PDF
        const url = '/Assets/formticket.pdf';
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
        const taquillero = localStorage.getItem('name')
        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
        var datosViajeString = localStorage.getItem("datos_viaje");
        var datosViajeObj = JSON.parse(datosViajeString);
        precio_base = datosViajeObj.precio;
        var llegada = datosViajeObj.departingDestino;
        var corrida = datosViajeObj.corrida;
        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener día, mes y año
        const día = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Se agrega 1 porque los meses se cuentan desde 0 (enero) hasta 11 (diciembre)
        const año = fechaActual.getFullYear();

        // Formatear la fecha con cuatro dígitos en el año
        const fechaFormateada = `${día < 10 ? '0' : ''}${día}-${mes < 10 ? '0' : ''}${mes}-${año}`;

        console.log("Fecha formateada:", fechaFormateada);




        var total = String(precio)


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


        // Generar un nuevo PDF con los datos ingresados
        const pdfBytes = await pdfDoc.save();

        // Descargar el PDF resultante
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const urlObject = window.URL.createObjectURL(blob);

        // Crear un enlace y hacer clic en él para iniciar la descarga
        const link = document.createElement('a');
        link.href = urlObject;
        link.download = 'formulario_lleno.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Imprimir el documento después de descargar
        setTimeout(() => {
            window.open(urlObject, '_blank');
        }, 1000);

    } catch (error) {
        console.error('Error:', error);
    }

    




}