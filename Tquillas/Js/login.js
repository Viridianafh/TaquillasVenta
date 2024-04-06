
const button_login = document.getElementById('button_login')

button_login.addEventListener('click', () => {

    button_login.textContent = "Espere..."
    var text_user = document.getElementById('text_user').value;
    var text_password = document.getElementById('text_password').value;

    const user = {

        "username": text_user,
        "password": text_password
    }


    fetch('http://apitaquillassag.dyndns.org/Home/Login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
//stringify convierte un objeto o valor de JavaScript en una cadena de texto JSON
        body: JSON.stringify(user)
    })
        .then(response => response.text())
        .then(data => {

 //Mediante la toma de desicion establece el tipo de alertas que va a recibir el usuario en dado caso que no coincida con la contraseña correcta  

            if (data === "error al cambiar el log") {
                Swal.fire({
                    title: 'Error al iniciar sesion!',
                    text: `Usuario/Contraseña incorrectos`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })

            } else if (data === 'INVALIDHOST') {

                Swal.fire({
                    title: 'Error al iniciar sesion!',
                    text: `El Equipo no pertenece a un equio dado de alta para terminal`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })


            } else if (data === 'INVALID_CREDENTIALS') {


                Swal.fire({
                    title: 'Error al iniciar sesion!',
                    text: `Usuario/Contraseña incorrectos`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })




            } else if (data === 'user_is_log') {

                Swal.fire({
                    title: 'Error al iniciar sesion!',
                    text: `El usuario ha iniciado sesion en otro equipo o navegador,\n cierre sesion para iniciar una nueva en este navegador o dispositivo`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {

//de no ser necesaria la correccion de los datos se hara la conversion a JSON
                var datas = JSON.parse(data)
                    var id =  datas[0].id
                    var name =  datas[0].name
                    var last_name = datas[0].last_name
                    var second_last_name = datas[0].second_last_name
                    var email = datas[0].email
                    var username = datas[0].username
                    var password = datas[0].password
                    var isloged = datas[0].isloged
                    var terminal_id = ""
                    var terminal_name = ""
                    var sales_terminal = ""
                    var payment_terminal = ""
                    var venta_reciente = ""
                    var employee_type = datas[0].employee_type
                    var shift_prefix = ""
                    var rol = datas[0].rol
                    var nombreequipo = datas[0].nombreequipo
                    var office_location_id = datas[0].office_location_id
                    var office_name = datas[0].office_name
                    var pass = document.getElementById('text_password').value
                
//setItem se usa para crear nuevos datos como para actualizar valores existentes
                localStorage.setItem("id", id)
                localStorage.setItem("name", name + " " + last_name + " " + second_last_name)
                    localStorage.setItem("last_name", last_name )
                    localStorage.setItem("second_last_name", second_last_name )
                    localStorage.setItem("email", email)
                    localStorage.setItem("username", username )
                    localStorage.setItem("password", password )
                    localStorage.setItem("isloged", "true" )
                    localStorage.setItem("terminal_id", terminal_id)
                    localStorage.setItem("terminal_name", terminal_name)
                    localStorage.setItem("sales_terminal", sales_terminal)
                    localStorage.setItem("payment_terminal", payment_terminal )
                    localStorage.setItem("venta_reciente", venta_reciente )
                    localStorage.setItem("employee_type", employee_type )
                    localStorage.setItem("shift_prefix", shift_prefix )
                    localStorage.setItem("current_shift" , 0)
                    localStorage.setItem("rol" , rol)
                    localStorage.setItem("nombreequipo" , nombreequipo)
                    localStorage.setItem("office_location_id", office_location_id)
                    localStorage.setItem("office_name", office_name)
                    localStorage.setItem("pass", pass)



//se usa para redirigir el navegador a una nueva página
                window.location.replace("Views/loader.html")
            }
        })
        .catch(error => {


            Swal.fire({
                title: 'Error al iniciar sesion!',
                text: `Ocurrio un error: (mensaje de error: ${error})`,
                icon: 'error',
                confirmButtonText: 'OK'
            })

        })
       

})


