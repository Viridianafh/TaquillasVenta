document.addEventListener('DOMContentLoaded', (event) => {
    
    const button_Buscar = document.getElementById('button_Buscar')
    
    button_Buscar.addEventListener('click', () => {


        document.getElementById('button_Buscar').disabled = true;


        button_Buscar.textContent = ""
        button_Buscar.textContent = "Buscando..."
        button_Buscar.classList.remove('btn-primary')
        button_Buscar.classList.add('btn-success')

        limpiarTabla()

        const row = document.getElementsByTagName('tbody')


        var Fecha_entrada= document.getElementById('fecha').value
        var Fecha_salida = document.getElementById('fecha2').value

       
        let currentPage = 1; // Página inicial
        const rowsPerPage = 10; // Número de filas por página

        // Función para renderizar la tabla con paginación
        
        let filteredData = []; // Datos filtrados

        // Función para renderizar la tabla con paginación y búsqueda
        function renderTable(data, page) {
            const tbody = document.getElementsByTagName('tbody')[0];
            tbody.innerHTML = ''; // Limpiar tabla

            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const pageData = data.slice(start, end);

            for (let i = 0; i < pageData.length; i++) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
            <td>${pageData[i].Corrida}</td>
            <td>${pageData[i].Bus}</td>
            <td>${pageData[i].origen_viaje}</td>
            <td>${pageData[i].Destino}</td>
            <td>${pageData[i].Departure}</td>
            <td>
                <button class="btn btn-dark" id="btn-showlist${i}"
                    onclick="verlista('${pageData[i].Id}', '${pageData[i].Bus}', '${pageData[i].Corrida}', '${pageData[i].Departure}','btn-showlist${i}' )">Ver Lista
                </button>
            </td>
        `;
                tbody.appendChild(tr);
            }
        }

        // Función para filtrar los datos según el valor de búsqueda
        function filterData(searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            filteredData = alldata.filter(item =>
                item.Corrida.toLowerCase().includes(searchTerm) ||
                item.Bus.toLowerCase().includes(searchTerm) ||
                item.origen_viaje.toLowerCase().includes(searchTerm) ||
                item.Destino.toLowerCase().includes(searchTerm) ||
                item.Departure.toLowerCase().includes(searchTerm)
            );

            // Resetear la paginación después de filtrar
            currentPage = 1;
            renderTable(filteredData, currentPage);
            renderPagination(filteredData.length);
        }

        // Función para crear botones de paginación

        function renderPagination(totalRows) {
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = ''; // Limpiar la paginación previa

            const totalPages = Math.ceil(totalRows / rowsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.classList.add('btn', 'btn-primary', 'mx-1');

                // Si es la página actual, agregar la clase 'active'
                if (i === currentPage) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('btn-primary');
                    button.classList.add('btn-outline-primary'); // Solo outline para los demás botones
                }

                button.addEventListener('click', () => {
                    currentPage = i;
                    renderTable(filteredData, currentPage); // Re-renderizar tabla con datos filtrados
                    renderPagination(filteredData.length); // Actualizar paginación
                });

                paginationContainer.appendChild(button);
            }
        }

        fetch(`https://api-taquillas.sagautobuses.com/Home/ListaDeViajes?fechainicio=${Fecha_entrada}&fechafinal=${Fecha_salida}`, {})
            .then(response => response.json())
            .then(data => {
                console.log(data);

                alldata = data;
                filteredData = alldata; // Inicialmente, los datos filtrados son los mismos

                renderTable(filteredData, currentPage);
                renderPagination(filteredData.length);

                button_Buscar.textContent = "Buscar";
                button_Buscar.classList.remove('btn-success');
                button_Buscar.classList.add('btn-primary');
                document.getElementById('button_Buscar').disabled = false;
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error al traer los datos!',
                    text: `mensaje de error:(${error})`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });

                button_Buscar.textContent = "Buscar";
                button_Buscar.classList.remove('btn-success');
                button_Buscar.classList.add('btn-primary');
                document.getElementById('button_Buscar').disabled = false;
            });

        // Añadir evento al campo de búsqueda
        document.getElementById('searchInput').addEventListener('input', function () {
            filterData(this.value);
        });



    })





    const btn_atras_lista = document.getElementById("btn-atras-lista")
    btn_atras_lista.addEventListener('click', () => {


        document.getElementById('section-buscarlista').style.display = "block";
        document.getElementById('section-lista').style.display = "none"
        
    })




    const btn_descargar_lista = document.getElementById('btn-guardar-lista')
    btn_descargar_lista.addEventListener('click', () => {


        document.getElementById('table-lista').style.display = 'none'
        document.getElementById('table-lista2').style.display = 'block'
        document.getElementById('table-lista2').style.width = '100mm';
        document.getElementById('allcontent').style.width = 200;

        document.getElementById('spantaquillas').style.fontSize= '12px'
        document.getElementById('rutabname').style.fontSize = '12px'
        document.getElementById('buss').style.fontSize = '12px'
        document.getElementById('countotal').style.fontSize = '12px'

        document.getElementById("main-taquilla").style.fontSize = "11px"; // Tamaño en píxeles
        document.getElementById("main-taquilla").style.fontWeight = "600"; // Peso de fuente

        document.getElementById("main-ruta").style.fontSize = "11px";    // Tamaño en píxeles
        document.getElementById("main-ruta").style.fontWeight = "600";

        document.getElementById("main-fecha").style.fontSize = "11px";    // Tamaño en píxeles
        document.getElementById("main-fecha").style.fontWeight = "600";   // Peso de fuente

        document.getElementById("main-bus").style.fontSize = "11px";     // Tamaño en píxeles
        document.getElementById("main-bus").style.fontWeight = "600";    // Peso de fuente

        document.getElementById("main-abordan").style.fontSize = "11px";     // Tamaño en píxeles
        document.getElementById("main-abordan").style.fontWeight = "600";    // Peso de fuente

   
        document.getElementById("main-total").style.fontSize = "11px";   // Tamaño en píxeles
        document.getElementById("main-total").style.fontWeight = "600";  
        const tabla = document.getElementById('allcontent');
        

       

        // Configura las opciones para html2pdf
        const opciones = {
            margin: [0, -5, 0, 0], // Márgenes en mm (top, right, bottom, left)
            filename: 'listadeabordar.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: [100, 270], orientation: 'portrait' } // Dimensiones en mm
        };
        // Utiliza html2pdf para generar el PDF y descargarlo
        html2pdf(tabla, opciones).from(tabla).save();


        Swal.fire({
            title: 'Descargando!',
            text: 'se esta descargando la lista',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {

                document.getElementById('table-lista').style.display = 'block'
                document.getElementById('table-lista2').style.display = 'none'
            } else if (result.isDismissed) {

                document.getElementById('table-lista').style.display = 'block'
                document.getElementById('table-lista2').style.display = 'none'
                // Aquí puedes ejecutar el código que desees cuando se descarta la alerta
                if (result.dismiss === Swal.DismissReason.backdrop) {

                    document.getElementById('table-lista').style.display = 'block'
                    document.getElementById('table-lista').style.display = 'block'
                    document.getElementById('table-lista2').style.display = 'none'
                } else if (result.dismiss === Swal.DismissReason.esc) {

                    document.getElementById('table-lista').style.display = 'block'
                document.getElementById('table-lista2').style.display = 'none'
                }
            }

            document.getElementById("main-taquilla").style.fontSize = ""; // Resetear tamaño de fuente
            document.getElementById("main-taquilla").style.fontWeight = ""; // Resetear peso de fuente

            document.getElementById("main-ruta").style.fontSize = "";    // Resetear tamaño de fuente
            document.getElementById("main-ruta").style.fontWeight = "";   // Resetear peso de fuente

            document.getElementById("main-bus").style.fontSize = "";     // Resetear tamaño de fuente
            document.getElementById("main-bus").style.fontWeight = "";    // Resetear peso de fuente

            document.getElementById("main-abordan").style.fontSize = ""; // Resetear tamaño de fuente
            document.getElementById("main-abordan").style.fontWeight = ""; // Resetear peso de fuente

            document.getElementById("main-total").style.fontSize = "";   // Resetear tamaño de fuente
            document.getElementById("main-total").style.fontWeight = ""; 
        });


    })

   

})


function ocultarColumna6() {
    // Selecciona la tabla
    var tabla = document.getElementById('table-lista');

    // Recorre todas las filas de la tabla
    for (var i = 0, fila; fila = tabla.rows[i]; i++) {
        // Oculta la celda en la columna 6 (índice 5 porque es 0-based)
        if (fila.cells[6]) {
            fila.cells[6].style.display='none';
        }
    }
}


                
function verlista(tripid, bus, corrida, departure, button_id) {
    document.getElementById(button_id).disabled = true;
        var countabordan = 0;

        limpiarTabla()
        limpiarTabla2()


        let fecha = new Date(departure);

        // Extraemos el día, mes, año, horas, minutos y segundos
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1; // Los meses en JavaScript empiezan en 0 (enero = 0)
        let anio = fecha.getFullYear();
        let horas = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        // Formateamos los valores a dos dígitos (añadiendo ceros si es necesario)
        dia = dia < 10 ? '0' + dia : dia;
        mes = mes < 10 ? '0' + mes : mes;
        horas = horas < 10 ? '0' + horas : horas;
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;

        // Creamos la fecha en el nuevo formato dd/mm/yyyy h:mm:ss
        let fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

        fetch(`https://api-taquillas.sagautobuses.com/Home/ListarPaquetes?trip_id=${tripid}`)
            .then(response => response.json())
            .then(data => {

                document.getElementById("spanfecha").textContent = fechaFormateada;
                document.getElementById("spantaquillas").textContent = localStorage.getItem('office_name').toString();
                document.getElementById("rutabname").textContent = corrida
                document.getElementById("buss").textContent = bus

                var tbody = document.getElementById('table-lista').getElementsByTagName('tbody')[0];
                var tbody2 = document.getElementById('table-lista2').getElementsByTagName('tbody')[0];

                document.getElementById('countotal').textContent = data.length;

                // Iterar sobre los elementos en el array 'data'
                data.forEach(e => {
                    var tr = document.createElement('tr');
                    var tr2 = document.createElement('tr');



                    var officename = localStorage.getItem('office_name')
                    const normalizeText = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

                    // Compara los textos normalizados
                    if (normalizeText(officename).localeCompare(normalizeText(e.StartingStopId), 'es', { sensitivity: 'base' }) === 0) {
                        // Si son iguales, incrementa el contador
                        countabordan++;
                        document.getElementById('countabordan').textContent = countabordan


                    } else {
                        console.log('Textos diferentes. Contador no cambiado.');
                    }



                    tr.innerHTML = `
                <td>${e.Concept}</td>
                
                <td>${e.StartingStopId}</td>
                <td>${e.EndingStopId}</td>
                <td>${e.SenderName}</td>
                <td>${e.ReceiverName}</td>
                <td>${e.TicketId}</td>
            `;

                    tr2.innerHTML = `
                <td>${e.Concept}</td>
              
                <td>${e.StartingStopId}</td>
                <td>${e.EndingStopId}</td>
                <td>${e.SenderName}</td>
                <td>${e.ReceiverName}</td>
                <td>${e.TicketId}</td>
            `;

                    tbody.appendChild(tr);
                    tbody2.appendChild(tr2);

                    console.log(e); // Ver los datos del elemento actual
                });

                document.getElementById('section-buscarlista').style.display = "none";
                document.getElementById('section-lista').style.display = "block";
                document.getElementById(button_id).disabled = false;
            })

            .catch(error => {


                Swal.fire({
                    title: 'Error al traer los datos!',
                    text: `mensaje de error:(${error})`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                document.getElementById(button_id).disabled = false;
            })
    
    }





function limpiarTabla2() {
    var tabla = document.getElementById('table-lista2');

    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

function limpiarTabla() {
    var tabla = document.getElementById('table-lista');

    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}



