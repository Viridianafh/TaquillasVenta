<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Cambio.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/islog.js"></script>
        <script src="Js/cambio.js"></script>
    </header>
  
 
      
    <section id="section-busqueda" class="mb-4">
        <div class="container">

            
        <label> Ticket del boleto anterior </label>
        <input type="text" id="boletoanterior" class="form-control" />

        <label> Ticket del boleto Nuevo </label>
        <input type="text" id="boletonuevo" class="form-control" />

        <button class="btn btn-dark m-2" id="btn-buscar">Buscar</button>

        </div>

       
    </section>
    <section>

        <div class="container">
  <div class="row">
    <div class="col">
        <div class="card">
            <h5 class="card-title m-2">datos del ticket anterior</h5>

            <div class="card-body">

                <table class="table table-bordered" id="tableticketviejo">
                   
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Asiento</th>
                            <th>Precio</th>
                            <th>Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                    </tbody>
                </table>

            </div>
            

        </div>
    </div>
    <div class="col">
        <div class="card">

     <h5 class="card-title m-2">datos del ticket nuevo</h5>

              <div class="card-body">

                <table class="table table-bordered" id="tableticketnuevo">
                   
                    <thead>
                        <tr>
                          <th>Nombre</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Asiento</th>
                            <th>Precio</th>
                            <th>Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                           
                           
                        </tr>
                    </tbody>
                </table>

            </div>
            

        </div>
      
    </div>
  </div>



            <button class="btn btn-danger mt-5">Proceder Cambio</button>
    </section>



  





</asp:Content>
