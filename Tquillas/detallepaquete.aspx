<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="detallepaquete.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/detallepaquete.js"></script>
        <script src="Js/islog.js"></script>
    </header>
    <style>

.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
    </style>
  
 
      
      <h2>Descarga los boletos <span id="usuario"></span></h2><br>

    <section id="loaderboletos">

        <div class="container d-flex align-items-center" >


              <div class="loader" id="loader"> </div> 
              <p>Generando Boletos....</p>
    
        </div>
        

    </section>

    <section id="section-tabla-boletos" style="display: none;">

        <a href="ventas.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
                volver a vender

            </button>

        </a>  

      

        <div class="container">

            <table class="table table-hover" id="table-descarga-boletos">
               <thead class="thead-dark"> <!-- Añadido el estilo de encabezado oscuro para resaltar -->
                <tr>
                    <th scope="col"> Descripción </th>
                    <th scope="col"> Origen </th>
                    <th scope="col"> Destino </th>
                    <th scope="col"> Remitente </th>
                    <th scope="col"> Destinatario </th>
                    <th scope="col"> Numero de guia </th>
                    <th scope="col"> Descargar guia del paquete </th>
                    <th scope="col"> Descargar ticket de cliente </th>
                </tr>
           
                </thead>
                <tbody>

  

                </tbody>

            </table>

        </div>

    </section>


</asp:Content>
