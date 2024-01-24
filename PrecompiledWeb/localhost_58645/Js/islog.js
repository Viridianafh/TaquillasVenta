var logeado = localStorage.getItem("isloged")

if (logeado != "true") {
    window.location.href = "login.aspx"
}