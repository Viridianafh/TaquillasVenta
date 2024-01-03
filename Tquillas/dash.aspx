<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="dash.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
     <script src="Js/dash.js"></script>
    </header>
  
    <style>
        a{
            text-decoration: none;
            color: aquamarine;
        }

        

    </style>
 
      
      <h2>Bienvenido <span id="usuario"></span></h2><br>

       <label >Terminal: <span id="Terminals"></span></label> 
      <br />
       <label >Oficina: <span id="Oficina"></span></label> 

      <hr />

      <div class="container d-flex flex-wrap gap-5" id="contentcards"  style="margin-top: 30px; ">

          <div class="card text-light bg-dark mb-3"  style="max-width: 18rem;">
            
                <div class="card-body">
                <h5 class="card-title">Venta de Boletos</h5>
                <p class="card-text">Realiza la venta de boletos de autobus aquí</p>
                </div>
              <div class="card-footer"><a href="ventas.aspx">Ver</a></div>
            </div>

           <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
            
                <div class="card-body">
                <h5 class="card-title">Lista de Abordar</h5>
                       <p class="card-text">Consulta la lista de las persona que van a abordar</p>
                </div>
               <div class="card-footer"><a href="listadeabordar.aspx">Ver</a></div>
            </div>

           <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
            
                <div class="card-body">
                <h5 class="card-title">Escaneo de Boletos</h5>
                       <p class="card-text">Escanea el Boleto ingresando el código del Ticket </p>
                </div>
               <div class="card-footer"><a href="escaneo.aspx">Ver</a></div>
            </div>

          
           
    </div>



  

</asp:Content>
