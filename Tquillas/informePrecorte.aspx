<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="informePrecorte.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/Informe.js"></script>
    </header>

    <style>
        .pdf-download {
            font-family: Arial, sans-serif; /* Fuente legible */
            font-size: 11px; /* Tamaño de fuente deseado */
        }

        .pdf-download .table th,
        .pdf-download .table td {
            font-size: 11px; /* Tamaño de fuente para celdas */
            font-weight: 600; /* Peso de fuente */
        }

        .table-responsive {
            overflow-x: auto;
        }

        @media (max-width: 768px) {
            .table thead {
                display: none; /* Ocultar el encabezado en pantallas pequeñas */
            }

            .table tr {
                display: block; /* Hacer que cada fila sea un bloque */
                margin-bottom: 1rem; /* Espacio entre las filas */
            }

            .table td {
                display: flex; /* Usar flexbox para disposición de datos */
                justify-content: space-between; /* Separar etiqueta y valor */
                padding: 0.5rem; /* Añadir algo de espacio interno */
                border: 1px solid #ddd; /* Añadir borde */
                position: relative; /* Para usar pseudo-elementos */
            }

            .table td::before {
                content: attr(data-label); /* Mostrar etiqueta antes del valor */
                position: absolute; /* Posicionar absolutamente */
                left: 0; /* Alinear a la izquierda */
                font-weight: bold; /* Resaltar la etiqueta */
            }
        }

        @media print {
            body {
                font-family: Arial, sans-serif; /* Fuente legible */
                font-size: 11px; /* Tamaño de fuente deseado */
                margin: 0; /* Sin márgenes en el documento impreso */
            }

            .table-responsive {
                width: 83mm; /* Ancho fijo para la tabla */
                overflow: visible; /* Asegura que no haya desbordamiento */
            }

            .table {
                width: 100%; /* Ocupa todo el ancho disponible */
                border-collapse: collapse; /* Colapsar bordes para una mejor apariencia */
            }

            .table thead {
                display: table-header-group; /* Mantiene el encabezado visible en las páginas */
            }

            .table th,
            .table td {
                border: 1px solid #ddd; /* Bordes en celdas */
                padding: 4px; /* Espacio interno */
                text-align: left; /* Alineación de texto */
                font-size: 11px; /* Tamaño de fuente para celdas */
                font-weight: 600; /* Peso de fuente */
                max-width: 8mm; /* Ancho máximo de las celdas */
                overflow: hidden; /* Ocultar desbordamiento */
                text-overflow: ellipsis; /* Añadir puntos suspensivos si hay desbordamiento */
                white-space: nowrap; /* Evitar saltos de línea */
            }

            .table th {
                background-color: #f2f2f2; /* Color de fondo para el encabezado */
                font-weight: 600; /* Peso de fuente para encabezados */
            }
        }
    </style>

    <div class="container m-3">
        <button class="btn btn-danger m-2" id="button-regresar">Regresar</button>
        <button class="btn btn-primary m-2" id="botonDescargar">Descargar resumen</button>
    </div>

    <div class="container" id="content">
        <h2>Informe Precorte de Caja <span id="usuario"></span></h2>
        <p><strong> <span id="dates"></span></strong> </p>
        <br>

        <div class="container">
          
            <br />

            <div class="container d-flex">
                <div class="table-responsive">
                    <table class="table table-hover" id="datatable">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Fecha De Venta</th>
                                <th>Número De Venta</th>
                                <th>Id Del Boleto</th>
                                <th>Nombre De Pasajero</th>
                                <th>Tipo De Pasajero</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Precio De Venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Tu contenido aquí -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="informe">
            <h5>Resumen Precorte</h5>
            <h6>Fecha: <span id="spanfecha"></span></h6>
            <br />
            <h6>Taquillero: <span id="taquillero"></span></h6>
            <h6>Turno: <span id="turno"></span></h6>
            <h6>Oficina: <span id="oficina"></span></h6>
            <h6>Terminal: <span id="terminal"></span></h6>
            <br />
            
            <h6>Cantidad cancelación: <span id="cant-cancel"></span></h6>
            <h6>Cantidad paquetes: <span id="cant-package"></span></h6>
            <h6>Cantidad venta: <span id="cant-sale"></span></h6>
            <br />
            
            <h6>Total efectivo: <span id="total-cash"></span></h6>
            <h6>Total tarjeta: <span id="total-card"></span></h6>
            <h6>Total cancelación: <span id="total-cancel"></span></h6>
            <h6>Total venta: <span id="total-venta"></span></h6>
            <h6>Total paquetes: <span id="total-pack"></span></h6>
            <h6>El total es de: <span id="total-monto"></span></h6>
        
            <br />
            <p>Entrega: <span id="reporte-taquillero"></span><hr /></p>
            <p>Recibe: <hr /></p>
        </div>

        <script>
            const opciones = {
                margin: [0, 0, 0, 0], // Márgenes en mm (top, right, bottom, left)
                filename: 'InformePrecorte.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: [83, 297], orientation: 'portrait' } // 83 mm de ancho y altura indefinida
            };

            document.getElementById('botonDescargar').addEventListener('click', () => {
                const contenidoDiv = document.getElementById('informe');

                // Agregar clase temporal para forzar estilos
                contenidoDiv.classList.add('pdf-download');

                html2pdf().from(contenidoDiv).set(opciones).save().then(() => {
                    // Eliminar la clase temporal después de descargar
                    contenidoDiv.classList.remove('pdf-download');
                });
            });
        </script>
    </div>
</asp:Content>
