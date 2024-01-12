

var cashcheckpoint = localStorage.getItem('cashcheckpoint')
var saleshift_id = localStorage.getItem('saleshift_id')


document.addEventListener('DOMContentLoaded', () => {


    const btn_end = document.getElementById('btn-end')
    btn_end.addEventListener('click', () => {


        const shiftId = localStorage.getItem('saleshift_id')
        const url = `https://localhost:5001/Home/TerminarTurnoCaja?shift=${shiftId}`;

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






        window.location.href= "dash.aspx"
    })

})




fetch(`https://localhost:5001/Home/verprecorte?cashcheckpoint=${cashcheckpoint}`)
    .then(response => response.json())
    .then(data => {

        console.log(data)

        var oficina = localStorage.getItem('office_name')
        var terminal = localStorage.getItem('terminal_name')
        var taquillero = localStorage.getItem('name')

        // Obtener la fecha actual
        var fechaActual = new Date();

        // Configurar las opciones para formatear la fecha y hora
        var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

        // Obtener la fecha y hora formateada en español
        var fechaYHoraEnEspanol = fechaActual.toLocaleDateString('es-ES', opciones);

        // Mostrar la fecha y hora en español
        console.log("Fecha y hora actual en español: " + fechaYHoraEnEspanol);





        document.getElementById('reporte-oficina').innerHTML = oficina
        document.getElementById('reporte-terminal').innerHTML = terminal
        document.getElementById('reporte-taquillero').innerHTML = taquillero
        document.getElementById('dates').innerHTML = fechaYHoraEnEspanol
        document.getElementById('shift_number').innerHTML = "MEXCsadj78"


        data.map(e => {

            document.getElementById('reporte-total-efectivo').innerHTML = e.CantidadEfectivo
            document.getElementById('reporte-total-tc').innerHTML = e.CantidadTarjeta
            document.getElementById('reporte-total-me').innerHTML = e.CantidadME
            document.getElementById('reporte-total-DEP').innerHTML = e.CantidadDP
            document.getElementById('reporte-cancelaciones').innerHTML = e.Cancelados
            document.getElementById('reporte-total-venta').innerHTML = e.Total
            document.getElementById('reporte-total-iniciocaja').innerHTML = 0
            document.getElementById('reporte-total-seretiro').innerHTML = e.SeRetiro
            document.getElementById('queda-encaja').innerHTML = e.QuedaEnCaja
            document.getElementById('reporte-total').innerHTML = e.SeRetiro




        })



    })


fetch(`https://localhost:5001/Home/vercashcheckpoint?saleshiftID=${saleshift_id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var table = document.getElementById('tbl-retiro').getElementsByTagName('tbody')[0];

        data.map(e => {
            var formattedDate = e.DateCreated.replace('T', ' ').split(' ')[0];
            var formattedTime = e.DateCreated.replace('T', ' ').split(' ')[1];

            var tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${e.PreviousAmount}</td>
            <td>${e.NewAmount}</td>
        `;
            table.appendChild(tr);
        });

        // Generar el PDF después de cargar todos los datos
        const opciones = {
            margin: 10,
            filename: `precortedecaja.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const contenidoDiv = document.getElementById('informe');
        html2pdf(contenidoDiv, opciones);
    });



