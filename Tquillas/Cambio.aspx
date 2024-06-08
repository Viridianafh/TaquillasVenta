<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Cambio.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <link href="css/cambio.css" rel="stylesheet" />
        <script src="Js/islog.js"></script>
        <script src="Js/cambio.js"></script>
    </header>
  
 
      
    <section id="section-busqueda" class="mb-4">
        <div class="container">

            
        <label> Ticket del boleto anterior </label>
        <input type="text" id="boletoanterior" class="form-control" />

      

        <button class="btn btn-dark m-2" id="btn-buscar">Buscar</button>

        </div>

       
    </section>
    <section>

        <div class="container">
  
    <div class="col">
       
     <h5 class="card-title m-2">datos del ticket</h5>

              <div class="card-body">

                <table class="table table-bordered" id="tableticket">
                   
                    <thead>
                        <tr>
                          <th>Nombre</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Asiento</th>
                            <th>Precio</th>
                            <th>Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                           
                           
                        </tr>
                    </tbody>
                </table>

            </div>
            

        </div>
 
  </div>


        <section id="section-viaje" class="container m-2 p-2 border-top" style="display:none;">

            

                 <h5>Paso 1. buscar viaje...</h5>
            <div>
                <label>Origen</label>
                <select class="form-control" id="origen" style="width: 220px;">
                   
                </select>
                <label>Destino</label>
                <select class="form-control" id="destino" style="width: 220px;">
                   
                </select>

                <label>Fecha: </label>
                <input type="date" class="form-control" id="fecha" style="width: 220px;" />

                <button class="btn btn-dark mt-2" id="btn-buscar-viaje">Buscar</button>
            </div>

          
           

            <div class="d-flex flex-wrap" id="content-cards" style="display:none;">

                <%--<div class="card m-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Cerro Azul - Naranjos</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Salida: 20:00 llegada: 21:00</h6>
                        <h6 class="card-subtitle mb-2 text-muted">precio: </h6>
                        <p class="card-text">corrida: 6050</p>
                        <p class="card-text">tipo: plus</p>
                        <button class="btn btn-primary">escoger</button>
                    </div>
                </div> --%>
             </div>



        </section>

        <section class="container p-2 border-top" id="section-pasajero" style="display:none;">

            <h2>Paso2.. Agregue los datos del pasajero</h2>

            <label>Escoge el pasajero y el tipo de boleto </label>

            <br />
            <input type="text" class="form-control" id="input-nombre-pasajero" oninput="Toupper()" style="width:220px;" />
            <br />
          
            Tipo de pasajero:
            <select class="form-control" style="width: 120px;" id="select-pasajero">
                <option id="option-adulto" value="ADULT">Adulto</option>
                <option id="option-niño" value="CHILD">Niño</option>
                <option id="option-estudiante" value="STUDENT">Estudiante</option>
                <option id="option-inapam" value="OLDER_ADULT">Inapam</option>
                
            </select>
            
            <button class="btn btn-primary mt-2" id="btn-siguiente1" >Siguiente</button>
      

        </section>




    </section>



    <section class="section-asientos" id ="bus-container" style=" display: none;" >

     
        <h2>Piso 1</h2>
        <div id="floor-1" class="floor"></div>
        <h2>Piso 2</h2>
        <div id="floor-2" class="floor"></div>
    

    </section>


            <button class="btn btn-danger mt-5" id="procederCambio" onclick="ProcederBoleto()" >Proceder Cambio</button>

    <h1 id="spanTexto2"></h1>
    <h1 id="spanTexto"></h1>
</asp:Content>
