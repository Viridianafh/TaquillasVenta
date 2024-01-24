
    const isLoggedIn = localStorage.getItem('isloged');


    if (isLoggedIn == "true") {
        // Si no ha iniciado sesión, redirige a la página de inicio de sesión
        window.location.href = 'dash.aspx';
    } else {
     
    }



