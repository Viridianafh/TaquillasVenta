<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="notifications.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
     <script src="Js/dash.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/notifications.js"></script>
    </header>
  
    <style>
        a{
            text-decoration: none;
            color: aquamarine;
        }

        

    </style>
 
      
      <h2>Lo nuevo para ti<br></h2>

    

      <div class="container d-flex flex-wrap gap-5" id="contentcards"  style="margin-top: 30px; ">

          <table class="table table-hover">
              <thead>
                  <tr>
                  <th>Mensaje</th>
                  <th>fecha de mensaje</th>
                  <th>acciones</th>
              </tr>
              </thead>
              
              <tbody>
                    <tr>
                  <td>Aquí podras ver todas las novedades, viajes nuevos, modificaciones, etc</td>
                  <td>2024-04-22</td>
                  <td><button class="btn btn-danger">borrar</button></td>
              </tr>
              </tbody>
          </table>

        </div>



  

</asp:Content>
