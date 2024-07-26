<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="dash.aspx.cs" Inherits="About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/dash.js"></script>
        <script src="Js/islog.js"></script>
    </header>

    <style>
        a {
            text-decoration: none;
            color: aquamarine;
        }
    </style>

    <h2>Bienvenido <span id="usuario"></span></h2><br>

    <label>Terminal: <span id="Terminals"></span></label><br />
    <label>Oficina: <span id="Oficina"></span></label><hr />


    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="taquilla-tab" data-bs-toggle="tab" data-bs-target="#taquilla" type="button" role="tab" aria-controls="taquilla" aria-selected="true">Taquilla</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="paqueteria-tab" data-bs-toggle="tab" data-bs-target="#paqueteria" type="button" role="tab" aria-controls="paqueteria" aria-selected="false">Paquetería</button>
        </li>
    </ul>

    <div class="tab-content">
        <div class="tab-pane fade show active" id="taquilla" role="tabpanel" aria-labelledby="taquilla-tab">
                            <h3>Taquilla</h3>
            <div class="container d-flex flex-wrap gap-5" id="contentcards" style="margin-top: 30px;">

                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                        <div><ion-icon name="ticket-outline" style="font-size: 80px;"></ion-icon></div>
                        <h5 class="card-title">Venta de Boletos</h5>
                        <p class="card-text">Realiza la venta de boletos de autobús aquí</p>
                    </div>
                    <div class="card-footer"><a href="ventas.aspx">Ver</a></div>
                </div>

                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                        <div><ion-icon name="bus-outline" style="font-size: 80px;"></ion-icon></div>
                        <h5 class="card-title">Lista de Abordar</h5>
                        <p class="card-text">Consulta la lista de las personas que van a abordar</p>
                    </div>
                    <div class="card-footer"><a href="listadeabordar.aspx">Ver</a></div>
                </div>

                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div><ion-icon name="search-circle-outline" style="font-size: 80px;"></ion-icon></div>
                    <div class="card-body">
                        <h5 class="card-title">Buscar un Boleto</h5>
                        <p class="card-text">Busca un boleto consultando nombre, correo, o código de compra</p>
                    </div>
                    <div class="card-footer"><a href="Busqueda.aspx">Ver</a></div>
                </div>

                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div><ion-icon name="scan-circle-outline" style="font-size: 80px;"></ion-icon></div>
                    <div class="card-body">
                        <h5 class="card-title">Escaneo de Boletos</h5>
                        <p class="card-text">Escanea el boleto ingresando el código del ticket</p>
                    </div>
                    <div class="card-footer"><a href="escaneo.aspx">Ver</a></div>
                </div>

                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div><ion-icon name="swap-horizontal-outline" style="font-size: 70px; color: white;"></ion-icon></div>
                    <div class="card-body">
                        <h5 class="card-title">Cambio</h5>
                        <p class="card-text">Necesitas cambiar un viaje por otro, haz clic aquí</p>
                    </div>
                    <div class="card-footer"><a href="Cambio.aspx">Ver</a></div>
                </div>
            </div>
        </div>

        <div class="tab-pane fade" id="paqueteria" role="tabpanel" aria-labelledby="paqueteria-tab">
            <h3>Paquetería</h3>



              <div class="container d-flex flex-wrap gap-5" id="contentcards" style="margin-top: 30px;">
                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                        <div><ion-icon name="swap-horizontal-outline" style="font-size: 80px;"></ion-icon></div>
                        <h5 class="card-title">Enviar Paquetes</h5>
                        <p class="card-text">click aqui para enviar paquetes </p>
                    </div>
                    <div class="card-footer"><a href="enviarpaquete.aspx">Ver</a></div>
                </div>

                <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
                    <div><ion-icon name="search-circle-outline" style="font-size: 80px;"></ion-icon></div>
                    <div class="card-body">
                        <h5 class="card-title">Buscar paqueteria</h5>
                        <p class="card-text">Busca un paquete usando su ticket</p>
                    </div>
                    <div class="card-footer"><a href="buscarpaquete.aspx">Ver</a></div>
                </div>

               

              
            </div>


        </div>
    </div>
</asp:Content>
