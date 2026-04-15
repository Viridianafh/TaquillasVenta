<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="cancelarviaje.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/terminalcheck.js"></script>
        <script src="Js/islog.js"></script>
    </header>
  
 
    <h1>Cancelación de viajes.</h1>
    
    <section id="busqueda_viaje">

            <div class="container p-5 ">
                <div class="container m-3">
                    <label for="origen">Origen: </label>
                    <select id="origen" class="select2" style="width: 320px;">
                        <option value="default">Seleccionar opción</option>
                    </select>
                </div>
                <div class="container m-3">
                    <label for="destino">Destino: </label>
                    <select id="destino" class="select2" style="width: 320px;">
                        <option value="default">Seleccionar opción</option>
                    </select>
                </div>
                <div class="container m-3">
                    <label for="fecha">Fecha de viaje: </label>
                    <input type="date" id="fecha" class="form form-control" style="width: 160px;">
                </div>
                <div class="container m-3">
                    <button class="btn btn-primary w-100" id="btn-trip" onclick="viajes()">
                        Buscar viaje 
                    </button>
                </div>
            </div>
    </section>

    <section class="section container" id="section-boletos" style="display: none;">


    <div class="container p-5">        
            <table class="table table-hover" id="tabla-viajes">
                <thead >
                    <tr>
                        <td><h4>Corrida</h4></td>
                        <td><h4>Tipo</h4></td>
                        <td><h4>Origen</h4></td>
                        <td><h4>Destino</h4></td>
                        <td><h4>Bus</h4></td>
                        <td><h4>Salida</h4></td>
                        <td><h4>Llegada</h4></td>
                        <td><h4>Precio $ </h4></td>
                        <td><h4>Acciones</h4></td>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
    </div>


</section>
    <script src="Js/cancelarviaje.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            origenesDestinos();
        });
    </script>    
</asp:Content>
