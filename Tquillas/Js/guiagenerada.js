


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

    // Función para generar los códigos QR
    function generateQRCode(elementId, data) {
        if (typeof QRCode === 'function') {
            try {
                new QRCode(document.getElementById(elementId), {
                    text: data,
                    width: 100,
                    height: 100
                });
            } catch (error) {
                console.error(`Error al generar QR para ${elementId}:`, error);
            }
        } else {
            console.error('La biblioteca QRCode no está cargada correctamente');
        }
    }

    // Función para insertar las tarjetas en el contenedor y generar los QR codes
    function renderCards(data) {
        const container = document.getElementById('cards-container');
        if (!container) {
            console.error('El contenedor de tarjetas no se encontró');
            return;
        }

        container.innerHTML = data.map(item => createCard(item.oldid, item.namestop)).join('');

        // Generar códigos QR después de un breve retraso para asegurar que los elementos DOM estén listos
        setTimeout(() => {
            data.forEach(item => {
                const qrcodeId = `qrcode-${item.oldid}`;
                generateQRCode(qrcodeId, item.oldid);
            });
        }, 100);
    }

    fetch(`http://apitaquillassag.dyndns.org/Home/gettripstops?tripid=${trip}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                renderCards(data);
            } else {
                console.error('Los datos recibidos no son un array o están vacíos:', data);
            }
        })
        .catch(error => console.error('Error al obtener o procesar los datos:', error));

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


})