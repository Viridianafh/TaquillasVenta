var count_pasajeros = 0
var countadulto = 0
var precio_adulto = 0
var countnino = 0
var precionino = 0
var countinapam = 0
var precioinapam = 0
var countstudent = 0
var preciostudent = 0
var total = 0
var totalInapam = 4
var countasientos = 0;
var countpasajero = 1;
var countpasajerofinal = 1
precio_base = 0;
var ventasls = localStorage.getItem('venta_reciente')
var startdate = ""

localStorage.setItem("array_checkpoints", [])





document.addEventListener('DOMContentLoaded', () => {



    localStorage.setItem('datos_viaje', "")
    localStorage.setItem('datosInternetsale', "")
    localStorage.setItem('pasajeros', "")

    var fechaActual = new Date();

    // Formatear la fecha para que sea compatible con el atributo min de input type="date"  
    var fechaFormateada = fechaActual.toISOString().split('T')[0];

    // Asignar la fecha formateada como el valor mínimo
    //document.getElementById('fecha').setAttribute('min', fechaFormateada);

    //// Establecer el valor del campo de fecha como la fecha actual
    //document.getElementById('fecha').value = fechaFormateada;




    var totaldelaventa = localStorage.getItem('venta_reciente')
    if (parseFloat(totaldelaventa) >= 3000) {
        Swal.fire({
            title: "Has llegado al maximo en tu caja",

            text: 'Debes realizar el corte',
            icon: "info"
        });

        document.getElementById('section-precorte').style.display = "block"
        document.getElementById('section-iniciar').style.display = "none"
        document.getElementById('totalprecorte').textContent = totaldelaventa.toString()

    } else {

        var ventas = localStorage.getItem('num_ventas')
        var numeroVentas = parseInt(ventas)
        if (numeroVentas >= 1) {


            if (localStorage.getItem('id') != null && localStorage.getItem('office_location_id') != null) {

                iniciarturno()

            } else {
                Swal.fire({
                    title: "Error",
                    text: 'Debes Tener una terminal asignada para poder empezar tu turno',
                    icon: "info"
                });
                document.getElementById('section-iniciar').style.display = "none"

            }

        }


    }




    const btn_retirar_precorte = document.getElementById('btn-retirar-precorte')
    btn_retirar_precorte.addEventListener('click', () => {



        var saleshift = localStorage.getItem('saleshift_id')
        var monto = document.getElementById('monto-precorte').value
        var monto_retirar = parseFloat(monto)



        if (monto_retirar <= 0) {

            alert("no puedes  retirar esta cantidad")
            var ventas = localStorage.getItem('array_ventas')
            var arrayventas = JSON.parse(ventas)
            console.log(arrayventas)


        } else {


            var venta = localStorage.getItem('venta_reciente')
            var venta_reciente = parseFloat(venta)

            var sobrante = venta_reciente - monto_retirar


            const CashCheckpoint = {

                sale_shift_id: saleshift,
                previous_amount: monto_retirar,
                new_amount: sobrante

            }


            fetch('http://apitaquillassag.dyndns.org/Home/Precorte', {

                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(CashCheckpoint)

            })
                .then(response => response.text())
                .then(data => {

                    if (data.length <= 6) {



                        Swal.fire({
                            title: "Error!",
                            text: `${error}`,
                            icon: "error"
                        });




                        window.locarion.reload()

                    } else {



                        localStorage.setItem('cashcheckpoint', data);

                        var cashcheckpoint = localStorage.getItem('cashcheckpoint');

                        var salesnumberArray = JSON.parse(localStorage.getItem('array_ventas')) || [];

                        let Saleshift = salesnumberArray.map(salesnumber => {
                            return {
                                salesnumber: salesnumber
                            };
                        });

                        console.log(Saleshift);



                        fetch(`http://apitaquillassag.dyndns.org/Home/agregarCashCheckpoint?cashcheck=${cashcheckpoint}`, {

                            method: 'PATCH',
                            headers: {
                                'Accept': 'text/plain',
                                'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
                            },
                            body: JSON.stringify(Saleshift)

                        })
                            .then(response => response.text())
                            .then(data => {



                                if (data == "Operación exitosa") {
                                    Swal.fire({
                                        title: "Puedes Continuar!",
                                        text: `se abre de nevo la caja`,
                                        icon: "success"
                                    });


                                    location.href = "informePrecorte.aspx"

                                    if (ventasls < 3000) {

                                    } else {

                                        localStorage.setItem('venta_reciente', sobrante.toString())

                                    }


                                } else {


                                    Swal.fire({
                                        title: "Error!",
                                        text: `Hubo un error`,
                                        icon: "error"
                                    });

                                }

                            }).catch(error => {

                                Swal.fire({
                                    title: "Error!",
                                    text: `Hubo un error: mensaje ${error}`,
                                    icon: "error"
                                });

                            })
                    }
                }).catch(error => {

                    Swal.fire({
                        title: "Error!",
                        text: `Hubo un error: mensaje ${error}`,
                        icon: "error"
                    });

                })
        }
    })





    var totalorasi = 0
    totalStudent = 6



    const btnIniciar = document.getElementById("button_iniciar")
    btnIniciar.addEventListener('click', () => {


        localStorage.setItem('num_ventas', 0)
        iniciarturno()

    })




    const btnprecorte = document.getElementById('button_precorte')
    btnprecorte.addEventListener('click', () => {



        var dataventareciente = localStorage.getItem('venta_reciente');

        var totaprecorte = document.getElementById('totalprecorte');
        totaprecorte.textContent = dataventareciente;


        document.getElementById('section-precorte').style.display = 'block'
        document.getElementById('section-iniciar').style.display = 'none'



    })




    const button_cerrar_caja = document.getElementById('button_cerrar_caja')
    button_cerrar_caja.addEventListener('click', () => {

        var saleshiftid = localStorage.getItem('saleshift_id')
        var montoprevio = localStorage.getItem('venta_reciente')
        var monto = parseFloat(montoprevio)


        if (monto < 3000 && monto > 0) {

            CerrarCajamenor()

        } else if (monto == 0) {
            CerrarCajavacia()
        }

        else {


            var CashCheckpoint = {

                sale_shift_id: saleshiftid,
                previous_amount: monto,
                new_amount: 0.0
            };
        }


    })





    const btn_trip = document.getElementById('btn-trip')

    btn_trip.addEventListener('click', () => {

        btn_trip.textContent = ""
        btn_trip.disabled = true;
        btn_trip.textContent = "Buscando..."
        btn_trip.classList.remove('btn-primary')
        btn_trip.classList.add('btn-outline-primary')


        limpiarTabla()

        const row = document.getElementsByTagName('tbody')



        var Origen = document.getElementById('origen')
        Origen = Origen.options[Origen.selectedIndex].text;

        var Destino = document.getElementById('destino')
        Destino = Destino.options[Destino.selectedIndex].text;

        var Fecha_salida = document.getElementById('fecha').value
        startdate = Fecha_salida;

        const Viaje = {

            "origen": Origen,
            "destino": Destino,
            "fechaSalida": Fecha_salida,

        }


        console.log(JSON.stringify(Viaje))


        fetch(`http://apitaquillassag.dyndns.org/Home/BuscarCorridas?origen=${Viaje.origen}&destino=${Viaje.destino}&fecha=${Viaje.fechaSalida}`, {

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
                        text: 'No existen viajes. Prueba para otra fecha u otro destino',
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
                                        id="comprar" 
                                        value="${alldata[i].TripId}" 
                                        onclick="Comprar('${id}', '${corrida}', '${tipo}', '${origen}', '${destino}','${bus}','${departingOrigen}','${departingDestino}','${precio}',  '${Arrival}', '${Departure}', '${RunId}', ${totaltime}, '${type}'   )">
                                        Comprar
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
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "error"
                });
            });


    })



    const sendata = () => {

        var maintest = document.getElementById();


    }


    function limpiarTabla() {
        var tabla = document.getElementById('tabla-viajes');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
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


    function limpiarTablaAsientosPasajeros() {
        var tabla = document.getElementById('tabla-pasajeros');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
    }

    function limpiarTablacardresume() {
        var tabla = document.getElementById('tablacardresume');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
    } function limpiarTablaefectivoresume() {
        var tabla = document.getElementById('tablaefectivoresume');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
    }







    const btn_sumar_adulto = document.getElementById('btn_sumar_adulto')

    btn_sumar_adulto.addEventListener('click', () => {

        countadulto = countadulto + 1


        var label = document.createElement('label')

        label.textContent = "Nombre del pasajero: " + countadulto

        const contentinputs = document.getElementById('contentinputs')


        var input = document.createElement('input')
        input.classList.add("form-control")
        input.classList.add("m-2")
        input.setAttribute("id", `${"input_adulto" + countadulto}`)
        input.setAttribute("oninput", "convertirAMayusculas(this)")

        contentinputs.appendChild(label)
        contentinputs.appendChild(input)

        count_pasajeros = count_pasajeros + 1;


    })



    btn_restar_adulto.addEventListener('click', () => {
        // Código para restar campos de texto+

        if (countadulto > 0) {
            countadulto = countadulto - 1;
            count_pasajeros = count_pasajeros - 1;

            // Elimina el último label y input creados
            var contentinputs = document.getElementById('contentinputs');
            contentinputs.removeChild(contentinputs.lastChild);
            contentinputs.removeChild(contentinputs.lastChild);

        }

    });





    const btn_sumar_niño = document.getElementById('btn_sumar_niño')
    btn_sumar_niño.addEventListener('click', () => {


        countnino = countnino + 1

        var label = document.createElement('label')
        label.textContent = "Nombre del pasajero: " + countnino
        const contentinputs = document.getElementById('contentinputsnino')
        var input = document.createElement('input')
        input.classList.add("form-control")
        input.classList.add("m-2")
        input.setAttribute("id", `${"input_nino" + countnino}`)
        input.setAttribute("oninput", "convertirAMayusculas(this)")
        contentinputs.appendChild(label)
        contentinputs.appendChild(input)

        count_pasajeros = count_pasajeros + 1;

    })


    btn_restar_niño.addEventListener('click', () => {
        if (countnino > 0) {
            countnino = countnino - 1;
            count_pasajeros = count_pasajeros - 1;

            // Elimina el último input y su respectivo label
            const contentinputs = document.getElementById('contentinputsnino');
            const labels = contentinputs.getElementsByTagName('label');
            const inputs = contentinputs.getElementsByTagName('input');

            if (labels.length > 0 && inputs.length > 0) {
                contentinputs.removeChild(labels[labels.length - 1]);
                contentinputs.removeChild(inputs[inputs.length - 1]);
            }
        }
    })




    //inicio Conteo inapam

    const btn_sumar_inapam = document.getElementById('btn_sumar_inapam');
    btn_sumar_inapam.addEventListener('click', () => {
        countinapam = countinapam + 1;

        if (countinapam > totalInapam) {
            btn_sumar_inapam.disabled = true;
        } else {
            var label = document.createElement('label');
            label.textContent = "Nombre del pasajero: " + countinapam;

            const contentinputsinapam = document.getElementById('contentinputsinapam');

            var input = document.createElement('input');
            input.classList.add("form-control");
            input.classList.add("m-2");
            input.setAttribute("id", "input_inapam" + countinapam);
            input.setAttribute("oninput", "convertirAMayusculas(this)");

            contentinputsinapam.appendChild(label);
            contentinputsinapam.appendChild(input);
            count_pasajeros = count_pasajeros + 1;
        }
    });


    const btn_restar_inapam = document.getElementById('btn_restar_inapam');
    btn_restar_inapam.addEventListener('click', () => {

        if (countinapam > 0) {

            countinapam = countinapam - 1;

            if (count_pasajeros > 0) {

                count_pasajeros = count_pasajeros - 1;
            }

            document.getElementById('btn_sumar_inapam').disabled = false;

            // Elimina el último input y su respectivo label
            const contentinputs = document.getElementById('contentinputsinapam');
            const labels = contentinputs.getElementsByTagName('label');
            const inputs = contentinputs.getElementsByTagName('input');

            if (labels.length > 0 && inputs.length > 0) {
                contentinputs.removeChild(labels[labels.length - 1]);
                contentinputs.removeChild(inputs[inputs.length - 1]);
            }
        }
    });




    //fin conteo inapam


    const btn_sumar_estudiante = document.getElementById('btn_sumar_estudiante')
    btn_sumar_estudiante.addEventListener('click', () => {


        countstudent = countstudent + 1

        if (countstudent == totalStudent) {
            btn_sumar_estudiante.disabled = true
        } else {

            var label = document.createElement('label')
            label.textContent = "Nombre completo del pasajero: " + countstudent

            const contentinputsstudent = document.getElementById('contentinputsstudent')


            var input = document.createElement('input')
            input.classList.add("form-control")
            input.classList.add("m-2")
            input.setAttribute("id", `${"input_estudiante" + countstudent}`)
            input.setAttribute("oninput", "convertirAMayusculas(this)")

            contentinputsstudent.appendChild(label)
            contentinputsstudent.appendChild(input)
            count_pasajeros = count_pasajeros + 1;

        }


    })




    const btn_restar_estudiante = document.getElementById('btn_restar_estudiante')

    btn_restar_estudiante.addEventListener('click', () => {
        if (countstudent > 0) {
            countstudent = countstudent - 1;
            count_pasajeros = count_pasajeros - 1;


            // Elimina el último input y su respectivo label
            const contentinputs = document.getElementById('contentinputsstudent');
            const labels = contentinputs.getElementsByTagName('label');
            const inputs = contentinputs.getElementsByTagName('input');

            if (labels.length > 0 && inputs.length > 0) {
                contentinputs.removeChild(labels[labels.length - 1]);
                contentinputs.removeChild(inputs[inputs.length - 1]);
            }
        }
    })







    //para los botones atras y siguiente:


    const btn_atras1 = document.getElementById('btn-atras1')
    btn_atras1.addEventListener('click', () => {

        count_pasajeros = 0
        countadulto = 0
        precio_adulto = 0
        countnino = 0
        precionino = 0
        countinapam = 0
        precioinapam = 0
        countstudent = 0
        preciostudent = 0
        total = 0
        totalInapam = 4
        countasientos = 0;
        countpasajero = 1;
        countpasajerofinal = 1
        precio_base = 0;


        countasientos = 0;
        countpasajero = 1;
        countpasajerofinal = 1



        var divContenedoradulto = document.getElementById("content-count-adulto");

        // Encontrar todos los inputs  y labelsdentro del div contenedor
        var inputsadulto = divContenedoradulto.querySelectorAll('input');
        var labelsadulto = divContenedoradulto.querySelectorAll('label');


        // Eliminar cada input encontrado
        inputsadulto.forEach(function (input) {
            input.remove();
        });

        labelsadulto.forEach(function (label) {
            label.remove();
        })

        var divContenedorninio = document.getElementById("content-count-nino");

        // Encontrar todos los inputs  y labelsdentro del div contenedor
        var inputsninio = divContenedorninio.querySelectorAll('input');
        var labelsninio = divContenedorninio.querySelectorAll('label');


        // Eliminar cada input encontrado
        inputsninio.forEach(function (input) {
            input.remove();
        });

        labelsninio.forEach(function (label) {
            label.remove();
        })


        var divContenedorinapam = document.getElementById("content-count-inapam");

        // Encontrar todos los inputs  y labelsdentro del div contenedor
        var inputsinapam = divContenedorinapam.querySelectorAll('input');
        var labelsinapam = divContenedorinapam.querySelectorAll('label');


        // Eliminar cada input encontrado
        inputsinapam.forEach(function (input) {
            input.remove();
        });

        labelsinapam.forEach(function (label) {
            label.remove();
        })

        var divContenedorstudent = document.getElementById("content-count-estudiantes");

        // Encontrar todos los inputs  y labelsdentro del div contenedor
        var inputsstudent = divContenedorstudent.querySelectorAll('input');
        var labelsstudent = divContenedorstudent.querySelectorAll('label');


        // Eliminar cada input encontrado
        inputsstudent.forEach(function (input) {
            input.remove();
        });

        labelsstudent.forEach(function (label) {
            label.remove();
        })

        document.getElementById('section-pasajeros').style.display = 'none'
        document.getElementById('section-iniciar').style.display = 'block'
        document.getElementById('content-buscador').style.display = 'block'


    })



    const btn_atras2 = document.getElementById('btn-atras2')
    btn_atras2.addEventListener('click', () => {

        countasientos = 0
        document.getElementById('section-pasajeros').style.display = 'block';
        document.getElementById('section-asientos').style.display = 'none';

        // Elimina los datos almacenados en localStorage
        localStorage.removeItem('pasajeros');
        localStorage.removeItem('Total_compra');

        // Restaura el contador de pasajeros
        countpasajero = 1;

        // Restaura el contador de asientos
        countasientos = 0;

        // Elimina las filas de la tabla de pasajeros
        const tablaPasajeros = document.getElementById('tabla-pasajeros');
        const tbody = tablaPasajeros.querySelector('tbody');
        tbody.innerHTML = '';

        // Agrega aquí cualquier otra operación de retroceso necesaria

        // Oculta la sección de asientos
        document.getElementById('section-asientos').style.display = 'none';

    })


    const btn_atras3 = document.getElementById('btn-atras3')
    btn_atras3.addEventListener('click', () => {

        document.getElementById('section-tipo-pago').style.display = 'none';
        document.getElementById('section-asientos').style.display = 'block';

    })


    const btn_atras4 = document.getElementById('btn-atras4')
    btn_atras4.addEventListener('click', () => {
        limpiarTablaefectivoresume()
        document.getElementById('pago-efectivo').style.display = 'none';
        document.getElementById('section-tipo-pago').style.display = 'block';

    })

    const btn_atras5 = document.getElementById('btn-atras5')
    btn_atras5.addEventListener('click', () => {
        limpiarTablacardresume()
        document.getElementById('pago-tarjeta').style.display = 'none';
        document.getElementById('section-tipo-pago').style.display = 'block';

    })





    const btn_siguiente1 = document.getElementById('btn-siguiente1')
    btn_siguiente1.addEventListener('click', () => {


        var grupos = document.querySelectorAll('div[id^="content-count-"]');
        var alMenosUnDivConInputRellenado = false;

        grupos.forEach(function (grupo) {
            var inputs = grupo.querySelectorAll('input');
            if (inputs.length > 0) {
                inputs.forEach(function (input) {
                    if (input.value.trim() !== '') {
                        alMenosUnDivConInputRellenado = true;
                    }
                });
            }
        });

        if (alMenosUnDivConInputRellenado) {


            if (countadulto != 0 || countinapam != 0 || countstudent != 0 || countnino != 0) {

                var inputs = document.querySelectorAll('input');
                var valoresObj = {};
                inputs.forEach(function (input) {
                    var id = input.id;
                    var valor = input.value;
                    valoresObj[id] = valor;
                });

                console.log(valoresObj);

                var pasajeros = JSON.stringify(valoresObj)
                localStorage.setItem('pasajeros', pasajeros)

                document.getElementById('section-pasajeros').style.display = 'none'

                var datosViajeString = localStorage.getItem("datos_viaje");
                var datosViajeObj = JSON.parse(datosViajeString);
                var tipo = datosViajeObj.tipo;
                var id = datosViajeObj.id

                fetch(`http://apitaquillassag.dyndns.org/Home/Asientos?Servicelvl=${tipo}`)
                    .then((response) => response.json())
                    .then((seatData) => {

                        // Hacer otra solicitud fetch para obtener datos de ocupación

                        fetch(`http://apitaquillassag.dyndns.org/Home/listarAsientosOcupados?TripId=${id}`)
                            .then((response) => response.json())
                            .then((occupiedSeats) => {
                                // Llamar a la función para construir el mapa de asientos
                                document.getElementById("section-asientos").style.display = "block"
                                creartabalapasejro();


                                buildSeatMap(seatData, occupiedSeats);

                            })
                            .catch((error) => {

                                Swal.fire({
                                    title: "Error!",
                                    text: `error al listar asientos: ${error}`,
                                    icon: "error"
                                });
                            });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error}`,
                            icon: "error"
                        });
                    });


                function creartabalapasejro() {

                    const pasajerosJSON = localStorage.getItem('pasajeros');

                    if (pasajerosJSON) {
                        const pasajeros = JSON.parse(pasajerosJSON);
                        const tablaPasajeros = document.getElementById('tabla-pasajeros');
                        const tbody = tablaPasajeros.querySelector('tbody');
                        var datosViajeString = localStorage.getItem("datos_viaje");
                        var datosViajeObj = JSON.parse(datosViajeString);
                        precio_base = datosViajeObj.precio;
                        precio_descuento = precio_base * 0.70;
                        // Iterar sobre las claves y valores del objeto
                        var totalPrecio = 0;

                        // Iterar sobre las claves y valores del objeto

                        for (const key in pasajeros) {
                            if (pasajeros.hasOwnProperty(key) && key !== "fecha" && key !== "" && pasajeros[key] !== "") {
                                const nombre = pasajeros[key];
                                const tipo = key.split('_')[1] || "otro"; // Obtener el tipo desde el nombre de la clave


                                // Calcular el precio para el pasajero
                                const precioPasajero = tipo.includes("adulto") ? precio_base : precio_descuento.toFixed(2);

                                // Acumular el precio al total
                                totalPrecio += parseFloat(precioPasajero);

                                // Crear una nueva fila en la tabla
                                const fila = document.createElement('tr');
                                fila.innerHTML =
                                    `
                                <td>${nombre}</td>
                                <td>${tipo}</td>
                                <td id="asientoparapasajero${countpasajero}"></td>
                                <td id="precioparapasajero">${precioPasajero}</td>

                                `;
                                document.getElementById('span_total_orasi').innerHTML = totalPrecio.toFixed(2)




                                localStorage.setItem('Total_compra', totalPrecio.toFixed(2))
                                // Agregar la fila al cuerpo de la tabla
                                tbody.appendChild(fila);
                                countpasajero++
                            }
                        }
                    }
                }

                function buildSeatMap(seatData, occupiedSeats) {

                    var datosViajeString = localStorage.getItem("datos_viaje");
                    var datosViajeObj = JSON.parse(datosViajeString);
                    var tipo = datosViajeObj.tipo;
                    if (tipo == "Plus") {

                        document.getElementById('content-floor-indicator').style.display = "flex"
                    } else {
                        document.getElementById('content-floor-indicator').style.display = "none"


                    }


                    var parent = document.getElementById('content_seat');

                    parent.innerHTML = '';

                    var seatcounter = 1;


                    seatData.forEach(e => {



                        var seatElement = document.createElement('div');
                        seatElement.className = `div${e.name} container`;
                        seatElement.id = 'content';

                        var buttonElement = document.createElement('button');
                        buttonElement.id = `Asientos`;
                        buttonElement.value = `${e.name == "00" || e.name == "113" ? "WC" : e.name}`
                        buttonElement.style.width = '80px';
                        buttonElement.style.height = '80px';
                        buttonElement.style.display = e.name === "01" || e.name === "05" || e.name === "00" || e.name === "113" ? 'none' : 'flex';
                        buttonElement.style.alignItems = 'flex-start';
                        buttonElement.style.justifyContent = 'center';
                        buttonElement.style.padding = '5px';

                        var h4Element = document.createElement('h6');
                        var content = (e.floor === "1") ? e.name : `${e.name}/${e.floor}`;
                        h4Element.textContent = (e.name === "00" || e.name === "113") ? "WC" : content;

                        var imgElement = document.createElement('img');
                        imgElement.src = `${e.name == "00" || e.name == "113" ? 'Assets/toilet.png' : 'Assets/asiento.png'}`;
                        imgElement.style.width = '45px';
                        imgElement.style.height = '45px';
                        imgElement.style.objectFit = 'cover';
                        imgElement.style.alignSelf = 'end';
                        imgElement.style.transform = "scaleX(-1)";

                        buttonElement.appendChild(h4Element);
                        buttonElement.appendChild(imgElement);

                        seatElement.appendChild(buttonElement);

                        parent.appendChild(seatElement);

                        // Verificar si el asiento está entre el 1 y el 8
                        if (parseInt(e.name) >= 5 && parseInt(e.name) <= 8) {
                            seatElement.style.marginRight = tipo == "Plus" ? '50px' : '0px'; // Agregar margen inferior para separarlos visualmente
                        }

                        if (occupiedSeats.some(seat => seat.asiento == parseInt(e.name))) {
                            buttonElement.className = 'btn btn-danger';
                        } else {
                            buttonElement.className = 'btn btn-primary';

                            buttonElement.addEventListener('click', () => {
                                if (buttonElement.value == "WC") {
                                    alert("No puedes seleccionar este elemento");
                                } else {
                                    if (buttonElement.className === 'btn btn-primary') {
                                        if (countasientos < count_pasajeros) {
                                            buttonElement.className = 'btn btn-success';
                                            countasientos = countasientos + 1;
                                            //countpasajero = countpasajero - 1;
                                            agregaratabla(buttonElement.value);
                                        } else {
                                            Swal.fire({
                                                title: "Mensaje!",
                                                text: `No puedes escojer mas boletos`,
                                                icon: "info"
                                            });
                                        }
                                    } else {
                                        buttonElement.className = 'btn btn-primary'
                                        countasientos = countasientos - 1;
                                        // countpasajero = countpasajero + 1;
                                        quitartabla(buttonElement.value);
                                    }
                                }
                            });
                        }

                        seatcounter++;
                    });
                }
            } else {

                Swal.fire({
                    title: "mensaje!",
                    text: "Debes Seleccionar Una opcion",
                    icon: "info"
                });
            }

        } else {

            Swal.fire({
                title: "mensaje!",
                text: "Selecciona un tipo de pasajero y agrega sus datos",
                icon: "info"
            });
        }




    })





    const btn_siguiente2 = document.getElementById('btn-siguiente2')
    btn_siguiente2.addEventListener('click', () => {


        if (countasientos == count_pasajeros) {

            procesardatosViaje()
        } else {

            Swal.fire({
                title: "Mensaje",
                text: "Debes Marcar los asientos",
                icon: "info"
            });

        }

    })





    const btn_efectivo = document.getElementById("btn-efectivo")
    btn_efectivo.addEventListener('click', () => {

        document.getElementById("pago-efectivo").style.display = 'block'
        document.getElementById("section-tipo-pago").style.display = "none"

        const datosviaje = localStorage.getItem("datos_viaje")
        const datosInternetsale = localStorage.getItem("datosInternetsale")

        var tbodyrsumeefectiivo = document.getElementById("tbl-resume");

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

            tr.innerHTML = `

                          <td>${datosCombinados.origen}</td>
                          <td>${datosCombinados.destino}</td>
                          <td>${datosCombinados.departingOrigen}
                          <td>${datosCombinados.bus}</td> 
                          <td>${datais[i].pasajero}</td>
                          <td>${tipo}</td>
                          <td>${datais[i].asiento}</td>
                          <td>${datais[i].precio}</td>
                         
                        `;

            tbodyrsumeefectiivo.appendChild(tr);


            var totalapagar = localStorage.getItem("Total_compra")

            document.getElementById("spantotaltotal").innerHTML = totalapagar
        }


    })



    const btn_pagar_tarjeta = document.getElementById('btn-pagar-tarjeta')
    btn_pagar_tarjeta.addEventListener('click', () => {



        var datosViajeString = localStorage.getItem("datos_viaje");
        var datosViajeObj = JSON.parse(datosViajeString);
        var tipo = datosViajeObj.tipo;
        var id = datosViajeObj.id
        var table = document.getElementById("tablacardresume");
        var header = [];
        var rows = [];
        var ticketuserid = localStorage.getItem('id')
        var saleshiftid = localStorage.getItem('saleshift')
        var officelocationid = localStorage.getItem('office_location_id')
        var terminalid = localStorage.getItem('terminal_id')
        var monto_recibido = parseFloat(document.getElementById("txtmonto").value).toFixed(2)
        var totalapagar = parseFloat(localStorage.getItem("Total_compra")).toFixed(2)
        var totalapagar = parseFloat(localStorage.getItem("Total_compra")).toFixed(2)
        var userid = localStorage.getItem('id')


        var terminall = "";
        var officee = "";
        var terminalidd = "";
        var officeidd = "";

        Promise.all([
            localforage.getItem('terminal_name'),
            localforage.getItem('office_name'),
            localforage.getItem('office_location_id'),
            localforage.getItem('terminal_id')
        ]).then(function (values) {
            terminall = values[0];
            officee = values[1];
            officeidd = values[2];
            terminalidd = values[3];

        }).catch(function (err) {
            console.error('Error al recuperar datos:', err);
        });




        if (monto_recibido < totalapagar) {

            Swal.fire({
                title: "mensaje!",
                text: `Debes realizar un monto mayor`,
                icon: "info"
            });


        } else {

            var shiftnumber = localStorage.getItem('shift_number')

            var num_ventas = localStorage.getItem('num_ventas')

            var numero = parseInt(num_ventas)

            numero = numero + 1




            localStorage.setItem('num_ventas', numero.toString())

            for (var i = 0; i < table.rows[0].cells.length; i++) {
                header.push(table.rows[0].cells[i].innerHTML);
            }

            for (var i = 1; i < table.rows.length; i++) {
                var row = {};
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    row[header[j]] = table.rows[i].cells[j].innerHTML;
                }
                rows.push(row);
            }






            //     var res = monto_recibido - totalapagar





            const json = JSON.stringify(rows);


            const jsonObj = JSON.parse(json);


            const nuevoJson = jsonObj.map(item => {
                let tipo = "";

                if (item.Tipo == "Adulto") {
                    tipo = "ADULT";
                } else if (item.Tipo == "Niño") {
                    tipo = "CHILD";
                } else if (item.Tipo == "Adulto Mayor") {
                    tipo = "OLDER_ADULT";
                    console.log("Seleccionaste la opción 3");
                } else if (item.Tipo == "Estudiante") {
                    tipo = "STUDENT";
                } else {
                    console.log("Opción no válida");
                }

                return {
                    "Name": item.nombre,
                    "Origin": item.Origen,
                    "Destination": item.Destino,
                    "Bus": item.Bus,
                    "PassengerName": item.Pasajero,
                    "PassengerType": tipo,
                    "SeatName": item.Asiento,
                    "SoldPrice": parseFloat(item.costo),
                    "PayedPrice": parseFloat(item.costo),
                    "OriginalPrice": parseFloat(item.costo),
                    "Trip_ID": id,
                    "UserId": userid
                };
            });


            const nuevoJsonString = JSON.stringify(nuevoJson, null, 2);

            var shift_number_to_is = shiftnumber + "-" + numero
            alert(shift_number_to_is)





            var lista_ventas = localStorage.getItem("array_ventas")

            var lista_ventasstr = lista_ventas ? JSON.parse(lista_ventas) : [];

            // Añadir el nuevo valor al array
            lista_ventasstr.push(shift_number_to_is);

            // Convertir la lista actualizada a cadena y almacenarla en localStorage
            localStorage.setItem("array_ventas", JSON.stringify(lista_ventasstr));




            const InternetSale =
            {
                "totalAmount": parseFloat(totalapagar),
                "changeAmount": tipo != "ADULT" ? (parseFloat(totalapagar) - parseFloat(precio_base)) : 0.00,

                "PaymentType": "card",
                "payedAmount": parseFloat(precio_base),
                "salesTerminalId": terminalidd,
                "salesmanId": ticketuserid,
                "salesShiftId": localStorage.getItem('saleshift_id'),
                "saleNumber": shift_number_to_is,
                "short_id": generarID(),
                "tripseatlist": nuevoJson
            }


            console.log(InternetSale)





            fetch('http://apitaquillassag.dyndns.org/Home/VerIS', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(InternetSale)
            })
                .then(response => response.text())
                .then(data => {

                    console.log(data)

                    if (data.length == 8) {

                        var elementoEnLocalStorage = localStorage.getItem('venta_reciente');
                        localStorage.setItem('folio', data)

                        if (elementoEnLocalStorage != "") {
                            console.log('El elemento existe en local storage:', elementoEnLocalStorage);

                            var ventatotal = parseFloat(elementoEnLocalStorage);



                            ventatotal = ventatotal + parseFloat(totalapagar);



                            localStorage.setItem('venta_reciente', ventatotal.toString());

                        } else {
                            console.log('El elemento no existe en local storage');

                            localStorage.setItem('venta_reciente', totalapagar.toString());
                        }



                        var currentsale = actualizarCurrentSale();




                    } else {


                        Swal.fire({
                            title: "Ocurrio Un error !",
                            text: `No se Pudo capturar Exitosamente el pago`,
                            icon: "error"
                        });

                    }




                }).catch(error => {


                    Swal.fire({
                        title: "Ocurrio Un error !",
                        text: `No se Pudo capturar Exitosamente el pago`,
                        icon: "error"
                    });

                })


        }




    })







    //pagos en efectivo


    const btnpagar_efectivo = document.getElementById('btnpagar-efectivo')

    btnpagar_efectivo.addEventListener('click', () => {

        var datosViajeString = localStorage.getItem("datos_viaje");
        var datosViajeObj = JSON.parse(datosViajeString);
        var tipo = datosViajeObj.tipo;
        var id = datosViajeObj.id
        var table = document.getElementById("tablaefectivoresume");
        var header = [];
        var rows = [];
        var ticketuserid = localStorage.getItem('id')
        var saleshiftid = localStorage.getItem('saleshift')
        var officelocationid = localStorage.getItem('office_location_id')
        var terminalid = localStorage.getItem('terminal_id')
        var monto_recibido = parseFloat(document.getElementById("txtmonto").value).toFixed(2)
        var totalapagar = parseFloat(localStorage.getItem("Total_compra")).toFixed(2)
        var totalapagar = parseFloat(localStorage.getItem("Total_compra")).toFixed(2)
        var userid = localStorage.getItem('id')







        if (monto_recibido < totalapagar) {

            Swal.fire({
                title: "mensaje!",
                text: `Debes realizar un monto mayor`,
                icon: "info"
            });


        } else {

            var shiftnumber = localStorage.getItem('shift_number')

            var num_ventas = localStorage.getItem('num_ventas')

            var numero = parseInt(num_ventas)

            numero = numero + 1


            localStorage.setItem('num_ventas', numero.toString())

            for (var i = 0; i < table.rows[0].cells.length; i++) {
                header.push(table.rows[0].cells[i].innerHTML);
            }

            for (var i = 1; i < table.rows.length; i++) {
                var row = {};
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    row[header[j]] = table.rows[i].cells[j].innerHTML;
                }
                rows.push(row);
            }

            var res = monto_recibido - totalapagar

            const json = JSON.stringify(rows);


            const jsonObj = JSON.parse(json);

            const nuevoJson = jsonObj.map(item => {
                let tipo = "";

                if (item.Tipo == "Adulto") {
                    tipo = "ADULT";
                } else if (item.Tipo == "Niño") {
                    tipo = "CHILD";
                } else if (item.Tipo == "Adulto Mayor") {
                    tipo = "OLDER_ADULT";
                    console.log("Seleccionaste la opción 3");
                } else if (item.Tipo == "Estudiante") {
                    tipo = "STUDENT";
                } else {
                    console.log("Opción no válida");
                }

                return {
                    "Name": item.nombre,
                    "Origin": item.Origen,
                    "Destination": item.Destino,
                    "Bus": item.Bus,
                    "PassengerName": item.Pasajero,
                    "PassengerType": tipo,
                    "SeatName": item.Asiento,
                    "SoldPrice": parseFloat(item.costo),
                    "PayedPrice": parseFloat(item.costo),
                    "OriginalPrice": parseFloat(item.costo),
                    "Trip_ID": id,
                    "UserId": userid
                };
            });



            const nuevoJsonString = JSON.stringify(nuevoJson, null, 2);






            var shift_number_to_is = shiftnumber + "-" + numero
            alert(shift_number_to_is)


            var lista_ventas = localStorage.getItem("array_ventas")

            var lista_ventasstr = lista_ventas ? JSON.parse(lista_ventas) : [];

            // Añadir el nuevo valor al array
            lista_ventasstr.push(shift_number_to_is);

            // Convertir la lista actualizada a cadena y almacenarla en localStorage
            localStorage.setItem("array_ventas", JSON.stringify(lista_ventasstr));

            const InternetSale =
            {
                "totalAmount": parseFloat(totalapagar),
                "changeAmount": 0.00,
                "PaymentType": "cash",
                "payedAmount": parseFloat(precio_base),
                "salesTerminalId": terminalid,
                "salesmanId": ticketuserid,
                "salesShiftId": localStorage.getItem('saleshift_id'),
                "saleNumber": shift_number_to_is,
                "tripseatlist": nuevoJson
            }


            console.log(InternetSale)




            fetch('http://apitaquillassag.dyndns.org/Home/VerIS', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(InternetSale)
            })
                .then(response => response.text())
                .then(data => {

                    if (data.length == 8) {

                        localStorage.setItem('folio', data)

                        var elementoEnLocalStorage = localStorage.getItem('venta_reciente');


                        if (elementoEnLocalStorage !== null) {
                            console.log('El elemento existe en local storage:', elementoEnLocalStorage);

                            var ventatotal = parseFloat(elementoEnLocalStorage);

                            ventatotal = ventatotal + parseFloat(totalapagar);

                            localStorage.setItem('venta_reciente', ventatotal.toString());

                        } else {
                            console.log('El elemento no existe en local storage');

                            localStorage.setItem('venta_reciente', totalapagar.toString());
                        }


                        var currentsale = actualizarCurrentSale();


                    }


                    else {
                        Swal.fire({
                            title: "Error!",
                            text: `Ocurrio un error`,
                            icon: "error"
                        });
                    }

                })
                .catch(error => {

                    Swal.fire({
                        title: "No se Pudo realizar el pago!",
                        text: `mensaje de error ${error}`,
                        icon: "error"
                    });

                })

        }

    })




    const btn_tarjeta = document.getElementById('btn-tarjeta')
    btn_tarjeta.addEventListener('click', () => {



        document.getElementById("pago-tarjeta").style.display = 'block'
        document.getElementById("section-tipo-pago").style.display = "none"

        const datosviaje = localStorage.getItem("datos_viaje")
        const datosInternetsale = localStorage.getItem("datosInternetsale")

        var tbodyrsumeefectiivo = document.getElementById("tbl-card-resume");

        var datais = localStorage.getItem("datosInternetsale")
        datais = JSON.parse(datais)

        var dataviaje = localStorage.getItem("datos_viaje");
        var datosCombinados = JSON.parse(dataviaje);

        for (var i = 0; i < datais.length; i++) {


            var tr = document.createElement("tr");
            var tipo = datais[i].tipo
            var type = datais[i].tipo
            if (tipo.includes("adulto")) {
                tipo = "Adulto"
            } else if (tipo.includes("nino")) {
                tipo = "Niño"

            } else if (tipo.includes("inapam")) {
                tipo = "Adulto mayor"

            } else if (tipo.includes("estudiante")) {
                tipo = "Estudiante"

            }

            tr.innerHTML = `

                          <td>${datosCombinados.origen}</td>
                          <td>${datosCombinados.destino}</td>
                          <td>${datosCombinados.departingOrigen}
                          <td>${datosCombinados.bus}</td> 
                          <td>${datais[i].pasajero}</td>
                          <td>${tipo}</td>
                          <td>${datais[i].asiento}</td>
                          <td>${datais[i].precio}</td>
                         
                        `;

            tbodyrsumeefectiivo.appendChild(tr);


            var totalapagar = localStorage.getItem("Total_compra")

            document.getElementById("spantotalcard").innerHTML = totalapagar
        }

    })


})





//fin DOMcontent loaded

async function Comprar(id, corrida, tipo, origen, destino, bus, departin_origen, departing_destino, precio, Arrival, Departure, RunId, totaltime, type) {



    console.log("Iniciando agregado de datos")

    if (id == "") {

        id = await gettripid(RunId, type, Departure, Arrival, totaltime)

    }

    var datos_viaje = {

        "id": id,
        "corrida": corrida,
        "tipo": tipo,
        "origen": origen,
        "destino": destino,
        "bus": bus,
        "departingOrigen": departin_origen,
        "departingDestino": departing_destino,
        "precio": precio,
        "arrival": Arrival,
        "Departure": Departure,
        "RunId": RunId,
        "TotalTIme": totaltime

    }

    var Datos_Viaje = JSON.stringify(datos_viaje)

    localStorage.setItem("datos_viaje", Datos_Viaje)




    document.getElementById('content-buscador').style.display = "none"
    document.getElementById('section-boletos').style.display = "none"
    document.getElementById('section-asientos').style.display = "none"

    document.getElementById('section-pasajeros').style.display = "block"



    fetch(`http://apitaquillassag.dyndns.org/Home/ContarInapam?TripId=${id}`)

        .then(response => response.json())
        .then(data => {

            const cant_inapam = data

            if (cant_inapam == 4) {

                document.getElementById('content-count-inapam').style.display = "none"
                document.getElementById("total_inapam").innerHTML = cant_inapam


            }
            else {
                document.getElementById("total_inapam").innerHTML = cant_inapam
                document.getElementById('content-count-inapam').style.display = "block"
            }
            countinapam = cant_inapam
        })
        .catch(error => {

            Swal.fire({
                title: "Error",
                text: `error al contar inapam:  $ ${error}}`,
                icon: "error"
            });

        })


    fetch(`https://api.sagautobuses.com/Home/GetParameter`)

        .then(response => response.json())
        .then(data => {


            if (data.valor != "enabled") {

                document.getElementById('content-count-estudiantes').style.display = "none"
            }

            else {

                fetch(`http://apitaquillassag.dyndns.org/Home/Contarstudent?TripId=${id}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)

                        var cant_students = data

                        if (cant_students == 6) {

                            document.getElementById('content-count-estudiantes').style.display = "none"
                            document.getElementById("BoletosE").innerHTML = cant_students

                        }
                        else {
                            document.getElementById('content-count-estudiantes').style.display = "block"

                            document.getElementById("BoletosE").innerHTML = cant_students

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





function agregaratabla(elemt) {
    // Obtener el primer elemento vacío
    for (var i = 1; ; i++) {
        var dato = document.getElementById(`asientoparapasajero${i}`);
        if (!dato) {
            // Si no se encuentra ningún elemento con ese id, se detiene la búsqueda
            break;
        }
        if (!dato.textContent.trim()) {
            // Si el contenido está vacío, se establece el contenido y se actualiza el contador
            dato.textContent = elemt;
            return; // Salir de la función después de agregar el contenido
        }
    }
    // Si no se encontraron elementos vacíos, se crea uno nuevo
    var newElement = document.createElement("div");
    newElement.id = `asientoparapasajero${i}`;
    newElement.textContent = elemt;
    document.body.appendChild(newElement);

}

function quitartabla(element) {
    // Decrementar countpasajerofinal
    countpasajerofinal--;

    for (var i = 1; ; i++) {
        var elemento = document.getElementById('asientoparapasajero' + i);
        if (!elemento) {
            break;
        }

        if (elemento.textContent.trim() === element.trim()) {
            elemento.textContent = '';
            return; // Salir de la función después de eliminar el contenido
        }
    }
}




function procesardatosViaje() {

    var tabla = document.getElementById("tabla-pasajeros")

    var filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');


    var datos = [];

    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        var celdas = fila.getElementsByTagName('td');


        var filaDatos = {};


        for (var j = 0; j < celdas.length; j++) {

            var columna = tabla.rows[0].cells[j].innerHTML;
            var valor = celdas[j].innerHTML;


            filaDatos[columna.toLowerCase()] = valor;
        }


        datos.push(filaDatos);
    }


    var jsonDatos = JSON.stringify(datos, null, 2);
    localStorage.setItem('datosInternetsale', jsonDatos)

    document.getElementById("section-asientos").style.display = "none"
    document.getElementById("section-tipo-pago").style.display = "block"





}


function iniciarturno() {


    var userId = localStorage.getItem('id');
    var userName = localStorage.getItem('name');
    var lastname = localStorage.getItem('last_name')
    var officeLocationId = localStorage.getItem('office_location_id');
    var nombre_terminal = localStorage.getItem('terminal_name')
    var id_terminal = localStorage.getItem('terminal_id')
    var oficina = localStorage.getItem('office_name')
    var selectOrigen = document.getElementById("origen");



    var terminal = "";
    var office = "";
    var terminalid = "";
    var officeid = "";

    Promise.all([
        localforage.getItem('terminal_name'),
        localforage.getItem('office_name'),
        localforage.getItem('office_location_id'),
        localforage.getItem('terminal_id')
    ]).then(function (values) {
        terminall = values[0];
        officee = values[1];
        officeidd = values[2];
        terminalidd = values[3];

        localStorage.setItem("terminal_name", terminall)
        localStorage.setItem("terminal_id", terminalidd)

    }).catch(function (err) {
        console.error('Error al recuperar datos:', err);
    });

    var clave = "shift_number";


    if (localStorage.getItem(clave) == null) {



        fetch(`http://apitaquillassag.dyndns.org/Home/iniciar turno?iduser=${userId}&user_name=${userName}&locationid=${officeidd}&terminal=${terminalidd}&office_name=${officee}&terminal_name=${terminall}`)
            .then(response => response.json())
            .then(data => {

                console.log(data.shift)
                localStorage.setItem('shift_number', data.shift)
                localStorage.setItem('saleshift_id', data.saleShift)
                var cajaabierta = true

                localStorage.setItem("caja_abierta", cajaabierta)
    // datos forage
                const url = `http://apitaquillassag.dyndns.org/Home/descargar?url=${data.url}`;


                fetch(url)
                    .then(response => {

                        if (!response.ok) {
                            throw new Error(`Error al descargar el archivo. Código de estado: ${response.status}`);
                        }


                        return response.blob();
                    })
                    .then(blob => {

                        const blobUrl = URL.createObjectURL(blob);


                        const link = document.createElement('a');
                        link.href = blobUrl;

                        link.download = 'apertura de caja';


                        document.body.appendChild(link);


                        link.click();


                        document.body.removeChild(link);
                    })
                    .catch(error => {
                        console.error(error);

                    });

            })

        Swal.fire({
            title: "Mensaje!",
            text: `puedes iniciar con la venta`,
            icon: "success"
        });

        var arrayventas = []

        localStorage.setItem("array_ventas", arrayventas)

        localStorage.setItem('venta_reciente', 0)

    } else {

    }


    fetch('http://apitaquillassag.dyndns.org/Home/Origen', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify('')
    })
        .then(response => response.json())
        .then(data => {
            var selectOrigen = document.getElementById('origen');


            while (selectOrigen.options.length > 1) {
                selectOrigen.remove(1);
            }

            data.forEach(option => {
                var newOption = document.createElement("option");
                newOption.value = option.id;
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
        var IDOrigen = selectOrigen.value;
        var Origen = selectOrigen.options[selectOrigen.selectedIndex].text;

        var data = { origen: Origen };


        fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                var selectDestino = document.getElementById('destino');


                while (selectDestino.options.length > 1) {
                    selectDestino.remove(1);
                }


                responseData.forEach(option => {
                    var newOption = document.createElement("option");
                    newOption.value = option.id;
                    newOption.text = option.name;
                    selectDestino.appendChild(newOption);
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


    function searchDestiny() {

        var selectOrigenUs = document.getElementById('origen');
        var selectDestino = document.getElementById('destino');

        var data = { origen: selectOrigenUs.options[selectOrigenUs.selectedIndex].text };


        fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
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
                    var newOption = document.createElement("option");
                    newOption.value = option.id;
                    newOption.text = option.name;
                    selectDestino.appendChild(newOption);
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "error"
                });
            });
    }


    document.getElementById('content-button').style.display = "none"
    document.getElementById('content-buttons').style.display = "flex"
    document.getElementById('content-buscador').style.display = "block"



}




function convertirAMayusculas(input) {
    input.value = input.value.toUpperCase();
}


function validarNumero(input) {

    input.value = input.value.replace(/[^0-9]/g, '');
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





function actualizarCurrentSale() {

    var ventareciente = localStorage.getItem('num_ventas')
    var shiftnumber = localStorage.getItem('shift_number')
    var userid = localStorage.getItem('id')


    fetch(`http://apitaquillassag.dyndns.org/Home/ActualizarSaleShift?userid=${userid}&shiftNumber=${shiftnumber}&currentSale=${ventareciente}`, {

        method: 'PATCH',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
        },
        body: JSON.stringify({})
    })
        .then(response => response.text())
        .then(data => {

            if (data == "OK") {


                Swal.fire({
                    title: "pago realizado!",
                    text: `se ha capturado exitosamente`,
                    icon: "success"
                });


                window.location.href = 'Boletos.aspx'

            } else {

                Swal.fire({
                    title: "Error",
                    text: `Hubo un error al guardar "venta reciente" en el registrod e datos`,
                    icon: "error"
                });
            }

        })



}



function CerrarCajamenor() {


    var saleshift = localStorage.getItem('saleshift_id')
    var venta = localStorage.getItem('venta_reciente')
    var venta_reciente = parseFloat(venta)


    const CashCheckpoint = {

        sale_shift_id: saleshift,
        previous_amount: venta_reciente,
        new_amount: 0

    }


    fetch('http://apitaquillassag.dyndns.org/Home/CerrarTurno', {

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(CashCheckpoint)

    })
        .then(response => response.text())
        .then(data => {

            if (data.length <= 6) {
                alert("ocurrio un error")
            } else {

                localStorage.setItem('cashcheckpoint', data);
                var cashcheckpoint = localStorage.getItem('cashcheckpoint');
                var salesnumberArray = JSON.parse(localStorage.getItem('array_ventas')) || [];

                let Saleshift = salesnumberArray.map(salesnumber => {
                    return {
                        salesnumber: salesnumber
                    };
                });

                fetch(`http://apitaquillassag.dyndns.org/Home/agregarCashCheckpoint?cashcheck=${cashcheckpoint}`, {

                    method: 'PATCH',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
                    },
                    body: JSON.stringify(Saleshift)

                })
                    .then(response => response.text())
                    .then(data => {



                        if (data == "Operación exitosa") {

                            Swal.fire({
                                title: "OK",
                                text: `Se ha cerrado la caja exitosamente`,
                                icon: "success"
                            });

                            location.href = "informeCierre.aspx"

                        } else {
                            Swal.fire({
                                title: "Error",
                                text: `Hubo un error al cerrar la caja`,
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        alert("ocurrio un error: " + error)
                    })


            }

        }).catch(error => {

            alert("Ocurrio un error: " + error)
        })



}



function CerrarCajavacia() {

    alert("caja en 0")
    var saleshift = localStorage.getItem('saleshift_id')
    var venta = localStorage.getItem('venta_reciente')
    var venta_reciente = parseFloat(venta)


    const CashCheckpoint = {

        sale_shift_id: saleshift,
        previous_amount: 0,
        new_amount: 0

    }



    fetch('http://apitaquillassag.dyndns.org/Home/CerrarTurno', {

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(CashCheckpoint)

    })
        .then(response => response.text())
        .then(data => {

            if (data.length <= 6) {
                alert("ocurrio un error")
            } else {

                localStorage.setItem('cashcheckpoint', data);
                var cashcheckpoint = localStorage.getItem('cashcheckpoint');

                location.href = "informeCierre.aspx"


            }


        }).catch(error => {

            alert("Ocurrio un error: " + error)
        })






}



