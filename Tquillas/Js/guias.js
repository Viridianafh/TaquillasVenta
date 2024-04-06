document.addEventListener('DOMContentLoaded', (event) => {


   

    Swal.fire({
        title: "Modulo en Desarrollo",
        text: 'Te notificaremos cuando esté listo para ti',
        icon: "warning",
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirigir al menú
            window.location.href = "dash.aspx";
        }
    });



})


