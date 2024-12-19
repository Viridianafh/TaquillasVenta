<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="informeCierre.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/informecierre.js"></script>
        
      
    </header>

      <style>
            *{
                font-size: 13px;
            }
        </style>

    <div class="container m-3">

        <button class="btn btn-danger m-2" id="btn-end">Finalizar</button>
        <button class="btn btn-primary m-2" id="botonDescargar">Descargar</button>
    </div>

    <div class="container" >

        <h2>Informe cierre caja <span id="usuario"></span></h2>
        <p><strong> <span id="dates"></span></strong> </p>
        <p><span id="shift_number"></span></p>
        <br>

        <div class="container" id="content">
        <h2>Informe precorte de caja <span id="usuario"></span></h2>
        <p><strong> <span id="dates"></span></strong> </p>
        <br>

        <div class="container">
        

            <div class="container d-flex">
                <div class="table-responsive">
                    <table class="table table-hover" id="datatable">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Fecha de venta</th>
                                <th>Número de venta</th>
                                <th>Id del boleto</th>
                                <th>Nombre de pasajero</th>
                                <th>Tipo de pasajero</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Precio de venta</th>
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
            <h5>Resumen cierre</h5>
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
                filename: 'InformeCierre.pdf',
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




</asp:Content>
