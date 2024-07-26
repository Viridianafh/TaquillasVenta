document.addEventListener('DOMContentLoaded', (event) => {




    //Swal.fire({
    //    title: "Modulo en Desarrollo",
    //    text: 'Te notificaremos cuando esté listo para ti',
    //    icon: "warning",
    //    confirmButtonColor: '#3085d6',
    //    confirmButtonText: 'OK'
    //}).then((result) => {
    //    if (result.isConfirmed) {
    //        // Redirigir al menú
    //        window.location.href = "dash.aspx";
    //    }
    //});




    fetch('http://apitaquillassag.dyndns.org/Home/Origen', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify('')
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            var selectOrigen = document.getElementById('origen');
            // Limpia las opciones actuales del select
            selectOrigen.innerHTML = ""; // Esta línea limpia las opciones actuales del select

            data.forEach(option => {
                var newOption = document.createElement("option");
                newOption.value = option.name;
                newOption.text = option.name;
                selectOrigen.appendChild(newOption);
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error"
            });
        });

    var selectOrigen = document.getElementById('origen');
    selectOrigen.addEventListener('change', () => {

        var data = selectOrigen.value
        Buscarbegins(data)
    })

    function Buscarbegins(data) {
        var tabla = document.getElementById('tabla-begins').getElementsByTagName('tbody')[0]
        tabla.innerHTML = '';
        const today = new Date();

        // Obtener el año, mes y día del objeto de fecha
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
        const day = String(today.getDate()).padStart(2, '0');

        // Formatear la fecha en el formato yyyy-mm-dd
        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);




        fetch(`http://apitaquillassag.dyndns.org/Home/ObtenerIniciosGuias?origen=${data}&fecha=${formattedDate}`)
            .then(response => response.json())
            .then(data => {


                var tabla = document.getElementById('tabla-begins').getElementsByTagName('tbody')[0]
                tabla.innerHTML = '';

                data.forEach(e => {

                    var tr = document.createElement('tr')


                    var dateObject = new Date(e.salida);
                   

                    // Función para agregar ceros a la izquierda si es necesario
                    function padZero(number) {
                        return number < 10 ? `0${number}` : number;
                    }

                    const day = padZero(dateObject.getDate());
                    const month = padZero(dateObject.getMonth() + 1); // Los meses empiezan desde 0
                    const year = dateObject.getFullYear();
                    const hours = padZero(dateObject.getHours());
                    const minutes = padZero(dateObject.getMinutes());
                    const seconds = padZero(dateObject.getSeconds());

                    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

                    console.log("Fecha formateada:", formattedDate);

                    tr.innerHTML += `

                  
                        <td> ${e.corrida} </td>
                        <td> ${e.origen} </td>
                        <td> ${e.destino} </td>
                        <td> ${e.operador1}  //  ${e.operador2}   </td>
                        <td> ${e.bus} </td>
                        <td> ${formattedDate} </td>
                        <td>
                        <button class="btn btn-dark" onclick="generarguia('${e.route_id}', '${e.run_id}', '${e.trip_id}', '${e.bus_id}', '${e.origenid}', '${e.destinoid}', '${e.anticipo}', '${e.corrida}', '${e.origen}', '${e.destino}', '${e.operador1}', '${e.operador2}', '${e.bus}', '${e.salida}')">

                          generar guia
                        </button>
                        </td>
                
                `
                    tabla.appendChild(tr)


                })

            })
            .catch(error => {
                console.error(error)
            })


    }



})



function generarguia(route_id, run_id, trip_id, bus_id, origenid, destinoid, anticipo, corrida, origen, destino, operador1, operador2, bus, salida) {


    localStorage.setItem("route_id_guia", route_id)
    localStorage.setItem("run_id_guia", run_id)
    localStorage.setItem("trip_id-guia", trip_id)
    localStorage.setItem("bus_id_guia", bus_id)
    localStorage.setItem("origen_id_guia", origenid)
    localStorage.setItem("destino_id_guia", destinoid)
    localStorage.setItem("anticipo_guia", anticipo)
    localStorage.setItem("corrida_guia", corrida)
    localStorage.setItem("origen_guia", origen)
    localStorage.setItem("destino_guia", destino)
    localStorage.setItem("operador1_guia", operador1)
    localStorage.setItem("operador2_guia", operador2)
    localStorage.setItem("bus_guia", bus)
    localStorage.setItem("salida_guia", salida)
    localStorage.setItem("totalanticipo_guia", anticipo)


    llamarlistaabordar(trip_id);
    llamarparadas(route_id)
    llamaranticipo()

    document.getElementById('section-busqueda-guide').style.display = "none";
    document.getElementById('section-guides-actions').style.display = "block";
}


function llamarlistaabordar(trip_id) {
    fetch(`http://apitaquillassag.dyndns.org/Home/MostrarListaAbordar?trip_id=${trip_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            const tablapasajero = document.getElementById('table-pasajeros').getElementsByTagName('tbody')[0];
            tablapasajero.innerHTML = '';

            const rows = data.map(e => `
                <tr>
                    <td>${e.Name}</td>
                    <td>${e.Seat_number}</td>
                    <td>${e.Origin}</td>
                    <td>${e.Destination}</td>
                    <td>${e.Ticket}</td>
                </tr>
            `).join('');

            tablapasajero.innerHTML = rows;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function llamarparadas(route_id) {
    fetch(`http://apitaquillassag.dyndns.org/Home/GetStopsByRouteId?id=${route_id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem("paradas-guia", JSON.stringify(data))
            const tablaparadas = document.getElementById('table-paradas').getElementsByTagName('tbody')[0];
            tablaparadas.innerHTML = '';

            const rows = data.map(e => `
                <tr>
                    <td>${e.Name}</td>
                    <td>${e.waiting_minutes}</td>
                    <td>${e.travel_minutes}</td>
                    <td>${e.OrderIndex}</td>
                </tr>
            `).join('');

            tablaparadas.innerHTML = rows;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function llamaranticipo() {
    // Recuperar el total del anticipo almacenado en localStorage
    var anticip = parseFloat(localStorage.getItem('anticipo_guia')) || 0;
    document.getElementById('contentanticipo').textContent = anticip.toFixed(2);

    // Función para actualizar el total del anticipo y el JSON de anticipos
    function updateTotalAnticipo() {
        let totalAnticipo = 0;
        const anticipos = [];
        document.querySelectorAll('.anticipo-div').forEach((div, index) => {
            const descripcion = div.querySelector('input[name="descripcion"]').value;
            const valorAnticipo = parseFloat(div.querySelector('input[name="anticipo"]').value) || 0;
            totalAnticipo += valorAnticipo;
            anticipos.push({ descripcion, valor: valorAnticipo });
        });

        localStorage.setItem("totalanticipo_guia", totalAnticipo.toFixed(2));
        document.getElementById('totalanticipo').textContent = (totalAnticipo + anticip).toFixed(2);

        // Mostrar el JSON de anticipos
        document.getElementById('json-output').textContent = JSON.stringify(anticipos, null, 2);
        localStorage.setItem("arrayanticipos", JSON.stringify(anticipos))
    }

    // Escuchar el evento de clic para agregar nuevos anticipos
    document.querySelector('#btn-add-advance').addEventListener('click', () => {
        const contentcontrols = document.getElementById('content-controls');

        // Crear un nuevo div para los controles del anticipo
        const newDiv = document.createElement('div');
        newDiv.className = 'd-flex m-2 gap-2 anticipo-div';

        // Crear el input para la descripción
        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.name = 'descripcion';
        input1.placeholder = 'Descripcion';
        input1.className = 'form-control';
        input1.style.width = '220px';

        // Crear el input para el valor del anticipo
        const input2 = document.createElement('input');
        input2.type = 'number';
        input2.name = 'anticipo';
        input2.placeholder = 'Valor Anticipo';
        input2.className = 'form-control';
        input2.style.width = '220px';
        input2.addEventListener('input', updateTotalAnticipo);

        // Crear el botón para eliminar el anticipo
        const button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.innerText = 'Eliminar anticipo';
        button.addEventListener('click', function () {
            newDiv.remove();
            updateTotalAnticipo();
        });

        // Añadir los inputs y el botón al div
        newDiv.appendChild(input1);
        newDiv.appendChild(input2);
        newDiv.appendChild(button);

        // Añadir el div al contenedor principal
        contentcontrols.appendChild(newDiv);

        // Actualizar el total del anticipo después de agregar un nuevo input
        updateTotalAnticipo();
    });







}




function agregaranticipo() {


    var anticipo = localStorage.getItem("arrayanticipos");
    var totalanticipo = document.getElementById('totalanticipo').textContent
    var anticipototal = parseFloat(totalanticipo)
    localStorage.setItem("anticipototal", anticipototal)
    console.log(anticipo)
    var longitudanticipo = JSON.parse(anticipo)

    if (anticipo) {


        if (Object.keys(longitudanticipo).length === 0) {

            alert("No hay Anticipo")
            actualizaranticipo()
            InsertarTripStopControl()

        } else {

            fetch('http://apitaquillassag.dyndns.org/Home/agregar_anticipo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: anticipo
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    actualizaranticipo()
                    InsertarTripStopControl()
                })
                .catch(error => console.error('Error:', error));

        }

    } else {
        alert("no hay anticipó")
        actualizaranticipo()
        InsertarTripStopControl()
    }




}


function actualizaranticipo() {


    var idguia = localStorage.getItem("trip_id-guia");
    fetch(`http://apitaquillassag.dyndns.org/Home/ActualizarGuia?tripId=${idguia}`, {
        method: 'PATCH', 
        headers: {
            'Authorization': 'Bearer your-token-here' 
           
        }
      
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); 
        })
        .then(data => console.log(data)) 
        .catch(error => console.error('Error:', error)); 
}


function InsertarTripStopControl(){

    var salida_guia = localStorage.getItem("salida_guia")
    var dataparadas = localStorage.getItem("paradas-guia")
    var tripid = localStorage.getItem("trip_id-guia")



    fetch(`http://apitaquillassag.dyndns.org/Home/InsertarTripStopControl?tripid=${tripid}&salida=${salida_guia}`, {
         
            method: 'POST',
            headers: {
                'Authorization': 'Bearer your-token-here'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })


}