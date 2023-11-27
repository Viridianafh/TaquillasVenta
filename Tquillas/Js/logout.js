document.addEventListener('DOMContentLoaded', (event) => {

    const btn_logout = document.getElementById('btn_logout')

    btn_logout.addEventListener('click', () => {


        var username = localStorage.getItem('username')
        var pass = localStorage.getItem('pass')


        const user = {
            "username": username,
            "password": pass
        }

        fetch('http://192.168.0.245:82/Home/LogOut', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.text())
            .then(data => {

                if (data == "Session_Colsed") {

                    localStorage.clear();
                    window.location.replace("login.aspx")
                }

            })
            .catch(error => {
                alert("error en el cierre de sesion")
            })




    })

})