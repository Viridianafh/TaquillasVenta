document.addEventListener('DOMContentLoaded', (event) => {




    const btnIniciar = document.getElementById("button_iniciar")

    btnIniciar.addEventListener('click', () => {

        var userId = localStorage.getItem('id');
        var userName = localStorage.getItem('name');
        var lastname = localStorage.getItem('last_name')
        var officeLocationId = localStorage.getItem('office_location_id');
        var nombre_terminal = localStorage.getItem('terminal_name')
        var id_terminal = localStorage.getItem('terminal_id')
        var oficina = localStorage.getItem('office_name')


        var content_button = document.getElementById('content-button').style.display = "none"
        var content_buttons = document.getElementById('content-buttons').style.display = "flex"
        var content_buscador = document.getElementById('content-buscador').style.display = "block"


        var selectOrigen = document.getElementById("origen");   

        fetch('http://192.168.0.245:82/Home/Origen', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify('')
        })
            .then(response => response.json())
            .then(data => {
                while (selectOrigen.options.length > 1) {
                    selectOrigen.remove(1);
                }
                data.forEach(option => {
                    var newoption = document.createElement("option");
                    newoption.value = option.name;
                    newoption.text = option.name;
                    selectOrigen.appendChild(newoption);
                })
            })
            .catch(error => {
                console.log("error en el origen", error);
            });



        selectOrigen.addEventListener('change', () => {

            var Origen = selectOrigen.value
            var data = { origen: Origen };

            fetch('http://192.168.0.245:82/Home/Destino', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {

                    var selectDestino = document.getElementById('destino')
                    responseData.forEach(option => {
                        var newoption = document.createElement("option")
                        newoption.value = option.name
                        newoption.text = option.name
                        selectDestino.appendChild(newoption)
                    })
                })
                .catch(error => {
                    console.log("error en el destino", error)
                })
        })




        function searchDestiny() {

            var selectDestino = document.getElementById("destino");
            var selectOrigenUs = document.getElementById('origen').value;
            var data = { origen: selectOrigenUs };

            fetch('http://192.168.0.245:82/Home/Destino', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {
                    while (selectDestino.options.length > 1) {
                        selectDestino.remove(1);
                    }
                    responseData.forEach(option => {
                        var newoption = document.createElement("option");
                        newoption.value = option.name;
                        newoption.text = option.name;
                        selectDestino.appendChild(newoption);
                    });
                })
                .catch(error => {
                    console.log("error en el destino", error);
                });
        }
    })




    const btn_trip = document.getElementById('btn-trip')

    btn_trip.addEventListener('click', () => {

        btn_trip.textContent = ""
        btn_trip.textContent = "Buscando..."
        btn_trip.classList.remove('btn-primary')
        btn_trip.classList.add('btn-success')


        limpiarTabla()

        const row = document.getElementsByTagName('tbody')



        var Origen = document.getElementById('origen').value
        var Destino = document.getElementById('destino').value
        var Fecha_salida = document.getElementById('fecha').value


        const Viaje = {

            "origen": Origen,
            "destino": Destino,
            "fechaSalida": Fecha_salida,

        }


        console.log(JSON.stringify(Viaje))


        fetch('https://localhost:5001/Home/BuscarViaje', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Viaje)
        })
            .then(response => response.json())
            .then(data => {



                var tbody = document.getElementsByTagName('tbody')[0]; // Get the first tbody element


                var alldata = data

                for (i = 0; i < alldata.length; i++) {
                    console.log(alldata[i].Corrida)


                    var tr = document.createElement('tr');


                    tr.innerHTML = `
                           <td>${alldata[i].Corrida}</td>
                           <td>${alldata[i].Tipo}</td>
                           <td>${alldata[i].Origen}</td>
                           <td>${alldata[i].Destino}</td>
                           <td>${alldata[i].Bus}</td>
                           <td>${alldata[i].DepartingOrigen}</td>
                           <td>${alldata[i].DepartingDestino}</td>
                           <td>${alldata[i].Precio} $ </td>
                           <td><button class="btn btn-primary" id="btn-send" value="${alldata.TripId}"  onclick="Comprar(${this.row})">Comprar</button></td>
                       `;

                    tbody.appendChild(tr);

                }



                const liquidname = document.getElementById('table');


                document.getElementById('section-boletos').style.display = 'block';
                btn_trip.textContent = "Busar viaje"

                btn_trip.classList.remove('btn-success')
                btn_trip.classList.add('btn-primary')
            })
            .catch(error => console.error('Error al obtener o procesar los datos:', error));



    })


    function limpiarTabla() {
        var tabla = document.getElementById('tabla-viajes');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
    }






    

    })






   









