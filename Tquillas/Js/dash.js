document.addEventListener('DOMContentLoaded', (event) => {


    var miDato = localStorage.getItem('office_name');
    var miElemento = document.getElementById('Oficina');
    miElemento.textContent = miDato;

    var minombre = localStorage.getItem('name');
    var usuario = document.getElementById('usuario')
    usuario.textContent = minombre
    var mi_terminal = localStorage.getItem('terminal_name');
    var role = localStorage.getItem('rol')


    var contentcards = document.getElementById('contentcards')

        var card = document.createElement('div')
        var card2 = document.createElement('div')

    var rol = localStorage.getItem('rol')
    if (rol != 'admin-role') {
    } else {

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


    }
    


    if (mi_terminal === null || mi_terminal === "") {


        Swal.fire({
            title: "Mensaje!",
            text: `No hay una terminal asignada`,
            icon: "info"
        });


    } else {



        var miElemento = document.getElementById('Terminals');
        miElemento.textContent = mi_terminal;
    }
})