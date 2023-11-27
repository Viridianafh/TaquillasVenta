<%@ Page Title="ventas" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="ventas.aspx.cs" Inherits="About" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
  <header>
          <script src="Js/ventas.js"></script>
      <link  rel="stylesheet" href="css/ventas.css"/>

  </header>
 
    <div class="container mt-5" id="content-button">
        <button class="btn btn-primary" id="button_iniciar">Iniciar Turno</button>
    </div>    
 


    <div class="container" id="content-buscador" style="display: none;">
        <h1>Venta de Boletos</h1>

          <div class="container mt-5 mb-2 gap-2" id="content-buttons" style="display: none">
        <button class="btn btn-success" id="button_precorte">Precorte de Caja</button>
       <button class="btn btn-danger" id="button_cerrar_caja">Cerrar Caja</button>
    </div>  

        <hr />
    
        <div class="card ">
            <div class="container p-5 d-flex ">
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
    </div>



    <section class="section container" id="section-boletos" style="display: none;">


        <div class="container p-5">
            <h2>Nuestros viajes</h2>
            <hr />

                <table class="table table-hover">
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



   





    <div class="parent" style="display: none;">



        <h2>Selecciona tus asientos</h2>
<div class="div1 container" id="content"> 


    <button class="btn btn-danger" id="asiento" style="width: 100px; height: 100px; display: flex; align-items: flex-start; justify-content: center; padding: 5px;">

          
                <h4>1</h4>
                    <img src="Assets/asiento.png" / style="width: 60px; height:60px; object-fit:cover; align-self: end;">
              
            </button>

</div>






<div class="div2 container" id="content">
    <button class="btn btn-primary" id="asiento" style="width: 100px; height: 100px; display: flex; align-items: flex-start; justify-content: center; padding: 5px;">

          
                <h4>2</h4>
                    <img src="Assets/asiento.png" / style="width: 60px; height:60px; object-fit:cover; align-self: end;">
              
            </button>


</div>


        <div class="div3 container" id="content">
    <button class="btn btn-primary" id="asiento" style="width: 100px; height: 100px; display: flex; align-items: flex-start; justify-content: center; padding: 5px;">

          
                <h4>3</h4>
                    <img src="Assets/asiento.png" / style="width: 60px; height:60px; object-fit:cover; align-self: end;">
              
            </button>


</div>


             <div class="div4 container" id="content">
    <button class="btn btn-success" id="asiento" style="width: 100px; height: 100px; display: flex; align-items: flex-start; justify-content: center; padding: 5px;">

          
                <h4>4</h4>
                    <img src="Assets/asiento.png" / style="width: 60px; height:60px; object-fit:cover; align-self: end;">
              
            </button>


</div>


<div class="div6"> </div>
<div class="div7"> </div>
<div class="div8"> </div>
<div class="div9"> </div>
<div class="div10"> </div>
<div class="div11"> </div>
<div class="div12"> </div>
<div class="div13"> </div>
<div class="div14"> </div>
<div class="div15"> </div>
<div class="div16"> </div>
<div class="div17"> </div>
<div class="div18"> </div>
<div class="div19"> </div>
<div class="div20"> </div>
<div class="div21"> </div>
<div class="div22"> </div>
<div class="div23"> </div>
<div class="div24"> </div>
<div class="div25"> </div>
<div class="div26"> </div>
<div class="div27"> </div>
<div class="div28"> </div>
<div class="div29"> </div>
<div class="div30"> </div>
<div class="div31"> </div>
<div class="div32"> </div>
<div class="div33"> </div>
<div class="div34"> </div>
<div class="div35"> </div>
<div class="div36"> </div>
<div class="div37"> </div>
<div class="div38"> </div>
<div class="div39"> </div>
<div class="div40"> </div>
<div class="div41"> </div>
<div class="div42"> </div>
<div class="div43"> </div>
<div class="div44"> </div>
</div>


</asp:Content>
