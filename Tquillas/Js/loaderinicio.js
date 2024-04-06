
window.addEventListener('load', () => {

    var ticket_user_id = localStorage.getItem('id')


    fetch(`http://apitaquillassag.dyndns.org/Home/comrpobarTerminal?ticket_user_id=${ticket_user_id}`)

        .then(response => response.json())
        .then(data => {

            console.log(data)

            var idterminal = data[0].id_terminal
            var terminal_name = data[0].terminal_nombre
            var officename = data[0].nombreoficina
            var idoficina = data[0].id_oficina

            localStorage.setItem('terminal_id', idterminal)
            localStorage.setItem('terminal_name', terminal_name)
         



         

                window.location.replace('/dash.aspx')

           
        })

        .catch(error => {

            console.log("error")
//replace() busca una cadena o un valor especificado y devuelve una cadena con los valores especificados reemplazados.
            window.location.replace('/dash.aspx')
        })




})

