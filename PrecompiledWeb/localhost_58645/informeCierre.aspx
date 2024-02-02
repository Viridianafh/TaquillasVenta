﻿<%@ page title="index" language="C#" masterpagefile="~/Site.Master" autoeventwireup="true" inherits="About, App_Web_ksx3qzvz" %>


<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <script src="https://rawgit.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
        <script src="Js/islog.js"></script>
        <script src="Js/informecierre.js"></script>
        
      
    </header>

      <style>
            *{
                font-size: 13px;
            }
        </style>

    <div class="container m-3">

        <button class="btn btn-danger m-2" id="btn-end">Finalizar</button>
        <button class="btn btn-primary m-2" id="botonDescargar">Descargar</button>
    </div>

    <div class="container" id="informe">

        <h2>Informe Cierre Caja <span id="usuario"></span></h2>
        <p><strong> <span id="dates"></span></strong> </p>
        <p><span id="shift_number"></span></p>
        <br>

        <div class="container">

            <h4>Oficina: <span id="reporte-oficina"></span></h4>
            <h4>Terminal: <span id="reporte-terminal"></span></h4>

            <br />

            <div class="container d-flex">

                <div class="container">

                    <p>Cantidad de boletos Vendido en Efectivo: <span id="reporte-total-efectivo"></span></p>
                    <p>Cantidad de boletos Vendido en TC: <span id="reporte-total-tc"></span></p>
                    <p>Cantidad de boletos Vendido en Monedero E.: <span id="reporte-total-me"></span></p>
                    <p>Cantidad de boletos Vendido en Dep: <span id="reporte-total-DEP"></span></p>
                    <p>Cancelaciones: <span id="reporte-cancelaciones"></span></p>
                </div>


                <div class="container m-3">

                    <p>Total Vendido en Taquilla: <span id="reporte-total-venta"></span></p>
                    <p>La caja inicio con: <span id="reporte-total-iniciocaja"></span></p>
                    <p>Se retiró : <span id="reporte-total-seretiro"></span></p>
                    <p>Queda en Caja: <span id="queda-encaja"></span></p>
                </div>

            </div>

            <div class="container">
                <table class="table table-hover" id="tbl-retiro">
                    <thead>
                        <tr>
                            <th>Fecha Del Retiro:</th>
                            <th>Hora Del Retiro:</th>
                            <th>Se Retiro:</th>
                            <th>Quedo en Caja:</th>

                        </tr>
                    </thead>
                    <tbody>
                      
                    </tbody>
                </table>

            </div>



            <div class="container" style="margin-top: 50px;">

                <p>La taquillera entrega la cantidad de: $ <span id="reporte-total"></span></p>

                <h4>Entrega: <span id="reporte-taquillero"></span><hr/></h4>
                
                <h4>Recibe:  <hr/></h4>
            </div>





        </div>





    </div>




    <script>


        const opciones = {
            margin: 10,
            filename: `precortedecaja.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        document.getElementById('botonDescargar').addEventListener('click', () => {
            const contenidoDiv = document.getElementById('informe');
            html2pdf(contenidoDiv, opciones);
        });

    </script>




</asp:Content>