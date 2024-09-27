<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="buscarpaquete.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
   
        <script src="Js/terminalcheck.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/buscarpaquete.js"></script>


    </header>

    <style>
        a {
            text-decoration: none;
            color: aquamarine;
        }
    </style>

    <h2>Buscar paquetes </h2>


    <section>

        <div class="container m-3">

            <label>Ingresa el código de Compra o el id del paquete</label>

            <input type="text" id="codcompra" class="form-control"  />

            <button class="btn btn-dark" onclick="Buscar()">Buscar paquete</button>

        </div>

        <div class="container">

            <table class="table table-bordered " id="tabledatos">
                
                <thead>
                    <tr>
                        <td>Codigo</td>
                        <td>Descripción</td>
                        <td>Remitente</td>
                        <td>Numero remitente</td>
                        <td>Correo remitente</td>
                        <td>Destinatario</td>
                        <td>Numero Destinatario</td>
                        <td>Status</td>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>

        </div>



        <div class="container" id="content-updatestatus">


            <h1>Actualizar status</h1>

            <select id="select-status-packagee" class="form-control m-3">
                <option value="ORIGIN">en preparacion</option>
                <option value="INCOMING">en camino</option>
                <option value="DESTINY">en taquilla de destino</option>
                <option value="DELIVERED">entregado</option>
            </select>

            <button class="btn btn-success" onclick="actualizar()">Guardar</button>
        </div>
    </section>

    
</asp:Content>
