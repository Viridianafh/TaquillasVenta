<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="buscarpaquete.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
   
        <script src="Js/terminalcheck.js"></script>
        <script src="Js/islog.js"></script>
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

            <button class="btn btn-dark" onclick="Buscar()">Buscar</button>

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

    
    <script>

        function Buscar() {
            var data = document.getElementById('codcompra').value;

            fetch(`https://localhost:5001/Home/BuscarPaquete?ticket=${data}`)
                .then(res => res.json())
                .then(data => {
                    var tabla = document.getElementById('tabledatos').getElementsByTagName('tbody')[0];
                    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

                    data.forEach(e => {
                        var tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${e.TicketId}</td>
                            <td>${e.Concept}</td>
                            <td>${e.SenderName}</td>
                            <td>${e.SenderPhone}</td>
                            <td>${e.SenderEmail}</td>
                            <td>${e.ReceiverName}</td>
                            <td>${e.ReceiverPhone}</td>
                            <td>${e.Status}</td>
                        `;
                        tabla.appendChild(tr);
                    });
                })
                .catch(error => {
                    alert("Hubo un error o no se encontró el boleto");
                });
        }

        function actualizar() {

            var status = document.getElementById('select-status-packagee').value
            var data = document.getElementById('codcompra').value;

            fetch(`https://localhost:5001/Home/actualziarstatus?status=${status}&ticket=${data}`, {
                method: 'PATCH'
            })
                .then(response => {
                    if (response.ok) {
                        alert("Actualización exitosa");
                    } else {
                        alert("Error al actualizar el estado");
                    }
                })
                .catch(error => {
                    alert("Hubo un error en la solicitud");
                });
        }


    </script>
</asp:Content>
