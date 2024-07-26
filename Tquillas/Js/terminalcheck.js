var miDato = localStorage.getItem('office_name');
var miElemento = document.getElementById('Oficina');
miElemento.textContent = miDato;

var minombre = localStorage.getItem('name');
var usuario = document.getElementById('usuario')
usuario.textContent = minombre
var mi_terminal = localStorage.getItem('terminal_name');
var role = localStorage.getItem('rol')

if (mi_terminal === null || mi_terminal === "") {


  

    Swal.fire({
        title: "¡Mensaje!",
        text: "No hay una terminal asignada, necesitas configurar una terminal primero",
        icon: "info",
        showCancelButton: false,
        confirmButtonText: 'Okay',
        willClose: () => {
            window.location.href = 'dash.aspx';
        }
    });


} else { }