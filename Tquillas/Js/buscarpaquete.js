



function Buscar() {
    document.getElementById("buscar_paq").disabled = true;
    var data = document.getElementById('codcompra').value;

    fetch(`https://api-taquillas.sagautobuses.com/Home/BuscarPaquete?ticket=${data}`)
        .then(res => res.json())
        .then(data => {
            var tabla = document.getElementById('tabledatos').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

            data.forEach(e => {
                var tr = document.createElement('tr');
                tr.innerHTML = `
                            <td>${e.TicketId}</td>
                            <td>${e.Concept}</td>
                            <td>${e.SenderName}</td>
                            <td>${e.SenderPhone}</td>
                            <td>${e.SenderEmail}</td>
                            <td>${e.ReceiverName}</td>
                            <td>${e.ReceiverPhone}</td>
                            <td>${e.Status}</td>
                        `;
                tabla.appendChild(tr);
            });
            document.getElementById("buscar_paq").disabled = false;
        })
        .catch(error => {
            document.getElementById("buscar_paq").disabled = false;
            alert("Hubo un error o no se encontró el boleto");
        });
}

function actualizar() {
    document.getElementById("guardar_paq").disabled = true;
    var status = document.getElementById('select-status-packagee').value
    var data = document.getElementById('codcompra').value;

    fetch(`https://api-taquillas.sagautobuses.com/Home/actualziarstatus?status=${status}&ticket=${data}`, {
        method: 'PATCH'
    })
        .then(response => {
            if (response.ok) {
                alert("Actualización exitosa");
            } else {
                alert("Error al actualizar el estado");
            }
            document.getElementById("guardar_paq").disabled = false;
        })
        .catch(error => {
            document.getElementById("guardar_paq").disabled = false;
            alert("Hubo un error en la solicitud");
        });
    }
