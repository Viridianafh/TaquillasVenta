document.addEventListener('DOMContentLoaded', (event) => {






    var role = JSON.parse(localStorage.getItem('rol'));

    localforage.getItem('office_name').then(function (value) {
        if (value !== null) {
            console.log('Terminal ID:', value);
            document.getElementById('Oficina').textContent = value;
        } else {
            console.log('No se encontró el terminalid.');
        }
    }).catch(function (err) {
        console.error('Error al obtener el terminalid:', err);
    });

    localforage.getItem('terminal_name').then(function (value) {
        if (value !== null) {
            console.log('Terminal ID:', value);
            document.getElementById('Terminals').textContent = value;
        } else {
            console.log('No se encontró el terminalid.');
        }
    }).catch(function (err) {
        console.error('Error al obtener el terminalid:', err);
    });


    localforage.getItem('terminal_id').then(function (value) {

        if (value != null) {
            console.log('Terminal ID:', value);

            var miElemento = document.getElementById('Terminals');
            miElemento.textContent = mi_terminal;
            var buttonCrear = document.getElementById('btncreate')
            buttonCrear.disabled = true
            var miSelect = document.getElementById('select_terminal_crear');
            miSelect.disabled = true;

            if (role && role.includes('admin-role')) {



            } else {

                Swal.fire({
                    title: "Mensaje!",
                    text: "No tienes los permisos suficientes para acceder a esta sección, serás redirigido a la página principal",
                    icon: "error",
                    confirmButtonText: 'OK'
                }).then(function () {
                    window.location.href = "/dash.aspx";
                });
            }

        } else {
            console.log('No se encontró el terminalid.');
         
        }
    }).catch(function (err) {
        console.error('Error al obtener el terminalid:', err);

    });

   






   


    fetch('http://apitaquillassag.dyndns.org/Home/getofice')
        .then(res => res.json())
        .then(data => {

            var select_office_crear = document.getElementById('select_oficina_crear')
            data.forEach(element => {

                const crearoptions = document.createElement('option')
                crearoptions.value = element.office_id
                crearoptions.textContent = element.office_name
                select_office_crear.appendChild(crearoptions)

              


            })



            select_office_crear.addEventListener('change', () => {

                var officeselected = select_office_crear.value
                var oficename = select_office_crear.selectedOptions[0].textContent;
                document.getElementById('Oficina').textContent = oficename

                localStorage.setItem('office_name', oficename)
                localStorage.setItem('office_location_id', officeselected)
                localforage.setItem('office_name', oficename).then(function () {
                    console.log('office_name guardado con éxito.');
                }).catch(function (err) {
                    console.error('Error al guardar el terminalid:', err);
                });

                localforage.setItem('office_location_id', officeselected).then(function () {
                    console.log('office_location_id guardado con éxito.');
                }).catch(function (err) {
                    console.error('Error al guardar el terminalid:', err);
                });


                var office_location_id = localStorage.getItem('office_location_id')
                fetch(`http://apitaquillassag.dyndns.org/Home/BuscarTerminal?location=${officeselected}`)
                    .then(response => response.json())
                    .then(data => {
                        var select_terminal_crear = document.getElementById('select_terminal_crear')
                        var select_terminal_cambiar = document.getElementById('select_terminal_cambiar')

                        select_terminal_crear.innerHTML = '';
                        select_terminal_cambiar.innerHTML = '';

                        data.forEach(e => {
                            const crearoptions = document.createElement('option')
                            crearoptions.value = e.id_terminal
                            crearoptions.textContent = e.nombre_terminal

                            select_terminal_crear.appendChild(crearoptions)

                        })
                     

                        data.forEach(e => {
                            const crearoptions = document.createElement('option')
                            crearoptions.value = e.id_terminal
                            crearoptions.textContent = e.nombre_terminal


                            select_terminal_cambiar.appendChild(crearoptions)
                        })

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `Ocurrio un Error: Mensaje de error: (${error})`,
                            icon: "error"
                        });
                    })

            })
        })







    var buttonCrear = document.getElementById('btncreate')
    buttonCrear.addEventListener('click', () => {

        const terminalname = document.getElementById("select_terminal_crear")
        const selectedOption = terminalname.selectedOptions[0];
        const terminal_name = selectedOption.textContent;

        localStorage.setItem('terminal_name', terminal_name)

        localforage.setItem('terminal_name', terminal_name).then(function () {
            console.log('Terminal name guardado con éxito.');
        }).catch(function (err) {
            console.error('Error al guardar el terminal name:', err);
        });


        var terminal = document.getElementById('select_terminal_crear').value
        var iduser = localStorage.getItem('id')
        var office_location_id = localStorage.getItem('office_location_id')


        fetch(`http://apitaquillassag.dyndns.org/Home/Asignar_terminal?user_id=${iduser}&termina_lid=${terminal}&office_id=${office_location_id}`)

            .then(response => response.json())
            .then(data => {

                localStorage.setItem('terminal_id', data.terminal_id)
                localforage.setItem('terminal_id', data.terminal_id).then(function () {
                    console.log('Terminal ID guardado con éxito.');
                }).catch(function (err) {
                    console.error('Error al guardar el terminalid:', err);
                });

                var mi_terminal = localStorage.getItem('terminal_name'); 
                var miElemento = document.getElementById('Terminals');
                miElemento.textContent = mi_terminal;

                Swal.fire({
                    position: "top-end",
                    icon: "succes",
                    title: "Terminal asignada Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                var buttonCrear = document.getElementById('btncreate')
                buttonCrear.disabled = true
                var miSelect = document.getElementById('select_terminal_crear');
                miSelect.disabled = true;
                console.log(data)

                fetch(`http://apitaquillassag.dyndns.org/Home/actualizarOFl?officelocationId=${office_location_id}&ticketuserid=${iduser}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'text/plain'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(text => console.log(text))
                    .catch(error => console.error('Fetch Error:', error));


            })


    })



    var btncambiar = document.getElementById('btncambiar')

    btncambiar.addEventListener('click', () => {

        var terminal = document.getElementById('select_terminal_cambiar').value
        var iduser = localStorage.getItem('id')
 

        fetch(`http://apitaquillassag.dyndns.org/Home/CambiarConf?id_user=${iduser}&terminal=${terminal}`)

            .then(response => {
                response.text()

            })
            .then(data => {

                alert("cambios realizados con exito")

                const terminalname = document.getElementById("select_terminal_cambiar")
                const selectedOption = terminalname.selectedOptions[0];
                const terminal_name = selectedOption.textContent;

                var select_office_crear = document.getElementById('select_oficina_crear')

                var officeselected = select_office_crear.value

                localStorage.setItem('terminal_name', terminal_name)
                localStorage.setItem('terminal_id', terminal)
                localforage.setItem('terminal_id', terminal).then(function () {
                    console.log('Terminal ID guardado con éxito.');
                }).catch(function (err) {
                    console.error('Error al guardar el terminalid:', err);
                });

                var mi_terminal = localStorage.getItem('terminal_name');
                var miElemento = document.getElementById('Terminals');
                miElemento.textContent = mi_terminal;

                fetch(`http://apitaquillassag.dyndns.org/Home/actualizarOFl?officelocationId=${officeselected}&ticketuserid=${iduser}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'text/plain'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(text => console.log(text))
                    .catch(error => console.error('Fetch Error:', error));

            })
            .catch(error => {

                Swal.fire({
                    title: "Error!",
                    text: `Error inesperado: ${error}`,
                    icon: "error",
                    confirmButtonText: 'OK'
                });
            })


    })






});




