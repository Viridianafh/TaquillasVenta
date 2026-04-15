<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="informeCierre.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <!--<script src="https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/informecierre.js"></script>
        
      
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

              /* Fondo semitransparente */
  .modal {
    display: none; /* Oculto por defecto */
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
  }

  /* Contenido del modal */
  .modal-content {
    background: #fff;
    margin: 15% auto;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
  }
  .loader {
    border: 3px solid #f3f3f3; /* fondo del círculo */
    border-top: 3px solid #3498db; /* color de la animación */
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Opcional: centrarlo */
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
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

        <!--<div id="informe">
            <h5>Resumen cierre</h5>
            <h6>Fecha: <span id="spanfecha"></span></h6>
            <br />
            <h6>Taquillero: <span id="taquillero"></span></h6>
            <h6>Turno: <span id="turno"></span></h6>
            <h6>Oficina: <span id="oficina"></span></h6>
            <h6>Terminal: <span id="terminal"></span></h6>
            <br />

            <h6>Boletos vendidos: <span id="cant-sale"></span></h6>
            <h6>Paquetes vendidos: <span id="cant-package"></span></h6>
            <h6>Boletos cancelados: <span id="cant-cancel"></span></h6>
            <br />
           
            <br />
            <h6>Venta en efectivo: <span id="total-cash"></span></h6>
            <h6>Venta en tarjeta: <span id="total-card"></span></h6>
            <br />
            
            <h6>Paquetes en efectivo: <span id="total-pack-cash"></span></h6>
<h6>Paquetes con tarjeta: <span id="total-pack-card"></span></h6>
        

            <br />

            <h6>Total venta: <span id="total-venta"></span></h6>
            <h6>Total cancelación: <span id="total-cancel"></span></h6>
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
                            <td><strong>Total venta<br/>efectivo</strong></td> <td id=""><strong>$<span id="venta_total_boletos_paquetes_efectivo"></span></strong></td> 
                        </tr>
                        <tr>
                            <td><strong>Total venta<br/>tarjeta</strong></td> <td><strong>$<span id="venta_total_boletos_paquetes_tarjeta"></span></strong></td> 
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

        <div id="myModal" class="modal">
  <div class="modal-content">
    <h3>Cargando datos de cierre.</h3>
    <p>Espere mientras se obtiene la información necesaria.</p>
      <div class="center">
  <div class="loader"></div>
</div>
  </div>
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
