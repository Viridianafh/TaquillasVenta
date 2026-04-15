
document.addEventListener('DOMContentLoaded', () => {


    const btn_buscar_ticket = document.getElementById('btn-buscar-ticket')
    btn_buscar_ticket.addEventListener('click', () => {
        btn_buscar_ticket.textContent = ""
        btn_buscar_ticket.textContent = "Escaneando..."
        document.getElementById('btn-buscar-ticket').disabled = true;

        var ticket = document.getElementById('input-ticket').value
        var userid = localStorage.getItem("id")

        fetch(`https://api-taquillas.sagautobuses.com/Home/EscanearBoleto?ticket=${ticket}&userid=${userid}`)
            .then(response => response.json())
            .then(data => {



                if (data.passenger_name == "") {
                    Swal.fire({
                        title: "Ocurrio un error",
                        text: `No Existe un pasajero con ese Boleto`,
                        icon: "error"
                    });

                    document.getElementById('nombre-pasajero-section').style.display = "none"
                    document.getElementById('btn-buscar-ticket').disabled = false;
                } else {
                    document.getElementById('nombre-pasajero-section').style.display = "block"
                    var nombre_pasajero = document.getElementById('nombre-pasajero')

                    nombre_pasajero.textContent = data.passenger_name
                    document.getElementById('btn-buscar-ticket').disabled = false;
                }


              
                btn_buscar_ticket.textContent = "Escanear"

            })
            .catch(error => {
                document.getElementById('btn-buscar-ticket').disabled = false;
                Swal.fire({
                    title: "Ocurrio un error",
                    text: `Mensaje de error: ${error}`,
                    icon: "error"
                });


            })



    })



})

