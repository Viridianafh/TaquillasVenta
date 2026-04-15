const btn_trip = document.getElementById('btn-trip');
function origenesDestinos() {
    fetch('https://api-taquillas.sagautobuses.com/Home/Origen', {
        //fetch('https://api-taquillas.sagautobuses.com/Home/Origen', {
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
            var selectOrigen = $('#origen');


            selectOrigen.empty().append('<option value="">Seleccione un origen</option>');

            data.forEach(option => {
                var newOption = new Option(option.name, option.id, false, false);
                selectOrigen.append(newOption);
            });

            selectOrigen.select2();

            selectOrigen.on('select2:open', function () {
                setTimeout(function () {
                    $('.select2-search__field').focus();
                }, 1);
            });

            selectOrigen.on('change', function () {
                var IDOrigen = selectOrigen.val();
                var Origen = selectOrigen.find("option:selected").text();

                var data = { origen: Origen };

                fetch('https://api-taquillas.sagautobuses.com/Home/Destino', {
                    //fetch('https://api-taquillas.sagautobuses.com/Home/Destino', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(responseData => {
                        var selectDestino = $('#destino');

                        selectDestino.empty().append('<option value="">Seleccione un destino</option>');

                        responseData.forEach(option => {
                            var newOption = new Option(option.name, option.id, false, false);
                            selectDestino.append(newOption);
                        });

                        selectDestino.select2();

                        selectDestino.on('select2:open', function () {
                            setTimeout(function () {
                                $('.select2-search__field').focus();
                            }, 1);
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error}`,
                            icon: "error"
                        });
                        document.getElementById("button_iniciar").disabled = false;
                    });
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error"
            });
            document.getElementById("button_iniciar").disabled = false;
        });
}

function viajes() {
    var Origen = document.getElementById('origen')
    Origen = Origen.options[Origen.selectedIndex].text;

    var Destino = document.getElementById('destino')
    Destino = Destino.options[Destino.selectedIndex].text;
    var Fecha_salida = document.getElementById('fecha').value;
    fetch(`https://api-taquillas.sagautobuses.com/Home/BuscarCorridas?origen=${Origen}&destino=${Destino}&fecha=${Fecha_salida}`, {
    //fetch(`https://localhost:5001/Home/BuscarCorridas?origen=${Viaje.origen}&destino=${Viaje.destino}&fecha=${Viaje.fechaSalida}`, {

    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            if (data.length == 0) {
                btn_trip.classList.add('btn-primary')

                btn_trip.disabled = false;
                btn_trip.textContent = "Buscar viaje"


                Swal.fire({
                    title: 'Error!',
                    text: 'No existen viajes. Prueba para otra fecha lu otro destino',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }

            var tbody = document.getElementsByTagName('tbody')[0]; // Get the first tbody element
            var alldata = data
            var addedTripIds = {};


            for (i = 0; i < alldata.length; i++) {
                console.log(alldata[i].Corrida)




                var tr = document.createElement('tr');


                var id = alldata[i].tripID
                var corrida = alldata[i].NombreCorrida
                var tipo = alldata[i].TipoServicio
                var type = alldata[i].TipoServicio
                var origen = alldata[i].Origen
                var destino = alldata[i].Destino
                var bus = alldata[i].Bus
                bus_specific = bus;
                var departingOrigen = alldata[i].origencorridabuscada
                var departingDestino = alldata[i].llegadacorridabuscada
                var precio = alldata[i].Precio
                var Arrival = alldata[i].Arrival
                var Departure = alldata[i].Departure
                var RunId = alldata[i].RunId
                var totaltime = alldata[i].totaltime





                // Convertir la cadena de fecha y hora en un objeto de fecha de JavaScript
                var fechayhorasalida = new Date(departingOrigen);
                var fechayhorallegada = new Date(departingDestino);
                var horaActual = new Date();

                var formattedSalida = formatDateTime(departingOrigen);
                var formattedLlegada = formatDateTime(departingDestino);


                // Obtener la hora ajustada
                var horaAjustada = fechayhorasalida.toLocaleTimeString();
                var horaAjustadallegada = fechayhorallegada.toLocaleTimeString();

                // Crear strings para fecha y hora ajustadas
                var fechaYHoraSalida = fechayhorasalida.toLocaleDateString() + ' ' + horaAjustada;
                var fechaYHoraLlegada = fechayhorallegada.toLocaleDateString() + ' ' + horaAjustadallegada;


                console.log("Hora ajustada:", horaAjustada);


                if (tipo == "premium-id") {
                    tipo = "Primera"
                }
                else if (tipo == "normal-id") {
                    tipo = "Plus"
                }
                else if (tipo == "de5a7752-a52c-41b0-a01e-99d51f73abde") {
                    tipo = "Básico"
                }


                var fechaYHoraSalida = fechayhorasalida.toLocaleString();
                var fechaYHoraLlegada = fechayhorallegada.toLocaleString();




                tr.innerHTML = `


                               <td>${corrida}</td>
                               <td>${tipo}</td>
                               <td>${origen}</td>
                               <td>${destino}</td>
                               <td>${bus == null ? '' : bus}</td >
                               <td>${formattedSalida}</td>
                               <td>${formattedLlegada}</td>
                               <td>${precio} $ </td>
                               <td>
                                  <button 
                                        class="btn btn-primary"     
                                        id="cancelar{i}" 
                                        value="${alldata[i].TripId}" 
                                        onclick="cancelar('${id}', '${corrida}', '${tipo}', '${origen}', '${destino}','${bus}','${departingOrigen}','${departingDestino}','${precio}',  '${Arrival}', '${Departure}', '${RunId}', ${totaltime}, '${type}', '${i}', '${bus_specific}'   )">
                                        Cancelar
                                  </button>
                               </td>

                           `;

                tbody.appendChild(tr);
                addedTripIds[id] = true;


            }


            const liquidname = document.getElementById('table');



            document.getElementById('section-boletos').style.display = 'block';
            btn_trip.textContent = "Buscar viaje"

            btn_trip.classList.remove('btn-outline-primary')
            btn_trip.classList.add('btn-success')
            setTimeout(() => {
                btn_trip.classList.remove('btn-success')
                btn_trip.classList.add('btn-primary')
                btn_trip.disabled = false;


            }, "2000");



        })
        .catch(error => {

            btn_trip.disabled = false
            Swal.fire({
                title: "Error!",
                text: `${error}`,
                icon: "error"
            });
        });
}

function formatDateTime(inputDateTime) {
    var date = new Date(inputDateTime);

    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
    var year = String(date.getFullYear()).slice(-2); // Solo tomamos los últimos dos dígitos del año
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}