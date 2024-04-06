<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Busqueda.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/islog.js"></script>
        <script src="Js/Busqueda.js"></script>
    </header>
  
 
      
    <section id="section-busqueda">

         <a href="dash.aspx" style="text-decoration: none;">

            <button class="btn btn-danger">
             <ion-icon name="arrow-back-outline"></ion-icon>
            </button>

        </a>

            <h2>Buscar Boletos</h2>

            <div class="container m-5">

            <h5>(Busca un boleto por su nombre completo, su ticket o código de compra)</h5>
        
            <input type="text" id="textconcepto" class="form-control" style="width:80%;" />
            <br />
            <button class="btn btn-dark" id="btn-buscar">Buscar</button>

        </div>
    </section>



    <section id="sectiontable">

        <table class="table table-hover" id="table">
            <thead>
                 <tr>
                   <th scope="col">Nombre</th>
                   <th scope="col">Tipo</th>
                   <th scope="col">Ticket</th>
                   <th scope="col">Precio</th>
                   <th scope="col">Código de compra</th>
                   <th scope="col">Tipo de pago</th>
                   <th scope="col">Fecha</th>
                   <th scope="col">Asiento</th>
                   <th scope="col">Status</th>
                   <th scope="col">Actions</th>
                 </tr>
            </thead>
            <tbody>

            </tbody>

        </table>

    </section>





</asp:Content>
