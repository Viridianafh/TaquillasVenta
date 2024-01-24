<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="escaneo.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/Escaneo.js"></script>
        <script src="Js/islog.js"></script>
    </header>
  
   <a href="dash.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

        </a>
      
      <h2>Escaneo de Boletos <span id="usuario"></span></h2><br>

      

    <section>

       
        <div class="container">

            <h4>Ingresa el Ticket </h4>


            <input type="text" class="form-control" id="input-ticket" />

            <br />
            <button class="btn btn-dark" id="btn-buscar-ticket">Buscar</button>

        </div>

        <div class="container" id="nombre-pasajero-section" style="display: none;">

            <h3>Boleto a nombre de: <span id="nombre-pasajero"> </span> </h3>

        </div>



    </section>


        

                 



</asp:Content>
