
document.addEventListener('DOMContentLoaded', () => {


    const btn_buscar_ticket = document.getElementById('btn-buscar-ticket')
    btn_buscar_ticket.addEventListener('click', () => {
        btn_buscar_ticket.textContent = ""
        btn_buscar_ticket.textContent = "Buscando..."


        var ticket = document.getElementById('input-ticket').value

        fetch(`http://apitaquillassag.dyndns.org/Home/EscanearBoleto?ticket=${ticket}`)
            .then(response => response.json())
            .then(data => {



                if (data.passenger_name == "") {
                    Swal.fire({
                        title: "Ocurrio un error",
                        text: `No Existe un pasajero con ese Boleto`,
                        icon: "error"
                    });

                    document.getElementById('nombre-pasajero-section').style.display = "none"
                } else {
                    document.getElementById('nombre-pasajero-section').style.display = "block"
                    var nombre_pasajero = document.getElementById('nombre-pasajero')

                    nombre_pasajero.textContent = data.passenger_name

                }


               

                btn_buscar_ticket.textContent = "Buscar"

            })
            .catch(error => {

                Swal.fire({
                    title: "Ocurrio un error",
                    text: `Mensaje de error: ${error}`,
                    icon: "error"
                });


            })



    })



})

