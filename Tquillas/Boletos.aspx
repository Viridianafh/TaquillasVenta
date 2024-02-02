<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Boletos.aspx.cs" Inherits="About" %>


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
               <thead class="thead-dark"> <!-- Añadido el estilo de encabezado oscuro para resaltar -->
                <tr>
                    <th scope="col">Origen</th>
                    <th scope="col">Destino</th>
                    <th scope="col">Fecha de salida</th>
                    <th scope="col">Bus</th>
                    <th scope="col">Pasajero</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Cod.Compra</th>
                    <th scope="col">Asiento</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Descargar</th>
                </tr>
           
                </thead>
                <tbody>

                </tbody>

            </table>

        </div>

    </section>


</asp:Content>
