var id = ""
var corrida = ""
var tipo = ""
var type = ""
var origen = ""
var destino = ""
var bus = ""
var departingOrigen = ""
var departingDestino = ""
var precio = ""
var Arrival = ""
var Departure = ""
var RunId = ""
var totaltime = ""
var numseat = ""
var seatcount = 1
var seatcounter = 0
var isaleid = ""


document.addEventListener('DOMContentLoaded', () => {


  


    document.getElementById('btn-buscar').addEventListener('click', async () => {

        document.getElementById('spanTexto').style.display = 'none'
        document.getElementById('spanTexto2').style.display = 'none'
        // Obtén el valor del ticket
        var ticket = document.getElementById('boletoanterior').value;

        localStorage.setItem("oldticket", ticket)

        // Verifica si el campo de entrada está vacío
        if (ticket.trim() === '') {
            alert("Debes ingresar un boleto");
            return; // Detiene la ejecución si el campo está vacío
        }

        // Cambia el texto del botón y deshabilítalo mientras se realiza la búsqueda
        document.getElementById('btn-buscar').textContent = "Buscando...";
        document.getElementById('btn-buscar').disabled = true;

        try {
            // Llama a la función para buscar el boleto
            const data1 = await BuscarBoletoUno(ticket);
            document.getElementById('bus-container').style.display = 'none'
            var contentcards = document.getElementById("content-cards")
            var floor1 = document.getElementById('floor-1')
            var floor2 = document.getElementById('floor-2')

            seatcount = 1
            seatcounter = 0

            floor1.innerHTML = ''
            floor2.innerHTML = ''
            contentcards.innerHTML = ''



            limpiarTabla()
            // Crea las tablas y realiza los cambios necesarios en la interfaz
            CrearTablas(data1, 'tableticket');
            iniciarCambio();

            // Muestra la sección del viaje
            document.getElementById("section-viaje").style.display = "block";
        } catch (error) {
            console.error("Error al buscar el boleto:", error);
            alert("Hubo un error al buscar el boleto. Por favor, intenta nuevamente.");
        } finally {
            // Restablece el botón
            document.getElementById('btn-buscar').disabled = false;
            document.getElementById('btn-buscar').textContent = "Buscar";
        }
    });





    const btn_siguiente1 = document.getElementById('btn-siguiente1')
        .addEventListener('click', () => {

            descuento = 0.70
            document.getElementById('section-pasajero').style.display = 'none'
            document.getElementById('bus-container').style.display = 'block'

            var Nombre = document.getElementById('input-nombre-pasajero').value
            localStorage.setItem("nombrepasajero_cambio", Nombre)

            var tipopasajero = document.getElementById('select-pasajero').value
            localStorage.setItem("tipopasajero_cambio", tipopasajero)

            var dataid = localStorage.getItem("tripid_cambio")

            var precionuevo = parseFloat(localStorage.getItem('precionuevo'))

            var origencambio = localStorage.getItem('origen_cambio')
            var destinocambio = localStorage.getItem('destino_cambio')


            switch (tipopasajero) {
                case 'ADULT':
                    precionuevo = precionuevo
                    break;
                case 'CHILD':
                    precionuevo = precionuevo * descuento
                    break;  
                case 'STUDENT':
                    precionuevo = precionuevo * descuento
                    break;
                case 'OLDER_ADULT':
                    precionuevo = precionuevo * descuento
                    break;
                        
            }


            localStorage.setItem('precionuevo', precionuevo)

            let tabla = document.getElementById('table-ticket-nuevo');

            // Crea una nueva fila
            let nuevaFila = tabla.insertRow(); // Agrega una nueva fila al final de la tabla

            // Crea celdas para la nueva fila
            let celdaNombre = nuevaFila.insertCell(0);
            let celdaOrigen = nuevaFila.insertCell(1);
            let celdaDestino = nuevaFila.insertCell(2);
            let celdaAsiento = nuevaFila.insertCell(3);
            let celdaPrecio = nuevaFila.insertCell(4); // Columna de Precio
            let celdaTicket = nuevaFila.insertCell(5);

            celdaNombre.innerHTML = Nombre; // Cambia esto según sea necesario
            celdaOrigen.innerHTML = origencambio; // Cambia esto según sea necesario
            celdaDestino.innerHTML = destinocambio; // Cambia esto según sea necesario
            celdaAsiento.innerHTML = `<p id="seatrow"></p>`; // Cambia esto según sea necesario
            celdaPrecio.innerHTML = precionuevo; // Asigna el valor del precio
            celdaTicket.innerHTML = `<p id="ticketrow"></p>`; // 

            crearasientos(tipo, dataid)

        })





    function CrearTablas(data, id) {

        var tabla = document.getElementById(`${id}`).getElementsByTagName('tbody')[0];
        var tr = document.createElement('tr');

        document.getElementById('cancelarCambio').disabled = false 

        data.map(e => {

            localStorage.setItem("precio_anteriorcambio", e.precio)
            localStorage.setItem("asiento_anterior_cambio", e.asiento)
            localStorage.setItem('isale_cambio', e.isaleid)
            localStorage.setItem('tickett_cam', e.ticket)



            let salesData = localStorage.getItem('salesNumbersolds');

            // Inicializar el array de ventas
            let salesArray;

            // Verificar si hay datos y analizarlos, o inicializar un array vacío
            if (salesData) {
                try {
                    salesArray = JSON.parse(salesData);
                } catch (error) {
                    console.error("Error al analizar JSON:", error);
                    salesArray = []; // Inicializar un array vacío en caso de error
                }
            } else {
                salesArray = []; // No hay datos, inicializar un array vacío
            }

            // Añadir el nuevo número de venta al array (incluso si ya existe)
            salesArray.push(e.salenumber);

            // Guardar el array actualizado en localStorage
            localStorage.setItem('salesNumbersolds', JSON.stringify(salesArray));




localStorage.setItem('numero_venta_viejo', e.salenumber);



            tr.innerHTML = `
    
                    <td>${e.pasajero}</td>
                    <td>${e.origen}</td>
                    <td>${e.destino}</td>
                    <td>${e.asiento}</td>
                    <td>${e.precio}</td>
                    <td>${e.ticket}</td>
    
                    `;

            tabla.appendChild(tr)

        })


    }



    var btn_buscar = document.getElementById("btn-buscar-viaje")
        .addEventListener('click', () => {
            var origen = document.getElementById('origen').value
            var destino = document.getElementById('destino').value
            var fecha = document.getElementById('fecha').value

            buscarviajes(origen, destino, fecha)
        })





    function buscarviajes(origen, destino, fechaSalida) {



        fetch(`http://apitaquillassag.dyndns.org/Home/BuscarCorridas?origen=${origen}&destino=${destino}&fecha=${fechaSalida}`, {

        })
            .then(response => response.json())
            .then(data => {



                console.log(data)

                var alldata = data
                var addedTripIds = {};
                console.log(data)
                var contentcards = document.getElementById("content-cards")

                document.getElementById('spanTexto2').style.display = 'none'
                document.getElementById('spanTexto').style.display = 'none'

                contentcards.innerHTML = ''

                for (i = 0; i < alldata.length; i++) {
                    console.log(alldata[i].Corrida)


                    id = alldata[i].tripID
                    corrida = alldata[i].NombreCorrida
                    tipo = alldata[i].TipoServicio
                    type = alldata[i].TipoServicio
                    origen = alldata[i].Origen
                    destino = alldata[i].Destino
                    bus = alldata[i].Bus
                    departingOrigen = alldata[i].origencorridabuscada
                    departingDestino = alldata[i].llegadacorridabuscada
                    precio = alldata[i].Precio
                    Arrival = alldata[i].Arrival
                    Departure = alldata[i].Departure
                    RunId = alldata[i].RunId
                    totaltime = alldata[i].totaltime
                    isaleid = alldata[i].isaleid



                    // Convertir la cadena de fecha y hora en un objeto de fecha de JavaScript
                    var fechayhorasalida = new Date(departingOrigen);
                    var fechayhorallegada = new Date(departingDestino);
                    var horaActual = new Date();


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



                    contentcards.innerHTML += `

                        <div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${origen} - ${destino}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Salida: ${departingOrigen} llegada: ${departingDestino}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">precio: $ ${precio}</h6>
                            <p class="card-text">corrida: ${corrida}</p>
                            <p class="card-text">tipo: ${tipo}</p>
                            <button class="btn btn-primary" onClick=" enviardata('${id}', '${corrida}', '${tipo}', '${origen}', '${destino}','${bus}','${departingOrigen}','${departingDestino}','${precio}',  '${Arrival}', '${Departure}', '${RunId}', ${totaltime}, '${type}', '${isaleid}')">escoger</button>
                        </div>
                    </div> 

                    `


                    addedTripIds[id] = true;

                }
            })

            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "error"
                });
            });


    }

})








async function enviardata(id, corrida, tipo, origen, destino, bus, departingOrigen, departingDestino, precio, Arrival, Departure, RunId, totaltime, type,) {
    document.getElementById("section-viaje").style.display = 'none';

    if (id == "") {

        id = await gettripid(RunId, type, Departure, Arrival, totaltime)




    }
    localStorage.setItem('tripid_cambio', id)
    localStorage.setItem('precionuevo', precio)
    localStorage.setItem('origen_cambio', origen)
    localStorage.setItem('destino_cambio', destino)
    localStorage.setItem('runid_cambio', RunId)

    localStorage.setItem('tripid_cambio', id)
    await contarInapam(id)
    await ContarEstudiante(id)


    document.getElementById('section-pasajero').style.display = "block"


    document.getElementById('newcardbody').style.display = 'block'

    var table = await document.getElementById('table-ticket-nuevo').getElementsByTagName('tbody')[0]
    var tr = await document.createElement('tr')
    tr.innerHTML = ``

}


function contarInapam(id) {

    fetch(`http://apitaquillassag.dyndns.org/Home/ContarInapam?TripId=${id}`)

        .then(response => response.json())
        .then(data => {

            const cant_inapam = data

            if (cant_inapam == 4) {

                // eliminar de las opciones de tipo de pasajero

                document.getElementById('"option-inapam"').style.display = 'none'
            }


        })
        .catch(error => {

            Swal.fire({
                title: "Error",
                text: `error al contar inapam:  $ ${error}}`,
                icon: "eror"
            });

        })
}


function ContarEstudiante(id) {

    fetch(`https://api.sagautobuses.com/Home/GetParameter`)

        .then(response => response.json())
        .then(data => {


            if (data.valor != "enabled") {

                document.getElementById('option-estudiante').style.display = "none"
            }

            else {

                fetch(`http://apitaquillassag.dyndns.org/Home/Contarstudent?TripId=${id}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)

                        var cant_students = data

                        if (cant_students == 6) {

                            document.getElementById('option-estudiante').style.display = "none"


                        }

                    }).catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `Error al contar los estudiantes  $ ${error}`,
                            icon: "error"
                        });

                    })
            }

        }).catch(error => {

            Swal.fire({
                title: "Error!",
                text: `No se pudo verificar el descuento de estudiantes:  $ ${error}`,
                icon: "error"
            });

        })
}

async function gettripid(RunId, type, Departure, Arrival, totaltime) {
    try {
        const response = await fetch(`http://apitaquillassag.dyndns.org/Home/AgregarTrip?runid=${RunId}&service=${type}&departure=${Departure}&arriveDate=${Arrival}&totalTime=${totaltime}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('La solicitud falló');
        }

        const data = await response.text();
        console.log("Respuesta:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}



async function BuscarBoletoUno(ticket) {
    try {
        const response = await fetch(`http://apitaquillassag.dyndns.org/Home/GetDataTicket?ticket=${ticket}`);

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}




function iniciarCambio() {
    $(document).ready(function () {
        $('#origen').select2({
            selectOnClose: true,
            tags: true // Permite que el usuario escriba texto que no está en la lista
        });

        $('#destino').select2({
            selectOnClose: true,
            tags: true // Permite que el usuario escriba texto que no está en la lista
        });

        // Cargar datos en el select de origen
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
                var selectOrigen = $('#origen');

                // Limpiar opciones existentes
                selectOrigen.empty().append('<option value="">Seleccione un origen</option>');

                data.forEach(option => {
                    var newOption = new Option(option.name, option.name, false, false);
                    selectOrigen.append(newOption);
                });

                // Inicializar Select2 nuevamente para aplicar los cambios
                selectOrigen.select2();

                // Evento para establecer el foco en el campo de búsqueda al abrir el select
                selectOrigen.on('select2:open', function () {
                    setTimeout(function () {
                        $('.select2-search__field').focus();
                    }, 1);
                });

                // Agregar evento de búsqueda
                selectOrigen.on('change', function () {
                    var IDOrigen = selectOrigen.val();
                    var Origen = selectOrigen.find("option:selected").text();

                    var data = { origen: Origen };

                    fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
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

                            // Limpiar opciones existentes
                            selectDestino.empty().append('<option value="">Seleccione un destino</option>');

                            responseData.forEach(option => {
                                var newOption = new Option(option.name, option.name, false, false);
                                selectDestino.append(newOption);
                            });

                            // Inicializar Select2 nuevamente para aplicar los cambios
                            selectDestino.select2();

                            // Evento para establecer el foco en el campo de búsqueda al abrir el select
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
                        });
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "error"
                });
            });
    });

}




function crearasientos(tipo, id) {


    Promise.all([
        fetch(`http://apitaquillassag.dyndns.org/Home/Asientos?Servicelvl=${tipo}`).then(response => response.json()),
        fetch(`http://apitaquillassag.dyndns.org/Home/listarAsientosOcupados?TripId=${id}`).then(response => response.json())
    ])
        .then(([seatData, statusData]) => {
            if (!Array.isArray(seatData)) {
                console.error('seatData is not an array:', seatData);
                return;
            }
            if (!Array.isArray(statusData)) {
                console.warn('statusData is not an array:', statusData);
                statusData = [];
            }
            renderSeats(seatData, statusData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function createSeatElement(seat, statusData) {
        const seatElement = document.createElement('button');
        seatElement.classList.add('btn');
        seatElement.textContent = seat.name;
        seatElement.style.gridColumnStart = parseInt(seat.column) + 1;
        seatElement.style.gridRowStart = parseInt(seat.row) + 1;

        if (statusData.length === 0) {
            seatElement.classList.add('btn-primary');
           
        

        } else {
            const seatStatus = statusData.find(status => status.asiento == seat.name);
            if (seatStatus && seatStatus.status === 'OCCUPIED') {
                seatElement.classList.add('btn-danger');
                

            } else {
                seatElement.classList.add('btn-primary');
             

            }
        }


        seatElement.addEventListener('click', () => {
            if (seatElement.classList.contains('btn-danger')) {
                // Si el botón ya tiene la clase 'btn-danger', quitarla y restar del contador
                seatElement.classList.remove('btn-danger');
                seatElement.classList.add('btn-primary');
                document.getElementById('seatrow').textContent = ""
                seatcounter -= 1;

            } else {
                // Si el botón no tiene la clase 'btn-danger', añadirla y sumar al contador
                if (seatcounter >= 1) {
                    alert("No puedes agregar más asientos");
                } else {
                    seatElement.classList.remove('btn-primary');
                    seatElement.classList.add('btn-danger');
                    numseat = seat.name;

                    localStorage.setItem("asiento_cambio", seat.name)
                    document.getElementById('seatrow').textContent = seat.name

                    seatcounter += 1;
                }
            }
        });


        var precio_anteriorcambo = localStorage.getItem('precio_anteriorcambio')
        var nuevo = localStorage.getItem('precionuevo')
        var precio_anterior = parseFloat(precio_anteriorcambo)
        var precionuevo = parseFloat(nuevo)

        var res = precio_anterior - precionuevo

        document.getElementById('spanTexto2').style.display = 'block'
        document.getElementById('spanTexto2').textContent = `la diferencia de precio es de: ${res} `

        return seatElement;
    }


    function renderSeats(seatData, statusdata) {

        const floor1 = document.getElementById('floor-1');
        const floor2 = document.getElementById('floor-2');
        seatData.forEach(seat => {
            if (seat.type == "BATHROOM" || seat.type == "DOOR") {

            } else {
                const seatElement = createSeatElement(seat, statusdata);
                if (seat.floor === "1") {
                    floor1.appendChild(seatElement);
                } else if (seat.floor === "2") {
                    floor2.appendChild(seatElement);
                }
            }
        });
    }
}




function ProcederBoleto() {

    var nombre = localStorage.getItem("nombrepasajero_cambio")
    var tipo = ""
    var tipopasajero = localStorage.getItem("tipopasajero_cambio")

    var dataid = localStorage.getItem('tripid_cambio')

    var asiento_cambio = localStorage.getItem("asiento_cambio")
    var precio_anterior = localStorage.getItem("precio_anteriorcambio")
    var asiento_anterior = localStorage.getItem("asiento_anterior_cambio")
    var precio_nuevo = localStorage.getItem("precionuevo")
    var oldticket = localStorage.getItem('oldticket')
    var origen = localStorage.getItem('origen_cambio')
    var destino = localStorage.getItem('destino_cambio')
    var runid = localStorage.getItem('runid_cambio')
    var isale = localStorage.getItem('isale_cambio')
    var user = localStorage.getItem('id')
    var terminal = localStorage.getItem('terminal_id')
    var saleshift = localStorage.getItem('saleshift_id')
    var origen = localStorage.getItem('origen_cambio')
    var destino = localStorage.getItem('destino_cambio')
    var ticketsito = localStorage.getItem('tickett_cam')

    //  alert(`${nombre}` + `${tipopasajero}` + ` ${dataid}` + ` ${asiento_anterior}` + ` ${asiento_cambio}` + ` ${precio_anterior}`)

    var Boletocambio = {

        "oldticket": ticketsito,
        "cancelUserId": user

    }

    console.log(Boletocambio)


    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
            // Podrías añadir otros encabezados aquí según sea necesario
        },
        body: JSON.stringify(Boletocambio)
    };




    if (tipopasajero == "Adulto") {
        tipo = "ADULT";
    } else if (tipopasajero == "Niño") {
        tipo = "CHILD";
    } else if (tipopasajero == "Adulto Mayor") {
        tipo = "OLDER_ADULT";
        console.log("Seleccionaste la opción 3");
    } else if (tipopasajero == "Estudiante") {
        tipo = "STUDENT";
    } else {
        console.log("Opción no válida");
    }


    var shiftnumber = localStorage.getItem('shift_number')

    var num_ventas = localStorage.getItem('num_ventas')

    var numero = parseInt(num_ventas)

    numero = numero + 1


    localStorage.setItem('num_ventas', numero.toString())

    var shift_number_to_is = shiftnumber + "-" + numero
    alert(shift_number_to_is)


    var lista_ventas = localStorage.getItem("array_ventas")

    var lista_ventasstr = lista_ventas ? JSON.parse(lista_ventas) : [];

    // Añadir el nuevo valor al array
    lista_ventasstr.push(shift_number_to_is);

    // Convertir la lista actualizada a cadena y almacenarla en localStorage
    localStorage.setItem("array_ventas", JSON.stringify(lista_ventasstr));


    const tripseats = {
        "Name": nombre,
        "Origin": origen,
        "Destination": destino,
        "Bus": "",
        "PassengerName": nombre,
        "PassengerType": tipopasajero,
        "SeatName": asiento_cambio,
        "SoldPrice": parseFloat(precio_nuevo),
        "PayedPrice": parseFloat(precio_nuevo),
        "OriginalPrice": parseFloat(precio_nuevo),
        "Trip_ID": dataid,
        "UserId": user

    }


    const InternetSale =
    {
        "totalAmount": parseFloat(precio_nuevo),
        "changeAmount": tipo != "ADULT" ? (parseFloat(precio_nuevo) - parseFloat(precio_anterior)) : 0.00,
        "PaymentType": "cash",
        "payedAmount": parseFloat(precio_nuevo),
        "salesTerminalId": terminal,
        "salesmanId": user,
        "salesShiftId": saleshift,
        "saleNumber": shift_number_to_is,
        "short_id": generarID(),
        "tripseatlist": [tripseats],
        "Email": "devs@sag.com"
    }



    console.log(JSON.stringify(InternetSale))
    // Realizar la solicitud PATCH usando fetch
    fetch('http://apitaquillassag.dyndns.org/Home/cambiarBoleto', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema con la solicitud: ' + response.status);
            }
            return response.text(); // Analizar la respuesta JSON si es necesario
        })
        .then(data => {
            console.log('Solicitud PATCH exitosa:', data);

            fetch('http://apitaquillassag.dyndns.org/Home/VerIS', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(InternetSale)
            })
                .then(response => response.text())
                .then(data => {

                    alert("success")
                    console.log(data)
                    document.getElementById('seatrow').textContent = data
                    document.getElementById('seatrow').style.backgroundColor = green

                    var precionuevo = localStorage.getItem('precionuevo')
                    var parseprecionuevo = parseFloat(precionuevo)
                    var ventareciente = localStorage.getItem('venta_reciente')
                    var parseventa = parseFloat(ventareciente)
                    var suma = parseventa + parseprecionuevo
                    localStorage.setItem('venta_reciente', suma)

                    document.getElementById('spanTexto').style.display = 'block'
                    document.getElementById('spanTexto').textContent = `el nuevo folio es: ${data} puedes descargar el boleto en el menu "Buscar Boleto"`
                })
                .catch(error => {
                    alert(error)
                })
        })
        .catch(error => {
            console.error('Error al realizar la solicitud PATCH:', error);
            // Aquí puedes manejar errores de la solicitud
        });
}



function generarID() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 8; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(indice);
    }

    return id;
}



function Toupper() {
    var inputElement = document.getElementById('input-nombre-pasajero');
    inputElement.value = inputElement.value.toUpperCase();
}


function limpiarTabla() {
    var tabla = document.getElementById('tableticket');
    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}



function CancelarOperacion() {

    let salesData = localStorage.getItem('salesNumbersolds');

    // Verificar si hay datos y analizarlos
    if (salesData) {
        try {
            let salesArray = JSON.parse(salesData);

            // Verificar si el array tiene elementos
            if (salesArray.length > 0) {
                // Eliminar el último elemento del array
                salesArray.pop();

                // Actualizar localStorage con el nuevo array
                localStorage.setItem('salesNumbersolds', JSON.stringify(salesArray));
                console.log("Última venta eliminada");
            } else {
                console.log("El array de ventas está vacío, no hay nada que eliminar");
            }
        } catch (error) {
            console.error("Error al analizar JSON:", error);
        }
    } else {
        console.log("No hay datos de ventas en localStorage");
    }

    alert("Operacion cancelada")
    document.getElementById('cancelarCambio').disabled = true
}