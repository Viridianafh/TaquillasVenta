<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="guias.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/guias.js"></script>
        <script src="Js/islog.js"></script>
    </header>
  
  <a href="dash.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

    </a>
      
      <h2>Guias de viaje <span id="usuario"></span></h2><br>

    
  

    <section id="section-busqueda-guide" class="d-none">

         <h5>Buscar Origen</h5>
        <div class="d-flex gap-2 flex-direction-column">

           
        <select class="form-select" style="width: 250px;">
            <option value="-">Buscar</option>
        </select>

        <button class="btn btn-dark">Buscar</button>

        </div>

        <div id="table-content">

            <table class="table table-hover">
                
                <thead>
                    <tr>
                        <th>ruta</th>
                        <th>origen</th>
                        <th>destino</th>
                        <th>operadores</th>
                        <th>bus</th>
                        <th>salida</th>
                        <th>generar guia</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>

            </table>


        </div>
        
    </section>



        





    <section id="section-guides-actions" class="d-none">

        <div class="container" id="content-action1">

              <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link active " aria-current="page" href="">Paradas</a>boo
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Pasajeros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Anticipos</a>
              </li>
            </ul>

              <div class="container">

             </div>
        </div>
        




         <div class="container" id="content-action2" style="display:none;">

              <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link  " aria-current="page" href="">Paradas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Pasajeros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Anticipos</a>
              </li>
            </ul>

             <div class="container">

             </div>

        </div>

          <div class="container" id="content-action3"  style="display:none;">

              <ul class="nav nav-tabs">
              <li class="nav-item">
                <a class="nav-link  " aria-current="page" href="">Paradas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="">Pasajeros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Anticipos</a>
              </li>
            </ul>

                <div class="container">

             </div>
        </div>



    </section>
       




</asp:Content>
