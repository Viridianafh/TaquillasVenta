document.addEventListener('DOMContentLoaded', () => {
    var corrida = localStorage.getItem('corrida_guia');
    var origen = localStorage.getItem('origen_guia');
    var destino = localStorage.getItem('destino_guia');
    var salida = localStorage.getItem('salida_guia');
    var primeranticipo = localStorage.getItem('totalanticipo_guia');
    var operador1 = localStorage.getItem('operador1_guia');
    var operador2 = localStorage.getItem('operador2_guia');
    var bus = localStorage.getItem('bus_guia');
    var anticipototal = localStorage.getItem('anticipototal');
    var trip = localStorage.getItem('trip_id-guia');

    if (anticipototal !== null) {
        document.getElementById('textanticipo').textContent = anticipototal;
        document.getElementById("text-anticipo").textContent = anticipototal;
    } else {
        document.getElementById('textanticipo').textContent = primeranticipo;
        document.getElementById("text-anticipo").textContent = primeranticipo;
    }
    document.getElementById('textorigen').textContent = origen;
    document.getElementById('textdestino').textContent = destino;
    document.getElementById('textsalida').textContent = salida;
    document.getElementById('textoperador1').textContent = operador1;
    document.getElementById('textoperador2').textContent = operador2;
    document.getElementById('textbus').textContent = bus;
    document.getElementById('textcorrida').textContent = corrida;

    document.getElementById("hconductor1").textContent = operador1;
    document.getElementById("hconductor2").textContent = operador2;
    document.getElementById("hunidad").textContent = bus;
    document.getElementById("text-anticipo").textContent = primeranticipo;
    document.getElementById("text-corrida").textContent = corrida;

    // Función para generar una tarjeta
    function createCard(id, oficina) {
        const qrcodeId = `qrcode-${id}`;
        return `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <p class="card-title">Oficina: <span class="text-primary">${oficina}</span></p>
                                <div id="${qrcodeId}" class="qrcode"></div>
                            </div>
                        </div>
                    </div>
                `;
    }

    // Función para insertar las tarjetas en el contenedor y generar los QR codes
    function renderCards(data) {
        const container = document.getElementById('cards-container');
        container.innerHTML = data.map(item => createCard(item.oldid, item.namestop)).join('');
        data.forEach(item => {
            new QRCode(document.getElementById(`qrcode-${item.oldid}`), {
                text: item.oldid,
                width: 100,  // Ajusta el tamaño del código QR aquí
                height: 100  // Ajusta el tamaño del código QR aquí
            });
        });
    }

    fetch(`http://apitaquillassag.dyndns.org/Home/gettripstops?tripid=${trip}`)
        .then(response => response.json())
        .then(data => {
            renderCards(data);
        })
        .catch(error => console.error('Error:', error));

    document.getElementById('botonDescargar').addEventListener('click', () => {
        const opciones = {
            margin: [5, 5, 5, 5],
            filename: 'Guia.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true
            },
            jsPDF: {
                unit: 'mm',
                format: [420, 297],
                orientation: 'portrait'
            }
        };

        const contenidoDiv = document.getElementById('guia');
        html2pdf().from(contenidoDiv).set(opciones).save();
    });
});