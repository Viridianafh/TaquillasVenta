document.addEventListener('DOMContentLoaded', (event) => {


    var miDato = localStorage.getItem('office_name'); 
    var miElemento = document.getElementById('Oficina');
    miElemento.textContent = miDato;

    var minombre = localStorage.getItem('name');
    var usuario = document.getElementById('usuario')
    usuario.textContent = minombre


    var mi_terminal = localStorage.getItem('terminal_name');

    if (mi_terminal === null || mi_terminal === "") {
        alert("no hay una terminal asignada debes crear una para poder acceder a ventas")
    } else {
        var miElemento = document.getElementById('Terminals');
        miElemento.textContent = mi_terminal;
        var buttonCrear = document.getElementById('btncreate')
        buttonCrear.disabled = true
        var miSelect = document.getElementById('select_terminal_crear');
        miSelect.disabled = true;
    }
   




    var office_location_id = localStorage.getItem('office_location_id')
    fetch(`https://localhost:5001/Home/BuscarTerminal?location=${office_location_id}`)
        .then(response => response.json())
        .then(data => {
            var select_terminal_crear = document.getElementById('select_terminal_crear')
            var select_terminal_cambiar = document.getElementById('select_terminal_cambiar')

            data.forEach(e => {
                const crearoptions = document.createElement('option')
                crearoptions.value = e.id_terminal
                crearoptions.textContent = e.nombre_terminal

                // Añade la opción al elemento select
                select_terminal_crear.appendChild(crearoptions)

            })


            data.forEach(e => {
                const crearoptions = document.createElement('option')
                crearoptions.value = e.id_terminal
                crearoptions.textContent = e.nombre_terminal

                // Añade la opción al elemento select
                select_terminal_cambiar.appendChild(crearoptions)
            })

        })
        .catch(error => {
            console.log(error)
        })









    var buttonCrear = document.getElementById('btncreate')
    buttonCrear.addEventListener('click', () => {

        const terminalname = document.getElementById("select_terminal_crear")
        const selectedOption = terminalname.selectedOptions[0];
        const terminal_name = selectedOption.textContent;

        localStorage.setItem('terminal_name', terminal_name)


        var terminal = document.getElementById('select_terminal_crear').value
        var iduser = localStorage.getItem('id')
        var office_location_id = localStorage.getItem('office_location_id')


        fetch(`https://localhost:5001/Home/Asignar_terminal?user_id=${iduser}&termina_lid=${terminal}&office_id=${office_location_id}`)

            .then(response => response.json())
            .then(data => {

                localStorage.setItem('terminal_id', data.terminal_id)

                var mi_terminal = localStorage.getItem('terminal_name'); 
                var miElemento = document.getElementById('Terminals');
                miElemento.textContent = mi_terminal;

                alert("Terminal asignada con exito")
                var buttonCrear = document.getElementById('btncreate')
                buttonCrear.disabled = true
                var miSelect = document.getElementById('select_terminal_crear');
                miSelect.disabled = true;
                console.log(data)




            })


    })



    var btncambiar = document.getElementById('btncambiar')

    btncambiar.addEventListener('click', () => {

        var terminal = document.getElementById('select_terminal_cambiar').value
        var iduser = localStorage.getItem('id')
 

        fetch(`https://localhost:5001/Home/CambiarConf?id_user=${iduser}&terminal=${terminal}`)

            .then(response => {
                response.text()

            })
            .then(data => {

                alert("cambios realizados con exito")

                const terminalname = document.getElementById("select_terminal_cambiar")
                const selectedOption = terminalname.selectedOptions[0];
                const terminal_name = selectedOption.textContent;

                localStorage.setItem('terminal_name', terminal_name)
                localStorage.setItem('terminal_id', terminal)


                var mi_terminal = localStorage.getItem('terminal_name');
                var miElemento = document.getElementById('Terminals');
                miElemento.textContent = mi_terminal;

              
            })
            .catch(error => {

                alert("error " + error)
            })


    })






});




