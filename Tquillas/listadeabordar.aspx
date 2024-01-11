<%@ Page Title="listadeabordar" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="listadeabordar.aspx.cs" Inherits="About" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
  <header>
          <script src="Js/listadeabordar.js"></script>
          <link  rel="stylesheet" href="Css/listadeabordar.css"/>
      <script src="Js/islog.js"></script>
  </header>


    <section id="section-buscarlista">

           <div class=h1> Lista de abordar </div>   
        <div class="container p-5" flex=10; align-items: flex-start;>
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

        <div class="container mt-5">

          

            <table id="table-lista" class="table table-hover">

                <thead class="bg-dark">
                    <tr>
                        <td><h5>Asiento</h5></td>
                        <td><h5>Nombre</h5></td>
                        <td><h5>Origen</h5></td>
                        <td><h5>Destino</h5></td>
                        <td><h5>Boleto</h5></td>
                        <td><h5>Tipo</h5></td>
                        <td><h5>se escaneo</h5></td>

                    </tr>

                </thead>

                 <tbody>



                </tbody>

        </table>



        </div>

        

    </section>
     

</asp:Content>
