<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="Js/configterminal.js"></script>
    </header>
  
 
      
      <h2>Bienvenido <span id="usuario"></span></h2><br>

       <label >Terminal: <span id="Terminals"></span></label> 
      <br />
       <label >Oficina: <span id="Oficina"></span></label> 

      <hr />

      <div class="container" style="margin-top: 30px;" >


        

          <div class="row gap-2">

              <div class="col border rounded p-2" >
                  <h3>Configurar terminal</h3>

                  <div class="card h-5 p-5 gap-2">

                      <label>Selecciona la terminal </label>
                      <select class="form-select" id ="select_terminal_crear">
                          <option value="-">Selecciona tu terminal</option>
                      </select>


                
                      <button id="btncreate" class="btn btn-primary" style="height: 40px; width: 50%;">Crear</button>
                  

                  </div>

                

              </div>


               <div class="col border rounded p-2">
                  <h3>Cambiar Configuración</h3>

                     <div class="card h-5 p-5 gap-2">

                      <label>Selecciona la terminal </label>
                      <select class="form-select" id ="select_terminal_cambiar">
                          <option value="-">Selecciona tu terminal</option>
                      </select>
                   
                         <button id="btncambiar" class="btn btn-success" style="height: 40px; width: 50%;">Cambiar</button>


                  </div>
              </div>
           </div>
           
    </div>



</asp:Content>
