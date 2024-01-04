﻿document.addEventListener('DOMContentLoaded', (event) => {
    
    

    const btn_buscar = document.getElementById('btn-buscar')
    btn_buscar.addEventListener('click', () => {
        limpiarTabla()


        btn_buscar.textContent = ""
        btn_buscar.textContent = "Buscando..."

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

                } else {

                    // Supongamos que tienes una tabla con id "miTabla" en tu HTML
                    var tabla = document.getElementById("table");

                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement("tr");
                        tr.innerHTML = 
                        `
                            <td>${data[i].passenger_name}</td>
                            <td>${data[i].passenger_type}</td>
                            <td>${data[i].ticket_id}</td>
                            <td>${data[i].sold_price}</td>
                            <td>${data[i].short_id}</td>
                            <td>${data[i].payment_provider}</td>
                            <td>${data[i].date_created}</td>
                            <td>${data[i].seat_name}</td>
                            <td>${data[i].status}</td>

                        `;

                        tabla.appendChild(tr);  // Agrega el nuevo elemento tr a la tabla
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


        btn_buscar.textContent = "Buscar"
    })


})


function limpiarTabla() {
    var tabla = document.getElementById('table');

    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}
