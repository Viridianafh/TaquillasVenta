document.addEventListener('DOMContentLoaded', (event) => {

    const button_Buscar = document.getElementById('button_Buscar')

    button_Buscar.addEventListener('click', () => {

        button_Buscar.textContent = ""
        button_Buscar.textContent = "Buscar"
        button_Buscar.classList.remove('btn-success')
        button_Buscar.classList.add('btn-primary')

        limpiarTabla()

        const row = document.getElementsByTagName('tbody')


        var Fecha_entrada= document.getElementById('fecha').value
        var Fecha_salida = document.getElementById('fecha2').value
        
        fetch(`http://192.168.0.245:82/Home/ListaDeViajes?fechainicio=${Fecha_entrada}&fechafinal=${Fecha_salida}`, {
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                var tbody = document.getElementsByTagName('tbody')[0]; // Get the first tbody element
                var alldata = data
                for (i = 0; i < alldata.length; i++) {
                    console.log(alldata[i].Ruta)


                    var tr = document.createElement('tr');  


                    tr.innerHTML = `
                           <td>${alldata[i].Corrida}</td>
                           <td>${alldata[i].Bus}</td>
                           <td>${alldata[i].origen_viaje}</td>
                           <td>${alldata[i].Destino}</td>
                           <td>${alldata[i].Departure}</td>

                           <div class=".boton-descarga">

  <a href="http://192.168.0.245:82/Home/MostrarListaAbordar?trip_id=3053f4f408046"  download="id.pdf" class="boton-descarga"> Descargar </a>
  
</div>
                       `;

                    tbody.appendChild(tr);

                }



                const liquidname = document.getElementById('table');


                document.getElementById('section-boletos').style.display = 'block';
                button_Buscar.textContent = "Buscar"  
                button_Buscar.classList.remove('btn-success')
                button_Buscar.classList.add('btn-primary')
            })
            .catch(error => console.error('Error al obtener o procesar los datos:', error));



    })


    function limpiarTabla() {
        var tabla = document.getElementById('listadeabordar');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
    }








})

