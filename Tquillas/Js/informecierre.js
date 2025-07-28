

var cashcheckpoint = localStorage.getItem('cashcheckpoint')
var saleshift_id = localStorage.getItem('saleshift_id')


document.addEventListener('DOMContentLoaded', () => {


    const btn_end = document.getElementById('btn-end')
    btn_end.addEventListener('click', () => {

        var cajaabierta = false
        localStorage.setItem("caja_abierta", cajaabierta)

        localStorage.setItem("Total_compra", 0)


        const shiftId = localStorage.getItem('saleshift_id')
        const url = `https://api-taquillas.sagautobuses.com/Home/TerminarTurnoCaja?shift=${shiftId}`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                // Puedes incluir otros encabezados si es necesario
            },
            // No es necesario incluir un cuerpo (body) si estás pasando los datos en la URL
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json();



                window.location.href = "dash.aspx"
            })
            .then(data => {
                // Manejar la respuesta exitosa
                console.log('Respuesta exitosa:', data);
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error('Error en la solicitud:', error);
            });


        localStorage.removeItem("num_ventas");
        //localStorage.removeItem("current_shift");
        localStorage.removeItem("shift_number");
        localStorage.removeItem("saleshift_id");
        localStorage.removeItem("venta_reciente");
        localStorage.removeItem("array_ventas")
        localStorage.removeItem("cashcheckpoint")


        window.location.href = "dash.aspx"
    })

})



let totaldetalle = 0; // Inicializa la variable para almacenar la suma
let lastCancelPrice = null;
let lastCancelVenta// Variable para almacenar el precio del último CANCEL


fetch(`https://api-taquillas.sagautobuses.com/Home/detalleventapentaho?saleshift=${saleshift_id}`)
    //fetch(`https://api-taquillas.sagautobuses.com/Home/detalleventapentaho?saleshift=${saleshift_id}`)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        var table = document.getElementById('datatable').getElementsByTagName('tbody')[0]

        var total = 0;

        // Primero, sumar todas las ventas
        let totalVentas = 0;
        let totalCancelaciones = 0;
        let totalPaquetes = 0;

        let countcancel = 0;
        let countventa = 0;
        let countpackage = 0;

        let totalcard = 0;
        let totalcash = 0;

        let paquetesCashMonto = 0;
        let paquetesCardMonto = 0;

        data.forEach(e => {
            let precio = Number(e.PrecioDeVenta) || 0;

            if (e.Tipo === "VENTA") {
                totalVentas += precio;
                countventa++;
                if (e.Tipo_pago === "cash") {
                    totalcash += precio;
                } else {
                    totalcard += precio;
                }
            } else if (e.Tipo === "CANCEL") {
                totalCancelaciones += precio;
                countcancel++;
            } else if (e.Tipo === "PAQUETE") {
                totalPaquetes += precio;
                countpackage++;
                if (e.Tipo_pago === "cash") {
                    totalcash += precio;
                    paquetesCashMonto += precio;
                } else {
                    totalcard += precio;
                    paquetesCardMonto += precio;
                }
            }
        });

        console.log(`Total Ventas: ${totalVentas}`);
        console.log(`Total Cancelaciones: ${totalCancelaciones}`);
        console.log(`Total Paquetes: ${totalPaquetes}`);

        let totalFinal = totalVentas + totalPaquetes + totalCancelaciones;
        console.log(`Total final: ${totalFinal}`);



        data.forEach(e => {
            const tr = document.createElement('tr'); // Crea una nueva fila
            tr.innerHTML = `
        <td>${e.Tipo}</td>
        <td>${new Date(e.FechaDeVenta).toLocaleString()}</td>
        <td>${e.NumDeVenta}</td>
        <td>${e.IdDelBoleto}</td>
        <td>${e.NombreDePasajero}</td>
        <td>${e.TipoDePasajero}</td>
        <td>${e.Origen}</td>
        <td>${e.Destino}</td>
        <td>${e.PrecioDeVenta}</td>
    `;
            table.appendChild(tr); // Agrega la fila a la tabla


        });
        document.getElementById('total-monto').textContent = totalFinal;
        document.getElementById('total-cash').textContent = totalcash;
        document.getElementById('total-card').textContent = totalcard;


        document.getElementById("taquillero").textContent = localStorage.getItem('name');
        document.getElementById("turno").textContent = localStorage.getItem('shift_number')
        document.getElementById("oficina").textContent = localStorage.getItem('office_name')
        document.getElementById("terminal").textContent = localStorage.getItem('terminal_name')
        document.getElementById("cant-cancel").textContent = countcancel
        document.getElementById("cant-package").textContent = countpackage
        document.getElementById("cant-sale").textContent = countventa
        document.getElementById("total-cancel").textContent = -1 * totalCancelaciones
        document.getElementById("total-venta").textContent = totalVentas

        document.getElementById("total-pack-cash").textContent = paquetesCashMonto;
        document.getElementById("total-pack-card").textContent = paquetesCardMonto;


        document.getElementById("reporte-taquillero").textContent = localStorage.getItem('name')

        // Crear un objeto Date con la fecha y hora actual
        const fechaHoraActual = new Date();

        // Obtener la fecha y hora en formato legible
        document.getElementById('spanfecha').textContent = fechaHoraActual.toLocaleString()

        // Generar el PDF después de cargar todos los datos
        const contenidoDiv = document.getElementById('informe');
        html2pdf(contenidoDiv, opciones);
        /*fetch(`https://api-taquillas.sagautobuses.com/Home/sumaventa?sale_id=${saleshift_id}`)
            .then(res => res.json())  // Esperar la respuesta en formato JSON
            .then(data => {
                // Procesar los datos obtenidos
                console.log(data);

                // Crear un objeto Date con la fecha y hora actual
                const fechaHoraActual = new Date();

                // Obtener la fecha y hora en formato legible
                document.getElementById('spanfecha').textContent = fechaHoraActual.toLocaleString()

                // Asignar los valores de las variables a partir de los datos obtenidos
                let totalcard = parseFloat(data.venta_tarjeta) || 0;  // Convertir a float, si no es un número, asignar 0
                let totalcash = parseFloat(data.venta_efectivo) || 0;  // Convertir a float, si no es un número, asignar 0

                // Calcular el total final
                let totalFinal = totalcash + totalcard;// Si es necesario, suma el total

                // Actualizar el DOM con los nuevos valores
                document.getElementById('total-monto').textContent = totalFinal;
                document.getElementById('total-cash').textContent = totalcash;
                document.getElementById('total-card').textContent = totalcard;
                document.getElementById('total-pack').textContent = totalPaquetes;


                document.getElementById("taquillero").textContent = localStorage.getItem('name');
                document.getElementById("turno").textContent = localStorage.getItem('shift_number')
                document.getElementById("oficina").textContent = localStorage.getItem('office_name')
                document.getElementById("terminal").textContent = localStorage.getItem('terminal_name')
                document.getElementById("cant-cancel").textContent = countcancel
                document.getElementById("cant-package").textContent = countpackage
                document.getElementById("cant-sale").textContent = countventa
                document.getElementById("total-cancel").textContent = totalCancelaciones
                document.getElementById("total-venta").textContent = totalVentas

                document.getElementById("reporte-taquillero").textContent = localStorage.getItem('name')

                // Configurar las opciones para generar el PDF

                setTimeout(() => {
                    const opciones = {
                        margin: [0, 0, 0, 0], // Márgenes en mm (top, right, bottom, left)
                        filename: 'detalle.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'mm', format: [100, 270], orientation: 'portrait' } // Dimensiones en mm
                    };

                    // Generar el PDF después de cargar todos los datos
                    const contenidoDiv = document.getElementById('informe');
                    html2pdf(contenidoDiv, opciones);


                }, 6000)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });*/

    })
    .catch(error => {
        alert("Hubo un error" + error);
        console.error(error)
    });
