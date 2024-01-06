<%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="Js/checklog.js"></script>

     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title></title>
</head>

    <style>

        #logg
        {
           
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        }
    </style>

<body>



    <div class="container d-flex align-items-center justify-content-center flex-column" >

               
          <img src="Assets/logoSag.png" style="width: 250px; margin-top: 30px;" />

        

        <div class="card" style="height: 500px; width:60%; display:flex; align-items: center; justify-content: center; flex-direction: column; margin-top: 100px; "  id="logg"  >

     

            <div class="container" style="width:100%; display:flex; align-items: center; justify-content:center; flex-direction: column; gap: 30px;">
                   <h2>Inicio De Sesion</h2>

                <div class="container w-100" style="display: flex; align-items: center; justify-content: center; flex-direction:column; ">

                    <label>Usuario</label>
                    <input id="text_user" type="text" class="form-control m-3" style="width:80%"/>

                     <label>Contraseña</label>
                    <input id="text_password" type="password" class="form-control m-3" style="width:80%"/>

                    <button class="btn btn-primary" id="button_login" style="width:150px;">Ingresar</button>

                </div>
            </div>
         

        </div>

    </div>

    
     
    <script src="Js/login.js"></script>
</body>
</html>
