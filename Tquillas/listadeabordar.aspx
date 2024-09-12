<%@ Page Title="listadeabordar" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="listadeabordar.aspx.cs" Inherits="About" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
  <header>
          <script src="Js/listadeabordar.js"></script>
          <link  rel="stylesheet" href="Css/listadeabordar.css"/>
      <script src="Js/terminalcheck.js"></script>
      <script src="Js/islog.js"></script>
  </header>

   

    <section id="section-buscarlista" >

        



           <div class=h1> Lista de abordar </div>   
        <div class="container p-5" flex=10; align-items: flex-start;>

             <a href="dash.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

        </a>
        <div class="fecha">
                    <label for="fecha">Desde: </label>
                    <input type="date" id="fecha" class="form form-control" style="width: 160px;">
        
                    <label for="fecha">Hasta: </label>
                    <input type="date" id="fecha2" class="form form-control" style="width: 160px;">
                       
</div>
         <center>
         <div class="container mt-5" id="content-button">
<button class="btn btn-primary" id="button_Buscar" style="width: 220px;" >Buscar</button>
</div>
             </center>  
    <br />

  <table class="table table-hover" id="listadeabordar">
                    <thead >
                        <tr class="table table-striped table-dark" >
                            <td><h4>Ruta</h4></td>
                            <td><h4>Autobus</h4></td>
                            <td><h4>Origen</h4></td>
                            <td><h4>Destino</h4></td>
                            <td><h4>Salida</h4></td>
                            <td><h4>Acciones</h4></td>
                        </tr>
                    </thead>
                    <tbody>
                      
    
                    </tbody>
                </table>
</div>

    </section>


    <section id="section-lista" style="display: none; ">

        <div class="container d-flex m-2 gap-2">
              <button class="btn btn-danger" id="btn-atras-lista">Atras</button>
            <button class="btn btn-primary" id="btn-guardar-lista">Descargar</button>
        </div>

        <div class="container mt-5" id="allcontent" >

       
          
              <div class="d-flex gap-3 align-items-center justify-content-arround">
                <img src="Assets/logoSag.png" alt="Alternate Text" style="width:120px;" />
                
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <p class="m-3">Taquilla: <span id="spantaquillas"></span></p>
                <p class="m-3">Ruta: <span id="rutabname"></span></p>
                <p class="m-3">Bus: <span id="buss"></span></p>
                <p class="m-3">Abordan: <span id="countabordan"></span></p>
            </div>

            <table id="table-lista" class="table table-hover">


                <thead class="bg-dark" >
                    <tr>
                        <td><h5>Asiento</h5></td>
                        <td><h5>Nombre</h5></td>
                        <td><h5>Origen</h5></td>
                        <td><h5>Destino</h5></td>
                        <td><h5>Boleto</h5></td>
                        <td><h5>Tipo</h5></td>
                        <td><h5>Escaneado</h5></td>
                        <td id="h4escaneado"><h5>Escaneado por: </h5></td>

                    </tr>

                </thead>

                 <tbody>



                </tbody>

        </table>  
            <table id="table-lista2" class="table table-hover" style="display: none; width: 208px; font-size: 10px; right: -90px;  border-collapse: collapse;">

                <thead class="bg-dark" style="font-size: 10px;">
                    <tr>
                        <td><p>Asiento</p></td>
                        <td><p>Nombre</p></td>
                        <td><p>Origen</p></td>
                        <td><p>Destino</p></td>
                        <td><p>Boleto</p></td>
                        <td><p>Tipo</p></td>
                        <td><p>Escaneado</p></td>
                        

                    </tr>

                </thead>

                 <tbody>



                </tbody>

        </table>



        </div>

        

    </section>

     

</asp:Content>
