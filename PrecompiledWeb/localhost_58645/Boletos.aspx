<%@ page title="index" language="C#" masterpagefile="~/Site.Master" autoeventwireup="true" inherits="About, App_Web_1oe1tyjz" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/boletos.js"></script>
        <script src="Js/islog.js"></script>
    </header>
  
 
      
      <h2>Descarga los boletos <span id="usuario"></span></h2><br>

    <section id="section-tabla-boletos">

        <a href="ventas.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

        </a>  
        <div class="container">

            <table class="table table-hover" id="table-descarga-boletos">
                <thead>
                    <tr>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Fecha de salida</th>
                        <th>Bus</th>
                        <th>Pasajero</th>
                        <th>Tipo</th>
                        <th>Cod.Compra</th>
                        <th>Asiento</th>
                        <th>Costo</th>
                        <th>Descargar</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>

            </table>

        </div>

    </section>


</asp:Content>
