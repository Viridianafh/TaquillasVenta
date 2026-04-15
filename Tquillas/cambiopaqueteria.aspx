<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="cambiopaqueteria.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/terminalcheck.js"></script>
        <script src="Js/islog.js"></script>
    </header>
  
 
    <h1>Cambio paqueteria</h1>
    
    <section id="busqueda_paquete">

        <div class="container m-3">

            <label>Escribe el <strong>Código</strong> del paquete</label>

            <input type="text" id="codcompra" class="form-control"  />

            <button class="btn btn-dark" id="buscarPaq" onclick="BuscarPaquete()">Buscar paquete</button>

        </div>
    </section>

    <section id="sectiontable" style="display:none">

        <table class="table table-bordered " id="tabledatos">
    
            <thead>
                <tr>
                    <td>Código</td>
                    <td>Descripción</td>
                    <td>Remitente</td>
                    <td>Número remitente</td>
                    <td>Correo remitente</td>
                    <td>Destinatario</td>
                    <td>Número destinatario</td>
                    <td>Estatus</td>
                </tr>
            </thead>

            <tbody>

            </tbody>
        </table>

    </section>

    <section id="seleccion_viaje">

    </section>

</asp:Content>
