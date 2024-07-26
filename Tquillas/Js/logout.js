document.addEventListener('DOMContentLoaded', (event) => {

    const btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', () => {

       var caja =  localStorage.getItem("caja_abierta")
        if (caja == "true") {
            alert("tu caja esta abierta")
        } else {


            var username = localStorage.getItem('username')
            var pass = localStorage.getItem('pass')


            const user = {
                "username": username,
                "password": pass
            }

            fetch('http://apitaquillassag.dyndns.org/Home/LogOut', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                //then se utiliza para que se guarde la conversion del json y nuevamente lo devueleve en data 
                .then(res => res.text())
                .then(data => {
                    //si la traduccion que esta en dasta es igual a lo que el usuario ingrese la sesion debe cerrarce 
                    if (data == "Session_Colsed") {

                        localStorage.clear();
                        window.location.replace("login.aspx")
                    }

                })

                .catch(error => {
                    Swal.fire({
                        title: "Error en el cierre de sesion!",
                        text: `${error}`,
                        icon: "error"
                    });
                })

        }






    })

})




