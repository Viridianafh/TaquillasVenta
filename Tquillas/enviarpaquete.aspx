<%@ Page Title="ventas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="enviarpaquete.aspx.cs" Inherits="About" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
  <header>
      <script src="Js/terminalcheck.js"></script>
      <script src="Js/enviarpaquete.js"></script>
      <script src="Js/islog.js"></script>
     
  </header>
     
    <style>
    .is-invalid {
    border-color: #dc3545;
}
        </style>
  
    <section id="section-precorte" style="display: none;">

         <a href="dash.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

        </a>

        <div class="container mt-5 mb-5 h-100 d-flex flex-column gap-2">

            <h3>Precorte</h3>
            <h4>Total en caja: $<span id="totalprecorte"></span></h4>
            <input placeholder="monto a retirar" type="text" oninput="validarNumero(this)" inputmode="numeric" id="monto-precorte" class="form-control"/>       
            <button class="btn btn-dark" id="btn-retirar-precorte">Retirar</button>

        </div>
       

    </section>


<section id="section-iniciar">
    <div class="container mt-5" id="content-button">
        <button class="btn btn-primary" id="button_iniciar">Iniciar Turno</button>
    </div>

    <div class="container" id="content-buscador" style="display: none;">
        <h1>Envio de paquetes</h1>

        <div class="container mt-5 mb-2 gap-2" id="content-buttons" style="display: none">
            <button class="btn btn-success d-none" id="button_precorte">Precorte de Caja</button>
            <button class="btn btn-danger" id="button_cerrar_caja">Cerrar Caja</button>
        </div>

        <hr />

       
            <div class="container p-5 ">
                <div class="container m-3">
                    <label for="origen">Origen: </label>
                    <select id="origen" class="form form-select" style="width: 320px;">
                        <option value="default">Seleccionar Opción</option>
                    </select>
                </div>
                <div class="container m-3">
                    <label for="destino">Destino: </label>
                    <select id="destino" class="form form-select" style="width: 320px;">
                        <option value="default">Seleccionar Opción</option>
                    </select>
                </div>
                <div class="container m-3">
                    <label for="fecha">Fecha de viaje: </label>
                    <input type="date" id="fecha" class="form form-control" style="width: 160px;">
                </div>
                <div class="container m-3">
                    <button class="btn btn-primary w-100" id="btn-trip">
                        Buscar viaje 
                    </button>
                </div>
            </div>
        </div>
        <br>

  
</section>

    



    <section class="section container" id="section-boletos" style="display: none;">


        <div class="container p-5">
            <h2>Nuestros viajes</h2>
            <hr />

                <table class="table table-hover" id="tabla-viajes">
                    <thead >
                        <tr>
                            <td><h4>Corrida</h4></td>
                            <td><h4>tipo</h4></td>
                            <td><h4>Origen</h4></td>
                            <td><h4>Destino</h4></td>
                            <td><h4>Bus</h4></td>
                            <td><h4>Salida</h4></td>
                            <td><h4>LLegada</h4></td>
                            <td><h4>Acciones</h4></td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
        </div>


    </section>


<section id="data-clients" class="container mt-5" style="display: none;">
    <h3 class="mb-4">Llena los campos del remitente y el destinatario</h3>
    <div class="row">
        <div class="col-md-6">
            <h4>Remitente</h4>
            <div class="form-group">
                <label for="nombre-remitente">Nombre completo del remitente:</label>
                <input type="text" id="nombre-remitente" class="form-control" />
            </div>
            <div class="form-group">
                <label for="direccion-remitente">Dirección del remitente:</label>
                <input type="text" id="direccion-remitente" class="form-control" />
            </div>
            <div class="form-group">
                <label for="phone-remitente">Teléfono del remitente:</label>
                <input type="text" id="phone-remitente" class="form-control" />
            </div>
            <div class="form-group">
                <label for="correo-remitente">Correo del remitente:</label>
                <input type="text" id="correo-remitente" class="form-control" />
            </div>
        </div>
        <div class="col-md-6">
            <h4>Destinatario</h4>
            <div class="form-group">
                <label for="nombre-destinatario">Nombre completo del destinatario:</label>
                <input type="text" id="nombre-destinatario" class="form-control" />
            </div>
            <div class="form-group">
                <label for="direccion-destinatario">Dirección del destinatario:</label>
                <input type="text" id="direccion-destinatario" class="form-control" />
            </div>
            <div class="form-group">
                <label for="phone-destinatario">Teléfono del destinatario:</label>
                <input type="text" id="phone-destinatario" class="form-control" />
            </div>
            <div class="form-group">
                <label for="correo-destinatario">Correo del destinatario:</label>
                <input type="text" id="correo-destinatario" class="form-control" />
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-md-6">
            <button id="back-button" class="btn btn-secondary btn-block">Retroceder</button>
        </div>
        <div class="col-md-6">
            <button id="next-button" class="btn btn-primary btn-block">Siguiente</button>
        </div>
    </div>
</section>


 <section id="sectionpackage-data" class="container mt-5" style="display:none;">
    <h3 class="mb-4">Datos del Paquete</h3>
    <table id="package-table" class="table table-bordered">
        <thead>
            <tr>
                <th>Descripcion del paquete</th>
                <th>Alto (cm)</th>
                <th>Ancho (cm)</th>
                <th>Largo (cm)</th>
                <th>Peso (kg)</th>
                <th>Embalaje</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <!-- Las filas se agregarán aquí -->
        </tbody>
    </table>

    <button id="add-row" class="btn btn-primary mb-3">Agregar Fila</button>
         <h4>Total: $<span id="total-price">0.00</span></h4>
    <pre id="json-output" class="bg-light p-3" style =" display:none"></pre>

     <label>Monto:</label>
   <input type="number" id="monto-paquete" class="form-control"  />
   
    <button id="show-json" class="btn btn-success mb-3">Procesar pago</button>
</section>




</asp:Content>
