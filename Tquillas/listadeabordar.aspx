<%@ Page Title="listadeabordar" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="listadeabordar.aspx.cs" Inherits="About" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
  <header>
          <script src="Js/listadeabordar.js"></script>
          <link  rel="stylesheet" href="Css/listadeabordar.css"/>
  </header>
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
<button class="btn btn-primary " id="button_Buscar" >Buscar</button>
</div>
             </center>
    <br />

  <table class="table table-hover" id="listadeabordar">
                    <thead >
                        <tr class="table-success">
                            <td><h4>Ruta</h4></td>
                            <td><h4>Autobus</h4></td>
                            <td><h4>Origen</h4></td>
                            <td><h4>Destino</h4></td>
                            <td><h4>Salida</h4></td>
                            <td><h4>Archivo</h4></td>
                        </tr>
                    </thead>
                    <tbody>
                      
    
                    </tbody>
                </table>
</div>

</asp:Content>
