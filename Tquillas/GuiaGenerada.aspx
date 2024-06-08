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
  
 
     
    <section id="guia">



        <div class="d-flex justify-content-between m-3">

            <div>
                <img src="Assets/logoSag.png" style="width: 150px;" />
            </div>

            <h1>Guia De Viaje</h1>

            <div>
                <h4>
                fecha: <span id="fecha">2024-06-06</span>
                    
                    
             </h4>       
             </div>
            
        </div>


        
        <div class="d-flex justify-content-between m-3">

            <div>
                <h5>Corrida: <span id="titleorigen"> Corrida</span></h5>
                <h5>Origen: <span id="titleorigen"> Villahermosa Central</span></h5>
                <h5>Destino: <span id="titledestino">Merida</span></h5>
                <h5>Salida: <span id="titledestino">14:00</span></h5>
                <h5>LLegadada: <span id="titledestino">15:00</span></h5>
            </div>
            <div>
                <h5>Operador1: <span id="titleorigen">Ejemplo Operador</span></h5>
                <h5>Operador2: <span id="titledestino">Ejemplo Operador</span></h5>
                <h5>Bus: <span id="titledestino"> ejemplo bu</span></h5>
                <h5>Anticpo: <span id="titledestino">50</span></h5>
            </div>
            
        </div>




         <div class="container">
        <div class="row">

            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode" ></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>     <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Oficina: <span class="text-primary">Villahermosa Central</span></h5>
                        <h6 class="card-subtitle mb-2">Hora: 4:30</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Código: <span>CODIGOQR</span></h6>
                        <div id="qrcode"></div>

                    </div>
                </div>
            </div>
            

   

       


       <!--FIN DE LAS CARTAS-->
        </div>
    </div>


        <div class="d-flex justify-content-between m-5">

            <div>
                <img src="Assets/logoSag.png" style="width: 150px;" />
            </div>

            <h5>Buen viaje, Conduce con cuidado tu familia te espera!</h5>

            <div>
                <h6>
                fecha: <span id="fecha">2024-06-06</span>
                    
                    
             </h6>       
             </div>
            
        </div>

     
        <div class="d-flex justify-content-between m-5">

          
           <div>
               <h6>Condictor1</h6>
               <hr  style="width: 250px;"/>
           </div> 
            
            <div>
               <h6>Condictor1</h6>
                <hr  style="width: 250px;"/>
           </div>

            
        </div>  
        
        <div class="d-flex justify-content-between m-5">

          
           <div>
               <h6>corrida</h6>
           </div> 
            
            <div>
               <h6>unidad</h6>
           </div>
            
            
            <div>
               <h6>anticipo</h6>
           </div>

            
        </div>

     

    </section>


</asp:Content>
