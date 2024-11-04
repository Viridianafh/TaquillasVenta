var cashcheckpoint = localStorage.getItem('cashcheckpoint');
var saleshift = localStorage.getItem('saleshift_id');


let totaldetalle = 0; // Inicializa la variable para almacenar la suma
let lastCancelPrice = null;
let lastCancelVenta// Variable para almacenar el precio del último CANCEL


fetch(`https://localhost:5001/Home/detalleventapentaho?saleshift=${saleshift}`)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        var table = document.getElementById('datatable').getElementsByTagName('tbody')[0]

        var total = 0;

        // Primero, sumar todas las ventas
        let totalVentas = 0;
        let totalCancelaciones = 0;
        let totalPaquetes = 0;

        data.forEach(e => {
            if (e.Tipo === "VENTA") {
                totalVentas += e.PrecioDeVenta || 0;
            } else if (e.Tipo === "CANCEL") {
                totalCancelaciones += e.PrecioDeVenta || 0;
            } else if (e.Tipo === "PAQUETE") {
                totalPaquetes += e.PrecioDeVenta || 0;
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

        // Mostrar el total en el elemento con id 'reporte-total'
        document.getElementById('total-monto').textContent = totalFinal

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
            html2pdf(contenidoDiv, opcionesPDF);


        }, 3000)
   
    })
    .catch(error => {
        alert("Hubo un error" + error);
        console.error(error)
    });



    //todo lo que carga del DOM
document.addEventListener('DOMContentLoaded', () => {




    


    const btnregresar = document.getElementById('button-regresar')
        .addEventListener('click', () => {

            window.location.href = "dash.aspx"

        })

})