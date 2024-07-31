window.onload = function () {
    // Obtener y mostrar el nombre de la oficina
    localforage.getItem('office_name').then(function (miDato) {
        var miElemento = document.getElementById('Oficina');
        if (miElemento && miDato) {
            miElemento.textContent = miDato;
        }
    });

    // Obtener y mostrar el nombre del usuario
    localforage.getItem('name').then(function (minombre) {
        var usuario = document.getElementById('usuario');
        if (usuario && minombre) {
            usuario.textContent = minombre;
        }
    });

    // Obtener y verificar el nombre de la terminal
    localforage.getItem('terminal_name').then(function (mi_terminal) {
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
        } else {
            // Aquí puedes agregar el código adicional para cuando sí hay una terminal asignada
        }
    });

    // Obtener el rol del usuario
    localforage.getItem('rol').then(function (role) {
        // Usa el rol si es necesario
    });
};
