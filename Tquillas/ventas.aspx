<%@ Page Title="ventas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="ventas.aspx.cs" Inherits="About" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
  <header>
          <script src="Js/ventas.js"></script>
      <link  rel="stylesheet" href="css/ventas.css"/>
      <script src="Js/islog.js"></script>
     
  </header>
     

  
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
        <h1>Venta de Boletos</h1>

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
                            <td><h4>Precio $ </h4></td>
                            <td><h4>Acciones</h4></td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
        </div>


    </section>






    <section class="section-pasajeros container" id ="section-pasajeros" style = "display: none;">


        <div class="container mt-5">
            

            <div class="container d-flex justify-content-between mb-5">
                
                <button class="btn btn-danger" id="btn-atras1"><ion-icon name="arrow-back-outline"></ion-icon>atras</button>
                 <button class="btn btn-success" id="btn-siguiente1">siguiente<ion-icon name="arrow-forward-outline"></ion-icon></button>
                  

            </div>



            <h3>Escoge los pasajeros</h3>

         
<%--            <h4>Boletos de estudiante vendidos: <span id="BoletosE"></span>|  Max Estudiante: <span>8</span>|  Boletos Inapam Vendidos: <span id="total_inapam"></span>|  Max Inapam: <span id="total_inapam">4</span></h4>--%>

              <div class="container m-2">

                  <table class="table">
                      <thead class="thead-dark">

                          <tr>
                              <th>Total Boletos de Estudiante Vendidos</th>
                              <th>Maximo de Boletos de estudiantes</th>
                              <th>Total Boletos de Inapam Vendidos</th>
                              <th>Maximo de Boletos de Inapam</th>

                          </tr>
                      </thead>
                      <tbody>
                           <tr>
                          <td><span id="BoletosE"></span></td>
                          <td><span>8</span></td>
                          <td><span id="total_inapam"></span></td>
                          <td><span>4</span></td>

                      </tr>

                      </tbody>
                     
                  </table>
                </div>


            <div class="card gap-2 m-2 p-3" id="content-count-adulto">
                
              

                <div class="d-flex">
                         <p>Adulto</p>
                      
                </div>

           
                  <div class="d-flex gap-2">
                        <button id="btn_sumar_adulto" class="btn btn-primary"style="width: 50px;"> <ion-icon name="add-outline"></ion-icon> </button>
                        <button id="btn_restar_adulto" class="btn btn-danger" style="width: 50px;"> <ion-icon name="remove-outline"></ion-icon></button>
                  </div>

                <div class="" id="contentinputs">

                </div>

             </div>
                <div class="card m-2 p-3" id="content-count-nino">

                <p>Niño</p>
                  <div class="d-flex gap-2 ">
                        <button id="btn_sumar_niño" class="btn btn-primary"style="width: 50px;"> <ion-icon name="add-outline"></ion-icon> </button>
                        <button id="btn_restar_niño" class="btn btn-danger" style="width: 50px;"> <ion-icon name="remove-outline"></ion-icon></button>
                  </div>

                        <div class="" id="contentinputsnino">

                </div>

             </div>
                <div class="card m-2 p-3" id="content-count-inapam">

                <p>Inapam</p>
                  <div class="d-flex gap-2 ">
                        <button id="btn_sumar_inapam" class="btn btn-primary"style="width: 50px;"> <ion-icon name="add-outline"></ion-icon> </button>
                        <button id="btn_restar_inapam" class="btn btn-danger" style="width: 50px;"> <ion-icon name="remove-outline"></ion-icon></button>
                  </div>

                        <div class="" id="contentinputsinapam">

                </div>

             </div>


                <div class="card m-2 p-3" id="content-count-estudiantes">

                <p>Estudiante</p>
                  <div class="d-flex gap-2 ">
                        <button id="btn_sumar_estudiante" class="btn btn-primary"style="width: 50px;"> <ion-icon name="add-outline"></ion-icon> </button>
                        <button id="btn_restar_estudiante" class="btn btn-danger" style="width: 50px;"> <ion-icon name="remove-outline"></ion-icon></button>

                  </div>

                        <div class="" id="contentinputsstudent">

                </div>

             </div>
         


        </div>

    </section>


   



    <section class="section-asientos" id ="section-asientos" style=" display: none;" >

        <h2>Selecciona tus asientos</h2>

            <div class="container d-flex justify-content-between">
                
                <button class="btn btn-danger" id="btn-atras2"><ion-icon name="arrow-back-outline"></ion-icon>atras</button>
                 <button class="btn btn-success" id="btn-siguiente2">siguiente<ion-icon name="arrow-forward-outline"></ion-icon></button>
                  

            </div>



        <div class="container m-5">

            <h3>Pasajeros</h3>
            <table class="table table-responsive" id="tabla-pasajeros">
                <thead>
                    <tr>
                        <td>Pasajero</td>
                        <td>Tipo</td>
                        <td>Asiento</td>
                         <td>Precio</td>
                    </tr>
                </thead>
               <tbody>
                   
               </tbody>
            </table>

                        <h2>TOTAL: $  <span id="span_total_orasi"></span></h2>

        </div>

        <div class="container d-flex gap-2 m-5">
           
            <ion-icon name="square-outline" style="color: #28a745; background-color: #28a745;"></ion-icon>
            Seleccion
            <ion-icon name="square-outline" style="color: #0d6efd; background-color: #0d6efd;"></ion-icon>
            Disponible
            <ion-icon name="square-outline" style="color: #dc3545; background-color: #dc3545;"></ion-icon>
            Ocupado
        </div>


      
        <div class="container  align-items-center justify-content-between" style="width: 80%; display: none;" id="content-floor-indicator">

    <div class="d-flex" >
        <h4>Piso1</h4>
    </div>
    
    <div class="d-flex" style="margin-right: 520px">
        <h4>Piso2</h4>
    </div>
    
</div>


        <div id="contentseatfloor2" style="display: none;">

        </div>


        <div class="parent" id="content_seat" >

          

 
        </div>

</section>




    <section id="section-tipo-pago" style="display: none;">

      <button class="btn btn-danger" id="btn-atras3"><ion-icon name="arrow-back-outline"></ion-icon>atras</button>



         <h1>Medio de pago</h1>
        <h5>(selecciona tu tipo de pago)</h5>

        <div class="container d-flex align-items-center justify-content-center gap-5">
            
                         
                
                <button id="btn-efectivo" class="btn btn-success" style="width: 200px; height:200px;">
                     <ion-icon name="cash-outline" style ="width: 120px; height: 120px;"></ion-icon>
                      <p><strong>efectivo</strong></p>
                </button>
              
       
               <button id="btn-tarjeta" class="btn btn-primary" style="width: 200px; height:200px;">
                     
                     <ion-icon name="card-outline" style ="width: 120px; height: 120px;"></ion-icon>
                      <p><strong>tarjeta</strong></p>
                </button>
             
              
            </div>

    </section>






    <section id="pago-efectivo" style="display:none; ">



              <button class="btn btn-danger" id="btn-atras4"><ion-icon name="arrow-back-outline"></ion-icon>atras</button>

        <h1>Resumen:</h1>
        <h5>(resumen de la compra)</h5>

        <div class="container">

            <table class="table table-hover" id="tablaefectivoresume" >
                <thead>
                    <tr>
                        <td>Origen</td>
                        <td>Destino</td>
                        <td>Fecha de salida</td>
                        <td>Bus</td>
                        <td>Pasajero</td>
                        <td>Tipo</td>
                        <td>Asiento</td>
                        <td>costo</td>

                    </tr>
                </thead>
               <tbody id="tbl-resume">

                   
                       
               </tbody>
            </table>


        </div>

        <div class="container">
            <div class="container">


                 <h2>Total: <span id="spantotaltotal"></span></h2>
            </div>

            <div class="container m-4">
                   <h3>Recibo: </h3>
            <input type="number" oninput="validarNumero(this)" class="form-control" style="width:320px; font-size: 1.5em;" id="txtmonto" />

            </div>

            <div class="container m-4">
                 <button class="btn btn-success" id="btnpagar-efectivo" style="width: 320px; ">Pagar</button>

            </div>
         
        </div>



    </section>


    <section id="pago-tarjeta" style="display: none;">
              <button class="btn btn-danger" id="btn-atras5"><ion-icon name="arrow-back-outline"></ion-icon>atras</button>



            <div class="container">



                
        <h1>Resumen:</h1>
        <h5>(resumen de la compra)</h5>

        <div class="container">

            <table class="table table-hover" id="tablacardresume" >
                <thead>
                    <tr>
                        <td>Origen</td>
                        <td>Destino</td>
                        <td>Fecha de salida</td>
                        <td>Bus</td>
                        <td>Pasajero</td>
                        <td>Tipo</td>
                        <td>Asiento</td>
                        <td>costo</td>

                    </tr>
                </thead>
               <tbody id="tbl-card-resume">

                   
                       
               </tbody>
            </table>


        </div>


            <div class="container">


                 <h2>Total: <span id="spantotalcard"></span></h2>
            </div>

            <div class="container m-4">

                <!--revisar para pinpadweb-->

            </div>

            <div class="container m-4">
                 <button class="btn btn-success" id="btn-pagar-tarjeta"  style="width: 320px; ">Procesar pago</button>

            </div>
         
        </div>



  


    </section>



</asp:Content>
