Swal.fire({
    title: "Atención",

    text: 'Para realizar el cambio de boleto debes hacer la compra del nuevo boleto para poder sustituir el anterior por el nuevo',
    icon: "info"
});


document.addEventListener('DOMContentLoaded', ()=>{


    var btnbuscar = document.getElementById('btn-buscar')
        .addEventListener('click', async () => {

            var btnbuscar = document.getElementById('btn-buscar').textContent = "Buscando..."
            document.getElementById('btn-buscar').disabled = true

            var ticket = document.getElementById('boletoanterior').value
            var ticketdos = document.getElementById('boletonuevo').value
           
            const data1 = await BuscarBoletoUno(ticket)
            const data2 = await BuscarBoletoUno(ticketdos)

            CrearTablas(data1, 'tableticketviejo')
            CrearTablas(data2, 'tableticketnuevo')

            document.getElementById('btn-buscar').disabled = false
            document.getElementById('btn-buscar').textContent = "Buscar"
        })







    function CrearTablas(data, id) {

        var tabla = document.getElementById(`${id}`).getElementsByTagName('tbody')[0];
        var tr = document.createElement('tr');

        data.map(e => {

            tr.innerHTML = `
    
                    <td>${e.pasajero}</td>
                    <td>${e.origen}</td>
                    <td>${e.destino}</td>
                    <td>${e.asiento}</td>
                    <td>${e.precio}</td>
                    <td>${e.ticket}</td>
    
    
                    `;

            tabla.appendChild(tr)

        })

     
    }

})



async function BuscarBoletoUno(ticket) {
    try {
        const response = await fetch(`https://localhost:5001/Home/GetDataTicket?ticket=${ticket}`);

        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}


