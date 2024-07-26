<%@ Page Title="index" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="GuiaGenerada.aspx.cs" Inherits="About" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
      
        <script src="Js/islog.js"></script>
        <script src="Js/guiagenerada.js"></script>
    </header>
    <style>

.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
    </style>
  
 

    
        <div class="container mt-2" >
            <button class="btn btn-danger">Atrás</button>
            <button class="btn btn-dark" id="botonDescargar">Descargar</button>
        </div>
     
    <section id="guia">



        <div class="d-flex justify-content-between m-3">

            <div>
                <img src="Assets/logoSag.png" style="width: 150px;" />
            </div>

            <h1>Guia De Viaje</h1>

            <div>
                <h4>
                <%--fecha: <span id="fecha">2024-06-06</span>--%>
                    
                    
             </h4>       
             </div>
            
        </div>


        
        <div class="d-flex justify-content-between m-3">

            <div>
                <h5 class="text-primary">Corrida: <span   class="text-dark" id="textcorrida"> </span></h5>
                <h5 class="text-primary">Origen: <span    class="text-dark" id  ="textorigen"> </span></h5>
                <h5 class="text-primary">Destino: <span   class="text-dark" id="textdestino"></span></h5>
                <h5 class="text-primary">Salida: <span    class="text-dark" id   ="textsalida"></span></h5>
                <%--<h5 class="text-primary">LLegadada: <span class="text-dark" id="textllegada"></span></h5>--%>
            </div>
            <div>
                <h5 class="text-primary">Operador1: <span class="text-dark" id="textoperador1"></span></h5>
                <h5 class="text-primary">Operador2: <span class="text-dark" id="textoperador2"></span></h5>
                <h5 class="text-primary">Bus:       <span class="text-dark" id="textbus"> </span></h5>
                <h5 class="text-primary">Anticpo:   <span class="text-dark" id="textanticipo"></span></h5>
            </div>
            
        </div>




         <div class="container">
        <div class="row" id="cards-container">

           

       


       <!--FIN DE LAS CARTAS-->
        </div>
    </div>


        <div class="d-flex justify-content-between m-5">

           

            <h5>Buen viaje, Conduce con cuidado tu familia te espera!</h5>

            <div>
                <h6>
              <%--  fecha: <span id="fecha">2024-06-06</span>--%>
                    
                    
             </h6>       
             </div>
            
        </div>

     
        <div class="d-flex justify-content-between m-5">

          
           <div>
               <h6 id="hconductor1"></h6>
               <hr  style="width: 250px;"/>
           </div> 
            
            <div>
               <h6 id="hconductor2"></h6>
                <hr  style="width: 250px;"/>
           </div>

            
        </div>  
        
        <div class="d-flex justify-content-between m-5">

          
           <div>
               <h6>corrida <span id="text-corrida"></span></h6>
           </div> 
            
            <div>
               <h6 id="hunidad"></h6>
           </div>
            
            
            <div>
               <h6>anticipo <span id="text-anticipo"></span></h6>
           </div>

            
        </div>
        <div class="container d-flex align-items-center justify-content-center">

             <div>
                <img src="Assets/logoSag.png" style="width: 200px;" />
            </div>
        </div>

     

    </section>


</asp:Content>
