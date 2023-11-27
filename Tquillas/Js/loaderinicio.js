
window.addEventListener('load', () => {

    var ticket_user_id = localStorage.getItem('id')


    fetch(`https://localhost:5001/Home/comrpobarTerminal?ticket_user_id=${ticket_user_id}`)

        .then(response => response.json())
        .then(data => {



            var idterminal = data[0].id_terminal
            var terminal_name = data[0].terminal_nombre

            localStorage.setItem('terminal_id', idterminal)
            localStorage.setItem('terminal_name', terminal_name)


                window.location.replace('/index.aspx')
  
            
        })

        .catch(error => {

            console.log("error")
            window.location.replace('/index.aspx')
        })




})

