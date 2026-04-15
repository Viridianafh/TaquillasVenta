<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="informePrecorte.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
         <!--<script src="https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>-->
 <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/Informe.js"></script>
    </header>

    <style>        
        *{
    font-size: 13px;
}
         table.sin-bordes {
    border-collapse: collapse;   /* evita líneas dobles */
    border-spacing: 0;           /* elimina separación entre celdas */
    font-size: 8px;
  }
  table.sin-bordes, 
  table.sin-bordes th, 
  table.sin-bordes td {
    border: none;                /* sin bordes */
  }
  table.sin-bordes th, 
  table.sin-bordes td {
    padding: 6px;                /* opcional: espacio interno */
  }
  h5{
      margin-left:5px;
  }
  h6{
        margin-left:5px;
    }
  p{
    margin-left:5px;
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

        <!--<div id="informe">
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
        </div>-->
         <div id="informe">
     <h5>Resumen cierre</h5>
     <h6>Fecha: <span id="spanfecha"></span></h6>
     <br />
     <h6>Taquillero: <span id="taquillero"></span></h6>
     <h6>Turno: <span id="turno"></span></h6>
     <h6>Oficina: <span id="oficina"></span></h6>
     <h6>Terminal: <span id="terminal"></span></h6>
     <br />

     <table class="sin-bordes">
       <thead>
         <!--<tr><th></th><th></th></tr>-->
       </thead>
       <tbody>
         <tr>
             <td><strong>Boletos<br/>generales</strong></td>  <td>Cantidad</td> <td>Importe<br/>efectivo</td> <td>Importe<br/>tarjeta</td> <td>Importe<br/>total</td>
         </tr>
         <tr>
             <td><strong>Boletos<br/>vendidos</strong></td>  <td><strong><span id="cantidad_boletos_vendidos"></span></strong></td> <td><strong>$<span id ="total_venta_efectivo_boletos"></span></strong></td> <td><strong>$<span id="total_venta_tarjeta_boletos"></span></strong></td> <td><strong>$<span id="total_venta_boletos"></span></strong></td>
         </tr>
           <tr>
             <td>Efectivo</td> <td><span id="cantidad_boletos_vendidos_efectivo"></span></td> <td>$<span id="venta_efectivo_boletos"></span></td> <td>$<span>0</span></td> <td>$<span id ="venta_efectivo_boletos2"></span></td>
         </tr>
             <tr>
             <td>Tarjeta</td> <td><span id="cantidad_boletos_vendidos_tarjeta"></span></td> <td>$<span>0</span></td> <td>$<span id ="venta_tarjeta_boletos"></span></td> <td>$<span id ="venta_tarjeta_boletos2"></span></td>
         </tr>
             <tr>
             <td>Hibrido</td> <td><span id="cantidad_boletos_vendidos_hibrido"></span></td> <td>$<span id="venta_efectivo_hibrido_boletos"></span></td> <td>$<span id="venta_tarjeta_hibrido_boletos"></span></td> <td>$<span id="venta_hibrido_boletos"></span></td>
         </tr>

             <tr>
                 <td></td>
             </tr>

           <tr>
             <td><strong>Boletos<br/>cancelados</strong></td> <td><strong><span id="cantidad_boletos_cancelados"></span></strong></td> <td></td> <td></td> <td><strong>$<span id="total_boletos_cancelados"></span></strong></td>
         </tr>
         
            <tr>
                <td></td>
             </tr>

           <tr>
             <td><strong>Boletos<br/>paquetería</strong></td>  <td>Cantidad</td> <td></td> <td></td> <td>Importe</td>
         </tr>
         <tr>
             <td><strong>Boletos<br/>vendidos</strong></td>  <td><strong><span id="cantidad_boletos_vendidos_paq"></span></strong></td> <td></td> <td></td> <td><strong>$<span id="total_venta_paquetes"></span></strong></td>
         </tr>
           <tr>
             <td>Efectivo</td> <td><span id="cantidad_boletos_vendidos_efectivo_paq"></span></td> <td></td> <td></td> <td>$<span id="venta_efectivo_paquetes"></span></td>
         </tr>
             <tr>
             <td>Tarjeta</td> <td><span id="cantidad_boletos_vendidos_tarjeta_paq"></span></td> <td></td> <td></td> <td>$<span id="venta_tarjeta_paquetes"></span></td>
         </tr>
           
           <tr>
             <td></td>
          </tr>

           <tr>
             <td></td>
          </tr>

             <tr>
                 <td><strong>Total<br/>efectivo</strong></td> <td id=""><strong>$<span id="venta_total_boletos_paquetes_efectivo"></span></strong></td> 
             </tr>
             <tr>
                 <td><strong>Total<br/>tarjeta</strong></td> <td><strong>$<span id="venta_total_boletos_paquetes_tarjeta"></span></strong></td> 
             </tr>
             <tr>
                 <td><strong>Total venta<br/>sin<br/>cancelados</strong></td> <td><strong>$<span id ="total_ventas_sin_cancelados"></span></strong></td> 
             </tr>
       </tbody>
     </table>
     

     <br />
     <p>Entrega: <span id="reporte-taquillero"></span><hr /></p>
     <p><strong>Total cancelaciones: $<span id="reporte-cancelaciones"></span></strong><hr /></p>
     <p><strong>Efectivo entregado: $<span id="reporte-efectivo"></span></strong><hr /></p>
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
