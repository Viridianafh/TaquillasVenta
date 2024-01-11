var cashcheckpoint = localStorage.getItem('cashcheckpoint');

fetch(`https://localhost:5001/Home/verprecorte?cashcheckpoint=${cashcheckpoint}`)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        var oficina = localStorage.getItem('office_name');
        var terminal = localStorage.getItem('terminal_name');
        var taquillero = localStorage.getItem('name');

        // Obtener la fecha actual
        var fechaActual = new Date();

        // Configurar las opciones para formatear la fecha y hora
        var opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

        // Obtener la fecha y hora formateada en español
        var fechaYHoraEnEspanol = fechaActual.toLocaleDateString('es-ES', opcionesFecha);

        // Mostrar la fecha y hora en español
        console.log("Fecha y hora actual en español: " + fechaYHoraEnEspanol);

        document.getElementById('reporte-oficina').innerHTML = oficina;
        document.getElementById('reporte-terminal').innerHTML = terminal;
        document.getElementById('reporte-taquillero').innerHTML = taquillero;
        document.getElementById('dates').innerHTML = fechaYHoraEnEspanol;

        data.map(e => {
            document.getElementById('reporte-total-efectivo').innerHTML = e.CantidadEfectivo;
            document.getElementById('reporte-total-tc').innerHTML = e.CantidadTarjeta;
            document.getElementById('reporte-total-me').innerHTML = e.CantidadME;
            document.getElementById('reporte-total-DEP').innerHTML = e.CantidadDP;
            document.getElementById('reporte-cancelaciones').innerHTML = e.Cancelados;
            document.getElementById('reporte-total-venta').innerHTML = e.Total;
            document.getElementById('reporte-total-iniciocaja').innerHTML = 0;
            document.getElementById('reporte-total-seretiro').innerHTML = e.SeRetiro;
            document.getElementById('queda-encaja').innerHTML = e.QuedaEnCaja;
            document.getElementById('reporte-total').innerHTML = e.SeRetiro;
        });

        // Configurar las opciones para generar el PDF
        const opcionesPDF = {
            margin: 10,
            filename: `precortedecaja.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generar el PDF después de cargar todos los datos
        const contenidoDiv = document.getElementById('informe');
        html2pdf(contenidoDiv, opcionesPDF);
    })
    .catch(error => {
        alert("Hubo un error");
    });
