<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="dash.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/configterminal.js"></script>
    </header>
  
    <style>
        a{
            text-decoration: none;
        }
    </style>
 
      
      <h2>Bienvenido <span id="usuario"></span></h2><br>

       <label >Terminal: <span id="Terminals"></span></label> 
      <br />
       <label >Oficina: <span id="Oficina"></span></label> 

      <hr />

      <div class="container d-flex gap-5" style="margin-top: 30px; " >

          <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            
                <div class="card-body">
                <h5 class="card-title">Venta de Boletos</h5>
                <p class="card-text">Realiza la venta de boletos de autobus aquí</p>
                </div>
              <div class="card-footer"><a href="ventas.aspx">Ver</a></div>
            </div>

           <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            
                <div class="card-body">
                <h5 class="card-title">Lista de Abordar</h5>
                       <p class="card-text">Consulta la lista de las persona que van a abordar</p>
                </div>
               <div class="card-footer"><a href="listadeabordar.aspx">Ver</a></div>
            </div>

          
           
    </div>



</asp:Content>
