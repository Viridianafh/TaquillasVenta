


document.addEventListener('DOMContentLoaded', (event) => {



    localforage.getItem('office_name').then((value) => {
        console.log('Valor de office_name:', value);
        if (value !== null) {
            const oficina = document.getElementById('Oficina');
            if (oficina) {
                oficina.textContent = value;
                console.log('Oficina actualizada con:', value);
            } else {
                console.error('Elemento con ID "Oficina" no encontrado');
            }
        } else {
            console.log('office_name es null');
            Swal.fire({
                title: "Mensaje!",
                text: `No hay una oficina asignada`,
                icon: "info"
            });
        }
    }).catch(error => {
        console.error('Error al obtener office_name:', error);
        Swal.fire({
            title: "Mensaje!",
            text: `Error al acceder a los datos de oficina`,
            icon: "error"
        });
    });

    localforage.getItem("terminal_name").then(function (value) {
        console.log('Valor de terminal_name:', value);
        if (value !== null) {
            const terminals = document.getElementById('Terminals');
            if (terminals) {
                terminals.textContent = value;
                console.log('Terminals actualizado con:', value);
            } else {
                console.error('Elemento con ID "Terminals" no encontrado');
            }
        } else {
            console.log('terminal_name es null');
            Swal.fire({
                title: "Mensaje!",
                text: `No hay una terminal asignada`,
                icon: "info"
            });
        }
    }).catch(function (err) {
        console.error('Error al obtener terminal_name:', err);
        Swal.fire({
            title: "Mensaje!",
            text: `Error al acceder a los datos de la terminal`,
            icon: "error"
        });
    });







    var minombre = localStorage.getItem('name');
    var usuario = document.getElementById('usuario')
    usuario.textContent = minombre

 

    var contentcards = document.getElementById('contentcards')

        var card = document.createElement('div')
        var card2 = document.createElement('div')

  
    var rol = JSON.parse(localStorage.getItem('rol'));
    if (rol && rol.includes('admin-role')) {

        card.innerHTML =

            `
        
            <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
            
             <div>
                  <div>
                    <ion-icon name="tv-outline" style="font-size: 80px;"></ion-icon>
                    </div>
               </div>
                <div class="card-body">
                <h5 class="card-title"> Terminal </h5>
                       <p class="card-text">Cambia la configuracion de tu terminal</p>
                </div>
               <div class="card-footer"><a href="index.aspx">Ver</a></div>
            </div>

        `


        contentcards.appendChild(card)

        card2.innerHTML =
            `
        
              <div class="card text-light bg-dark mb-3" style="max-width: 18rem;">
             <div>
                  <div>
                       <ion-icon name="documents-outline"  style="font-size: 80px;"></ion-icon>
                    </div>
                    </div>
                <div class="card-body">
                <h5 class="card-title">Guias de viaje</h5>
                       <p class="card-text">generar e imprimir la guias de viajes </p>
                </div>
               <div class="card-footer"><a href="guias.aspx">Ver</a></div>
            </div>
            
            `
        contentcards.appendChild(card2)


    } else {

      

    }
    


    
   

})


