﻿document.addEventListener('DOMContentLoaded', (event) => {
    
    const button_Buscar = document.getElementById('button_Buscar')
    
    button_Buscar.addEventListener('click', () => {

        button_Buscar.textContent = ""
        button_Buscar.textContent = "Buscando..."
        button_Buscar.classList.remove('btn-primary')
        button_Buscar.classList.add('btn-success')

        limpiarTabla()

        const row = document.getElementsByTagName('tbody')


        var Fecha_entrada= document.getElementById('fecha').value
        var Fecha_salida = document.getElementById('fecha2').value

        fetch(`http://apitaquillassag.dyndns.org/Home/ListaDeViajes?fechainicio=${Fecha_entrada}&fechafinal=${Fecha_salida}`, {
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                var tbody = document.getElementsByTagName('tbody')[0]; // Get the first tbody element
                var alldata = data
                for (i = 0; i < alldata.length; i++) { 
                    console.log(alldata[i])


                    var tr = document.createElement('tr');  


                    tr.innerHTML = `

                           <td>${alldata[i].Corrida}</td>
                           <td>${alldata[i].Bus}</td>
                           <td>${alldata[i].origen_viaje}</td>
                           <td>${alldata[i].Destino}</td>
                           <td>${alldata[i].Departure}</td>    
                          
                           <div class=".boton-descarga" role="status">
                         <!-- <a href="http://192.168.0.245:82/Home/MostrarListaAbordar?trip_id=${alldata.trip_id}" download="id.pdf" class="boton-descarga">Descargar</a>-->
                         <button class="btn btn-dark" id="btn-showlist" onclick="verlista('${alldata[i].Id}')">Ver Lista</button>
                        
                            </div>

                   `;   
                   
                    tbody.appendChild(tr);

                }



                

                button_Buscar.textContent = ""
                button_Buscar.textContent = "Buscar"
                button_Buscar.classList.remove('btn-success')
                button_Buscar.classList.add('btn-primary')
            })
            .catch(error => {

                Swal.fire({
                    title: 'Error al traer los datos!',
                    text: `mensaje de error:(${error})`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })


                button_Buscar.textContent = ""
                button_Buscar.textContent = "Buscar"
                button_Buscar.classList.remove('btn-success')
                button_Buscar.classList.add('btn-primary')
            } );



    })


    function limpiarTabla() {
        var tabla = document.getElementById('listadeabordar');

        // Eliminar todas las filas excepto la primera (encabezados)
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }
    }



    const btn_atras_lista = document.getElementById("btn-atras-lista")
    btn_atras_lista.addEventListener('click', () => {


        document.getElementById('section-buscarlista').style.display = "block";
        document.getElementById('section-lista').style.display = "none"
        
    })




    const btn_descargar_lista = document.getElementById('btn-guardar-lista')
    btn_descargar_lista.addEventListener('click', () => {


        


        const tabla = document.getElementById('table-lista');

        // Configura las opciones para html2pdf
        const opciones = {
            margin: 10,
            filename: 'listadeabordar.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Utiliza html2pdf para generar el PDF y descargarlo
        html2pdf(tabla, opciones).from(tabla).save();


        Swal.fire({
            title: 'Descargando!',
            text: 'se esta descargando la lista',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    })


})





                
    function verlista(tripid) {


       
        limpiarTabla2()

        fetch(`http://apitaquillassag.dyndns.org/Home/MostrarListaAbordar?trip_id=${tripid}`)
            .then(response => response.json())
            .then(data => {

                var tbody = document.getElementById('table-lista').getElementsByTagName('tbody')[0];
                var tipo = "";
                data.forEach(e => {

                    if (e.Type == "ADULT") {
                        tipo = "Adulto"
                    } else if (e.Type == "CHILD") {
                        tipo = "Niño"
                    }
                    else if (e.Type == "OLDER_ADULT") {
                        tipo = "Adulto Mayor"
                    }
                    else if (e.Type == "STUDENT") {
                        tipo = "Estudiante"
                    }


                    var tr = document.createElement('tr')
                    tr.innerHTML = `
                    
                    <td>${e.Seat_number}</td>
                    <td>${e.Name}</td>
                    <td>${e.Origin}</td>
                    <td>${e.Destination}</td>
                    <td>${e.Ticket}</td>
                    <td>${tipo}</td>
                    <td>${e.IsScanned == "USED" ? "SI" : "NO"} </td>
                        
                    
                    `
                    tbody.appendChild(tr)

                    console.log(e)

                })

                document.getElementById('section-buscarlista').style.display = "none";
                document.getElementById('section-lista').style.display = "block"


     

            })
            .catch(error => {


                Swal.fire({
                    title: 'Error al traer los datos!',
                    text: `mensaje de error:(${error})`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
    }





function limpiarTabla2() {
    var tabla = document.getElementById('table-lista');

    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}





