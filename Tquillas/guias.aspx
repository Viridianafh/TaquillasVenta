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

    

    <section id="section-busqueda-guide" class="">

         <h5>Buscar Origen</h5>
        <div class="d-flex gap-2 flex-direction-column">

           
        <select class="form-select" style="width: 250px;" id="origen">
          
        </select>

        <button class="btn btn-dark">Buscar</button>

        </div>

        <div id="table-content">

            <table class="table table-hover" id="tabla-begins">
                
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



        





    <section id="section-guides-actions" style="display: none;">

    <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="paradas-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">paradas</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pasajeros-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">pasajeros</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="anticipos-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">anticipos</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="paradas-tab">


      <h1>Paradas</h1>

     
<table class="table table-striped" id="table-paradas">
          <thead>
              <tr>
                  <th>Parada</th>
                  <th>minutos de espera</th>
                  <th>minutos de viaje</th>
                  <th>orden</th>
              </tr>
          </thead>  
          <tbody>

          </tbody>
      </table>



  </div>


  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="pasajeros-tab">


      <h1>Pasajeros</h1>

       <table class="table table-striped" id="table-pasajeros">
          <thead>
              <tr>
                  <th>pasasjero</th>
                  <th>asiento</th>
                  <th>salida</th>
                  <th>llegada</th>
                  <th>boleto</th>
              </tr>
          </thead>
          <tbody>

          </tbody>
      </table>


  </div>

  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="anticipos-tab">


      <h1>Anticipos</h1>


      <table class="table table-striped" id="tabla-anticipo">
          <thead>
              <tr>
                  <th>Descripcion</th>
                  <th>Anticipo</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>anticipo</td>
                  <td id="contentanticipo"></td>
              </tr>
          </tbody>
          <tbody>


          </tbody>


      </table>

      <div id="nuevosanticipos">

      </div>
         <section class="container" id="sectioncontroles">

             <div class=" container gap-3 m-4" id="content-controls">
              
                 
                
 
             </div>

      </section>

      <button class="btn btn-primary" id="btn-add-advance">agregar anticipo</button>

      <div class="container d-flex justify-content-end" >

          <h5 class="mr-3">Total anticipo: <span id="totalanticipo"></span></h5>

      </div>
   
      <div class="container m-5 gap-3" >
          <button class="btn btn-primary" id="btn-print">imprimir</button>
          <button class="btn btn-success" id="btn-save">Guardar</button>

      </div>



  </div>
</div>

    </section>
       




</asp:Content>
