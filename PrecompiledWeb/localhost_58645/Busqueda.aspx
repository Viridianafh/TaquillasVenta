<%@ page title="index" language="C#" masterpagefile="~/Site.Master" autoeventwireup="true" inherits="About, App_Web_0gbs5l3r" %>


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

            <h5>(Busca un boleto por nombre, ticket o código de compra)</h5>
        
            <input type="text" id="textconcepto" class="form-control" />
            <br />
            <button class="btn btn-dark" id="btn-buscar">Buscar</button>

        </div>
    </section>



    <section id="sectiontable">

        <table class="table table-hover" id="table">
            <thead>
                 <tr>
                   <td><h4>Nombre</h4></td>
                   <td><h4>Tipo</h4></td>
                   <td><h4>Ticket</h4></td>
                   <td><h4>Precio</h4></td>
                   <td><h4>Código de compra</h4></td>
                   <td><h4>Tipo de pago</h4></td>
                   <td><h4>Fecha</h4></td>
                   <td><h4>Asiento</h4></td>
                   <td><h4>Status</h4></td>
                 </tr>
            </thead>
            <tbody>

            </tbody>

        </table>

    </section>


</asp:Content>
