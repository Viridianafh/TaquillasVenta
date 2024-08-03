var count_pasajeros = 0
var countadulto = 0
var precio_adulto = 0
var countnino = 0
var precionino = 0
var countinapam = 0
var precioinapam = 0
var countstudent = 0
var preciostudent = 0
var total = 0
var totalInapam = 4
var countasientos = 0;
var countpasajero = 1;
var countpasajerofinal = 1
precio_base = 0;
var ventasls = localStorage.getItem('venta_reciente')
var startdate = ""

localStorage.setItem("array_checkpoints", [])





document.addEventListener('DOMContentLoaded', () => {




    var fechaActual = new Date();

    // Formatear la fecha para que sea compatible con el atributo min de input type="date"  
    var fechaFormateada = fechaActual.toISOString().split('T')[0];


    //para los datos del remitente y destinatarios




    const tableBody = document.querySelector('#package-table tbody');
    const totalPriceElement = document.getElementById('total-price');

    const updateTotalPrice = () => {
        const rows = tableBody.querySelectorAll('tr');
        let total = 0;
        rows.forEach(row => {
            const price = parseFloat(row.querySelector('.precio').value) || 0;
            total += price;
        });
        totalPriceElement.textContent = total.toFixed(2);
        localStorage.setItem('TOTALPACKAGE', total)
    };

    document.getElementById('add-row').addEventListener('click', () => {
        const row = document.createElement('tr');

        row.innerHTML = `
                <td><input type="text" class="form-control descripcion"></td>
                <td><input type="text" class="form-control alto"></td>
                <td><input type="text" class="form-control ancho"></td>
                <td><input type="text" class="form-control largo"></td>
                <td><input type="text" class="form-control peso"></td>
                <td>
                    <select class="form-control embalaje">
    <option value="2071150e-088d-4764-8b70-c13cff3c2379">Bidones (Tambores) de Acero 1 de tapa no desmontable</option>
    <option value="3092251e-199e-5875-9c81-d24eff4d348a">Bidones (Tambores) de Acero 1 de tapa desmontable</option>
    <option value="4103352e-2aae-6986-ad92-e35fff5e459b">Bidones (Tambores) de Aluminio de tapa no desmontable</option>
    <option value="5114453e-3bbf-7a97-bea3-f46fff6f56ac">Bidones (Tambores) de Aluminio de tapa desmontable</option>
    <option value="6125554e-4cd0-8ba8-cfb4-g57fff7g67bd">Bidones (Tambores) de Madera contrachapada</option>
    <option value="7136655e-5de1-9cb9-dgc5-h68fff8h78ce">Bidones (Tambores) de Cartón</option>
    <option value="8147756e-6ef2-adea-ehd6-i79fff9i89df">Bidones (Tambores) de Plástico de tapa no desmontable</option>
    <option value="9158857e-7fg3-befb-fie7-j80fffaj90eg">Bidones (Tambores) de Plástico de tapa desmontable</option>
    <option value="a1699661-8gh4-cfgc-gjf8-k91fffck01fh">Bidones (Tambores) de Metal que no sea acero ni aluminio de tapa no desmontable</option>
    <option value="b27a0765-9hi5-dhhd-hkg9-l02fffdl12gi">Bidones (Tambores) de Metal que no sea acero ni aluminio de tapa desmontable</option>
    <option value="c38b1869-ajj6-eiej-ilha-m13fffem23hj">Jerricanes (Porrones) de Acero de tapa no desmontable</option>
    <option value="d49c296d-bkk7-fjfk-jmib-n24ffgfn34ik">Jerricanes (Porrones) de Acero de tapa desmontable</option>
    <option value="e50d3a71-cll8-gklg-knjc-o35ffhgo45jl">Jerricanes (Porrones) de Aluminio de tapa no desmontable</option>
    <option value="f61e4b75-dmm9-hmlh-lokd-p46ffihp56km">Jerricanes (Porrones) de Aluminio de tapa desmontable</option>
    <option value="g72f5c79-enn1-inmi-mplf-q57ffjip67ln">Jerricanes (Porrones) de Plástico de tapa no desmontable</option>
    <option value="h83g6d83-foo2-jnoj-nqmg-r68ffkjq78mo">Jerricanes (Porrones) de Plástico de tapa desmontable</option>
    <option value="i94h7e87-gpp3-kopk-ornh-s79fflkq89np">Cajas de Acero</option>
    <option value="j05i8f91-hqq4-lplm-psoi-t80ffmlr90oq">Cajas de Aluminio</option>
    <option value="k16j9g95-irr5-mqmj-qtph-u91ffnms01pr">Cajas de Madera natural ordinaria</option>
    <option value="l27k0h99-jss6-nrnk-rupi-v02ffont12qs">Cajas de Madera natural de paredes a prueba de polvos (estancas a los pulverulentos)</option>
    <option value="m38l1i03-ktt7-osol-svqj-w13ffopt23rt">Cajas de Madera contrachapada</option>
    <option value="n49m2j07-luu8-ptpm-twrk-x24ffpqu34su">Cajas de Madera reconstituida</option>
    <option value="o50n3k11-mvv9-quqn-usxl-y35ffqrv45tv">Cajas de Cartón</option>
    <option value="p61o4l15-nww0-rvro-vtym-z46ffrsw56uw">Cajas de Plástico Expandido</option>
    <option value="q72p5m19-oxx1-swsp-wuzn-107fgrtx67vx">Cajas de Plástico Rígido</option>
    <option value="r83q6n23-pyy2-txtq-xv0o-218fgsuy78wy">Sacos (Bolsas) de Tejido de plástico sin forro ni revestimientos interiores</option>
    <option value="s94r7o27-qzz3-uyur-yw1p-329fhtvz89xz">Sacos (Bolsas) de Tejido de plástico a prueba de polvos (estancos a los pulverulentos)</option>
    <option value="t05s8p31-raa4-vzvs-zx2q-430fiuwa90y0">Sacos (Bolsas) de Tejido de plástico resistente al agua</option>
    <option value="u16t9q35-sbb5-wawb-zy3r-541fjvxb01z1">Sacos (Bolsas) de Película de plástico</option>
    <option value="v27u0r39-tcc6-xbxc-0a4s-652gkvyc12a2">Sacos (Bolsas) de Tela sin forro ni revestimientos interiores</option>
    <option value="w38v1s43-udd7-ycyd-1b5t-763hlwzd23b3">Sacos (Bolsas) de Tela a prueba de polvos (estancos a los pulverulentos)</option>
    <option value="x49w2t47-vee8-zdze-2c6u-874imxae34c4">Sacos (Bolsas) de Tela resistentes al agua</option>
    <option value="y50x3u51-wff9-0e0f-3d7v-985jnxbf45d5">Sacos (Bolsas) de Papel de varias hojas</option>
    <option value="z61y4v55-xgg0-1f1g-4e8w-096kozcg56e6">Sacos (Bolsas) de Papel de varias hojas, resistentes al agua</option>
    <option value="071z5w59-yhh1-2g2h-5f9x-1a7lpydh67f7">Envases y embalajes compuestos de Recipiente de plástico, con bidón (tambor) de acero</option>
    <option value="182a6x63-zij2-3h3i-6g0y-2b8mqzei78g8">Envases y embalajes compuestos de Recipiente de plástico, con una jaula o caja de acero</option>
    <option value="293b7y67-0jk3-4i4j-7h1z-3c9nraej89h9">Envases y embalajes compuestos de Recipiente de plástico, con un bidón (tambor) exterior de aluminio</option>
    <option value="3a4c8z71-1kl4-5j5k-8i2a-4d0osbfk90i0">Envases y embalajes compuestos de Recipiente de plástico, con una jaula o caja de aluminio</option>
    <option value="4b5d9a75-2lm5-6k6l-9j3b-5e1ptcgl01j1">Envases y embalajes compuestos de Recipiente de plástico, con una caja de madera</option>
    <option value="5c6e0b79-3mn6-7l7m-ak4c-6f2qudhm12k2">Envases y embalajes compuestos de Recipiente de plástico, con un bidón (tambor) de madera contrachapada</option>
    <option value="6d7f1c83-4no7-8m8n-bl5d-7g3rvein23k2">Envases y embalajes compuestos de Recipiente de plástico, con una caja de madera contrachapada</option>
    <option value="7e8g2d87-5op8-9n9o-cm6e-8h4swfjk34m4">Envases y embalajes compuestos de Recipiente de plástico, con un bidón (tambor) de cartón</option>
    <option value="8f9h3e91-6pq9-0o0p-dn7f-9i5txgkl45n5">Envases y embalajes compuestos de Recipiente de plástico, con una caja de cartón</option>
    <option value="901i4f95-7qr0-1p1q-eo8g-0j6uyhlm56o6">Envases y embalajes compuestos de Recipiente de plástico, con un bidón (tambor) de plástico</option>
    <option value="a12j5g99-8rs1-2q2r-fp9h-1k7vzimn67p7">Envases y embalajes compuestos de Recipiente de plástico, con caja de plástico rígido</option>
    <option value="b23k6h03-9st2-3r3s-gq0i-2l8wanjo78q8">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con un bidón (tambor) de acero</option>
    <option value="c34l7i07-0tu3-4s4t-hr1j-3m9xbojp89r9">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con una jaula o una caja de acero</option>
    <option value="d45m8j11-1uv4-5t5u-is2k-4n0ycpkq90s0">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con un bidón (tambor) exterior de aluminio</option>
    <option value="e56n9k15-2vw5-6u6v-jt3l-5o1zdqlr01t1">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con una jaula o una caja de aluminio</option>
    <option value="f67o0l19-3wx6-7v7w-ku4m-6p2aerms12u2">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con una caja de madera</option>
    <option value="g78p1m23-4xy7-8w8x-lv5n-7q3bfstn23v3">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con bidón (tambor) de madera contrachapada</option>
    <option value="h89q2n27-5yz8-9x9y-mw6o-8r4cguto34w4">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con canasta de mimbre</option>
    <option value="i90r3o31-6za9-0y0z-nx7p-9s5dhvup45x5">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con un bidón (tambor) de cartón</option>
    <option value="j01s4p35-7ab0-1z1a-oy8q-0t6eiwvq56y6">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con una caja de cartón</option>
    <option value="k12t5q39-8bc1-2a2b-pz9r-1u7fjxwr67z7">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con un envase y embalaje de plástico expandido</option>
    <option value="l23u6r43-9cd2-3b3c-q0as-2v8gkyxs78a8">Envases y embalajes compuestos de Recipiente de vidrio, porcelana o de gres, con un envase y embalaje de plástico rígido</option>
    <option value="m34v7s47-0de3-4c4d-r1bt-3w9hlzyt89b9">Bultos de Plástico</option>
    <option value="n45w8t51-1ef4-5d5e-s2cu-4x0imazu90c0">Bultos de Tela</option>
    <option value="o56x9u55-2fg5-6e6f-t3dv-5y1jncav01d1">No aplica</option>
</select>
                </td>
                <td><input type="text" class="form-control precio"></td>
                <td><button class="btn btn-danger btn-sm delete-button">Eliminar</button></td>
            `;

        tableBody.appendChild(row);

        row.querySelector('.precio').addEventListener('input', updateTotalPrice);

        // Añadir el evento de clic al botón de eliminar
        row.querySelector('.delete-button').addEventListener('click', () => {
            row.remove();
            updateTotalPrice();
        });

        updateTotalPrice();
    });

    document.getElementById('show-json').addEventListener('click', () => {
        



        var monto_ingresado = document.getElementById('monto-paquete').value



        var totalText = document.getElementById('total-price').textContent;

        var total = parseFloat(totalText);

    


        if (monto_ingresado < total) {

            alert("EL monto DEBE SER MAYOR a la venta")

        } else {
            const rows = tableBody.querySelectorAll('tr');
            const data = Array.from(rows).map(row => {
                return {
                    descripcion: row.querySelector('.descripcion').value.trim(),
                    alto: row.querySelector('.alto').value.trim(),
                    ancho: row.querySelector('.ancho').value.trim(),
                    largo: row.querySelector('.largo').value.trim(),
                    peso: row.querySelector('.peso').value.trim(),
                    embalaje: row.querySelector('.embalaje').value,
                    precio: row.querySelector('.precio').value.trim()
                };
            });

            document.getElementById('json-output').textContent = JSON.stringify(data, null, 2);
            localStorage.setItem("PACKAGES", JSON.stringify(data))



            // Crear el objeto combinado
            const datosViajeJSON = localStorage.getItem('datos_viaje');
            const remidesJSON = localStorage.getItem('REMIDES');
            const packagesJSON = localStorage.getItem('PACKAGES');

            // Crear el objeto combinado



            var shiftnumber = localStorage.getItem('shift_number')

            var num_ventas = localStorage.getItem('num_ventas')

            var numero = parseInt(num_ventas)

            numero = numero + 1


            localStorage.setItem('num_ventas', numero.toString())




            const json = JSON.stringify(rows);






            var shift_number_to_is = shiftnumber + "-" + numero
            alert(shift_number_to_is)


            var lista_ventas = localStorage.getItem("array_ventas")

            var lista_ventasstr = lista_ventas ? JSON.parse(lista_ventas) : [];

            // Añadir el nuevo valor al array
            lista_ventasstr.push(shift_number_to_is);

            // Convertir la lista actualizada a cadena y almacenarla en localStorage
            localStorage.setItem("array_ventas", JSON.stringify(lista_ventasstr));







            const combinedData = {
                datosViaje: JSON.parse(datosViajeJSON),
                remides: JSON.parse(remidesJSON),
                packages: JSON.parse(packagesJSON),
                totalPackage: localStorage.getItem('TOTALPACKAGE'),
                userid: localStorage.getItem('id'),
                saleshift: shift_number_to_is,
                PaymentType: "cash",
                salesmanId: localStorage.getItem('id'),
                CashCheckpoint: "",
                salesterminal: localStorage.getItem('terminal_id'),
                saleshiftid: localStorage.getItem('saleshift_id'),
                isaleid: "",
                shortid: "",



            };
            fetch('http://apitaquillassag.dyndns.org/Home/insertarpackage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(combinedData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    var venta_reciente = localStorage.getItem('venta_reciente');
                    if (venta_reciente === null) {
                        console.error('No se encontró venta_reciente en localStorage');
                        venta_reciente = '0'; // Puedes inicializarlo con 0 si es necesario
                    }

                    var ventareciente = parseFloat(venta_reciente);
                    if (isNaN(ventareciente)) {
                        console.error('venta_reciente no es un número válido');
                        ventareciente = 0; // Puedes inicializarlo con 0 si es necesario
                    }

                    // Asegúrate de que monto_ingresado y total sean números válidos
                    if (isNaN(monto_ingresado) || isNaN(total)) {
                        console.error('monto_ingresado o total no son números válidos');
                        return; // Detén la ejecución si hay un error
                    }

             


                    
                        var restante = total;
                        var totalventareciente = ventareciente + restante;
                        localStorage.setItem('venta_reciente', totalventareciente);

                        console.log('venta_reciente actualizado a:', totalventareciente);
                    
                  
                    var isaleid = data.isaleid;

                    window.location.href = "detallepaquete.aspx?isaleid=" + isaleid;
                })
                .catch((error) => {

                    // Revertir cambios en caso de error
                    var num_ventas = localStorage.getItem('num_ventas');
                    var numero = parseInt(num_ventas);

                    numero = numero - 1;
                    localStorage.setItem('num_ventas', numero.toString());

                    var venta_total = parseFloat(localStorage.getItem('venta_total') || '0');
                    var totalText = document.getElementById('total-price').textContent;
                    var total = parseFloat(totalText);

                    venta_total -= total;
                    localStorage.setItem('venta_total', venta_total.toString());

                    var lista_ventas = localStorage.getItem("array_ventas");
                    var lista_ventasstr = lista_ventas ? JSON.parse(lista_ventas) : [];


                    var totalventareciente = ventareciente - restante
                    localStorage.setItem('venta_reciente', totalventareciente)

                    if (lista_ventasstr.length > 0) {
                        lista_ventasstr.pop();
                        localStorage.setItem("array_ventas", JSON.stringify(lista_ventasstr));
                    }

                    console.log('Venta revertida');
                    console.log('Venta Total:', venta_total);
                    console.log('Ventas Array:', lista_ventasstr);
                    console.error(error)
                });

            console.log(combinedData);

        }


    });




    document.getElementById('next-button').addEventListener('click', () => {
        const remitenteFields = [
            'nombre-remitente',
            'direccion-remitente',
            'phone-remitente',
            'correo-remitente'
        ];

        const destinatarioFields = [
            'nombre-destinatario',
            'direccion-destinatario',
            'phone-destinatario',
            'correo-destinatario'
        ];

        let allFilled = true;

        remitenteFields.concat(destinatarioFields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field.value.trim() === '') {
                allFilled = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        if (allFilled) {
            const remitenteData = {};
            const destinatarioData = {};

            remitenteFields.forEach(fieldId => {
                remitenteData[fieldId.replace('remitente', '')] = document.getElementById(fieldId).value;
            });

            destinatarioFields.forEach(fieldId => {
                destinatarioData[fieldId.replace('destinatario', '')] = document.getElementById(fieldId).value;
            });

            const formData = {
                remitente: remitenteData,
                destinatario: destinatarioData
            };

            const jsonFormData = JSON.stringify(formData);
            console.log(jsonFormData);

            localStorage.setItem('data_clientes-paquetes', JSON.stringify(jsonFormData))
          
            // Aquí puedes agregar la lógica para proceder a la siguiente página o acción


            const remides = {

                 "NombreRemitente":document.getElementById('nombre-remitente').value,
                 "DireccionRemitente":  document.getElementById('direccion-remitente').value,
                 "PhoneRemitente": document.getElementById('phone-remitente').value,
                 "CorreoRemitente": document.getElementById('correo-remitente').value,
                 "NombreDestinatario": document.getElementById('nombre-destinatario').value,
                 "DireccionDestinatario": document.getElementById('direccion-destinatario').value,
                 "PhoneDestinatario": document.getElementById('phone-destinatario').value,
                 "CorreoDestinatario": document.getElementById('correo-destinatario').value
            }

            localStorage.setItem("REMIDES", JSON.stringify(remides))

            document.getElementById('data-clients').style.display = "none"
            document.getElementById('sectionpackage-data').style.display = "block"

        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    document.getElementById('back-button').addEventListener('click', () => {
        const allFields = [
            'nombre-remitente',
            'direccion-remitente',
            'phone-remitente',
            'correo-remitente',
            'nombre-destinatario',
            'direccion-destinatario',
            'phone-destinatario',
            'correo-destinatario'
        ];

        allFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            field.value = '';
            field.classList.remove('is-invalid');
        });

        alert('Los campos han sido limpiados. Retrocediendo a la página anterior.');
        // Aquí puedes agregar la lógica para retroceder a la página anterior


        document.getElementById('content-buscador').style.display = "block"
        document.getElementById('section-boletos').style.display = "block"
        document.getElementById('data-clients').style.display = "none"


    });







    var totaldelaventa = localStorage.getItem('venta_reciente')
    if (parseFloat(totaldelaventa) >= 3000) {
        Swal.fire({
            title: "Has llegado al maximo en tu caja",

            text: 'Debes realizar el corte',
            icon: "info"
        });

        document.getElementById('section-precorte').style.display = "block"
        document.getElementById('section-iniciar').style.display = "none"
        document.getElementById('totalprecorte').textContent = totaldelaventa.toString()

    } else {

        var ventas = localStorage.getItem('num_ventas')
        var numeroVentas = parseInt(ventas)
        if (numeroVentas >= 1) {


            if (localStorage.getItem('id') != null && localStorage.getItem('office_location_id') != null) {

                iniciarturno()

            } else {
                Swal.fire({
                    title: "Error",
                    text: 'Debes Tener una terminal asignada para poder empezar tu turno',
                    icon: "info"
                });
                document.getElementById('section-iniciar').style.display = "none"

            }

        }


    }




    const btn_retirar_precorte = document.getElementById('btn-retirar-precorte')
    btn_retirar_precorte.addEventListener('click', () => {



        var saleshift = localStorage.getItem('saleshift_id')
        var monto = document.getElementById('monto-precorte').value
        var monto_retirar = parseFloat(monto)



        if (monto_retirar <= 0) {

            alert("no puedes  retirar esta cantidad")
            var ventas = localStorage.getItem('array_ventas')
            var arrayventas = JSON.parse(ventas)
            console.log(arrayventas)


        } else {


            var venta = localStorage.getItem('venta_reciente')
            var venta_reciente = parseFloat(venta)

            var sobrante = venta_reciente - monto_retirar


            const CashCheckpoint = {

                sale_shift_id: saleshift,
                previous_amount: monto_retirar,
                new_amount: sobrante

            }


            fetch('http://apitaquillassag.dyndns.org/Home/Precorte', {

                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(CashCheckpoint)

            })
                .then(response => response.text())
                .then(data => {

                    if (data.length <= 6) {



                        Swal.fire({
                            title: "Error!",
                            text: `${error}`,
                            icon: "error"
                        });




                        window.locarion.reload()

                    } else {



                        localStorage.setItem('cashcheckpoint', data);

                        var cashcheckpoint = localStorage.getItem('cashcheckpoint');

                        var salesnumberArray = JSON.parse(localStorage.getItem('array_ventas')) || [];

                        let Saleshift = salesnumberArray.map(salesnumber => {
                            return {
                                salesnumber: salesnumber
                            };
                        });

                        console.log(Saleshift);



                        fetch(`http://apitaquillassag.dyndns.org/Home/agregarCashCheckpoint?cashcheck=${cashcheckpoint}`, {

                            method: 'PATCH',
                            headers: {
                                'Accept': 'text/plain',
                                'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
                            },
                            body: JSON.stringify(Saleshift)

                        })
                            .then(response => response.text())
                            .then(data => {



                                if (data == "Operación exitosa") {
                                    Swal.fire({
                                        title: "Puedes Continuar!",
                                        text: `se abre de nevo la caja`,
                                        icon: "success"
                                    });


                                    location.href = "informePrecorte.aspx"

                                    if (ventasls < 3000) {

                                    } else {

                                        localStorage.setItem('venta_reciente', sobrante.toString())

                                    }


                                } else {


                                    Swal.fire({
                                        title: "Error!",
                                        text: `Hubo un error`,
                                        icon: "error"
                                    });

                                }

                            }).catch(error => {

                                Swal.fire({
                                    title: "Error!",
                                    text: `Hubo un error: mensaje ${error}`,
                                    icon: "error"
                                });

                            })
                    }
                }).catch(error => {

                    Swal.fire({
                        title: "Error!",
                        text: `Hubo un error: mensaje ${error}`,
                        icon: "error"
                    });

                })
        }
    })





    var totalorasi = 0
    totalStudent = 6



    const btnIniciar = document.getElementById("button_iniciar")
    btnIniciar.addEventListener('click', () => {


        localStorage.setItem('num_ventas', 0)
        iniciarturno()

    })




    const btnprecorte = document.getElementById('button_precorte')
    btnprecorte.addEventListener('click', () => {



        var dataventareciente = localStorage.getItem('venta_reciente');

        var totaprecorte = document.getElementById('totalprecorte');
        totaprecorte.textContent = dataventareciente;


        document.getElementById('section-precorte').style.display = 'block'
        document.getElementById('section-iniciar').style.display = 'none'



    })




    const button_cerrar_caja = document.getElementById('button_cerrar_caja')
    button_cerrar_caja.addEventListener('click', () => {

        var saleshiftid = localStorage.getItem('saleshift_id')
        var montoprevio = localStorage.getItem('venta_reciente')
        var monto = parseFloat(montoprevio)


        if (monto < 3000 && monto > 0) {

            CerrarCajamenor()

        } else if (monto == 0) {
            CerrarCajavacia()
        }

        else {


            var CashCheckpoint = {

                sale_shift_id: saleshiftid,
                previous_amount: monto,
                new_amount: 0.0
            };
        }


    })





    const btn_trip = document.getElementById('btn-trip')

    btn_trip.addEventListener('click', () => {

        btn_trip.textContent = ""
        btn_trip.disabled = true;
        btn_trip.textContent = "Buscando..."
        btn_trip.classList.remove('btn-primary')
        btn_trip.classList.add('btn-outline-primary')


        limpiarTablaViaje()

        const row = document.getElementsByTagName('tbody')



        var Origen = document.getElementById('origen')
        Origen = Origen.options[Origen.selectedIndex].text;

        var Destino = document.getElementById('destino')
        Destino = Destino.options[Destino.selectedIndex].text;

        var Fecha_salida = document.getElementById('fecha').value
        startdate = Fecha_salida;

        const Viaje = {

            "origen": Origen,
            "destino": Destino,
            "fechaSalida": Fecha_salida,

        }


        console.log(JSON.stringify(Viaje))


        fetch(`http://apitaquillassag.dyndns.org/Home/BuscarCorridas?origen=${Viaje.origen}&destino=${Viaje.destino}&fecha=${Viaje.fechaSalida}`, {

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                if (data.length == 0) {
                    btn_trip.classList.add('btn-primary')

                    btn_trip.disabled = false;
                    btn_trip.textContent = "Buscar viaje"

                    Swal.fire({
                        title: 'Error!',
                        text: 'No existen viajes. Prueba para otra fecha u otro destino',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                }

                var tbody = document.getElementsByTagName('tbody')[0]; // Get the first tbody element
                var alldata = data
                var addedTripIds = {};


                for (i = 0; i < alldata.length; i++) {
                    console.log(alldata[i].Corrida)



                    var tr = document.createElement('tr');


                    var id = alldata[i].tripID
                    var corrida = alldata[i].NombreCorrida
                    var tipo = alldata[i].TipoServicio
                    var type = alldata[i].TipoServicio
                    var origen = alldata[i].Origen
                    var destino = alldata[i].Destino
                    var bus = alldata[i].Bus
                    var departingOrigen = alldata[i].origencorridabuscada
                    var departingDestino = alldata[i].llegadacorridabuscada
                    var precio = alldata[i].Precio
                    var Arrival = alldata[i].Arrival
                    var Departure = alldata[i].Departure
                    var RunId = alldata[i].RunId
                    var totaltime = alldata[i].totaltime





                    // Convertir la cadena de fecha y hora en un objeto de fecha de JavaScript
                    var fechayhorasalida = new Date(departingOrigen);
                    var fechayhorallegada = new Date(departingDestino);
                    var horaActual = new Date();


                    // Obtener la hora ajustada
                    var horaAjustada = fechayhorasalida.toLocaleTimeString();
                    var horaAjustadallegada = fechayhorallegada.toLocaleTimeString();

                    // Crear strings para fecha y hora ajustadas
                    var fechaYHoraSalida = fechayhorasalida.toLocaleDateString() + ' ' + horaAjustada;
                    var fechaYHoraLlegada = fechayhorallegada.toLocaleDateString() + ' ' + horaAjustadallegada;


                    console.log("Hora ajustada:", horaAjustada);


                    if (tipo == "premium-id") {
                        tipo = "Primera"
                    }
                    else if (tipo == "normal-id") {
                        tipo = "Plus"
                    }
                    else if (tipo == "de5a7752-a52c-41b0-a01e-99d51f73abde") {
                        tipo = "Básico"
                    }


                    var fechaYHoraSalida = fechayhorasalida.toLocaleString();
                    var fechaYHoraLlegada = fechayhorallegada.toLocaleString();




                    tr.innerHTML = `


                               <td>${corrida}</td>
                               <td>${tipo}</td>
                               <td>${origen}</td>
                               <td>${destino}</td>
                               <td>${bus == null ? '' : bus}</td >
                               <td>${departingOrigen}</td>
                               <td>${departingDestino}</td>
                               
                               <td>
                                  <button 
                                        class="btn btn-primary"     
                                        id="comprar" 
                                        value="${alldata[i].TripId}" 
                                        onclick="Comprar('${id}', '${corrida}', '${tipo}', '${origen}', '${destino}','${bus}','${departingOrigen}','${departingDestino}','${precio}',  '${Arrival}', '${Departure}', '${RunId}', ${totaltime}, '${type}'   )">
                                        Comprar
                                  </button>
                               </td>

                           `;

                    tbody.appendChild(tr);
                    addedTripIds[id] = true;


                }


                const liquidname = document.getElementById('table');



                document.getElementById('section-boletos').style.display = 'block';
                btn_trip.textContent = "Busar viaje"

                btn_trip.classList.remove('btn-outline-primary')
                btn_trip.classList.add('btn-success')
                setTimeout(() => {
                    btn_trip.classList.remove('btn-success')
                    btn_trip.classList.add('btn-primary')
                    btn_trip.disabled = false;


                }, "2000");



            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "error"
                });
            });


    })







    //pagos en efectivo







})






//fin DOMcontent loaded

async function Comprar(id, corrida, tipo, origen, destino, bus, departin_origen, departing_destino, precio, Arrival, Departure, RunId, totaltime, type) {



    console.log("Iniciando agregado de datos")

    if (id == "") {

        id = await gettripid(RunId, type, Departure, Arrival, totaltime)

    }

    var datos_viaje = {

        "id": id,
        "corrida": corrida,
        "tipo": tipo,
        "origen": origen,
        "destino": destino,
        "bus": bus,
        "departingOrigen": departin_origen,
        "departingDestino": departing_destino,
        "precio": precio,
        "arrival": Arrival,
        "Departure": Departure,
        "RunId": RunId,
        "TotalTIme": totaltime

    }

    var Datos_Viaje = JSON.stringify(datos_viaje)

    localStorage.setItem("datos_viaje", Datos_Viaje)




    document.getElementById('content-buscador').style.display = "none"
    document.getElementById('section-boletos').style.display = "none"
    document.getElementById('data-clients').style.display = "block"






}

function limpiarTablaViaje() {
    var tabla = document.getElementById('tabla-viajes');

    // Eliminar todas las filas excepto la primera (encabezados)
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

async function gettripid(RunId, type, Departure, Arrival, totaltime) {
    try {
        const response = await fetch(`http://apitaquillassag.dyndns.org/Home/AgregarTrip?runid=${RunId}&service=${type}&departure=${Departure}&arriveDate=${Arrival}&totalTime=${totaltime}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('La solicitud falló');
        }

        const data = await response.text();
        console.log("Respuesta:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}





function agregaratabla(elemt) {
    // Obtener el primer elemento vacío
    for (var i = 1; ; i++) {
        var dato = document.getElementById(`asientoparapasajero${i}`);
        if (!dato) {
            // Si no se encuentra ningún elemento con ese id, se detiene la búsqueda
            break;
        }
        if (!dato.textContent.trim()) {
            // Si el contenido está vacío, se establece el contenido y se actualiza el contador
            dato.textContent = elemt;
            return; // Salir de la función después de agregar el contenido
        }
    }
    // Si no se encontraron elementos vacíos, se crea uno nuevo
    var newElement = document.createElement("div");
    newElement.id = `asientoparapasajero${i}`;
    newElement.textContent = elemt;
    document.body.appendChild(newElement);

}

function quitartabla(element) {
    // Decrementar countpasajerofinal
    countpasajerofinal--;

    for (var i = 1; ; i++) {
        var elemento = document.getElementById('asientoparapasajero' + i);
        if (!elemento) {
            break;
        }

        if (elemento.textContent.trim() === element.trim()) {
            elemento.textContent = '';
            return; // Salir de la función después de eliminar el contenido
        }
    }
}




function procesardatosViaje() {

    var tabla = document.getElementById("tabla-pasajeros")

    var filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');


    var datos = [];

    for (var i = 0; i < filas.length; i++) {
        var fila = filas[i];
        var celdas = fila.getElementsByTagName('td');


        var filaDatos = {};


        for (var j = 0; j < celdas.length; j++) {

            var columna = tabla.rows[0].cells[j].innerHTML;
            var valor = celdas[j].innerHTML;


            filaDatos[columna.toLowerCase()] = valor;
        }


        datos.push(filaDatos);
    }


    var jsonDatos = JSON.stringify(datos, null, 2);
    localStorage.setItem('DATAISALE', jsonDatos)




}


function iniciarturno() {


    var userId = localStorage.getItem('id');
    var userName = localStorage.getItem('name');
    var lastname = localStorage.getItem('last_name')
    var officeLocationId = localStorage.getItem('office_location_id');
    var nombre_terminal = localStorage.getItem('terminal_name')
    var id_terminal = localStorage.getItem('terminal_id')
    var oficina = localStorage.getItem('office_name')
    var selectOrigen = document.getElementById("origen");


    var clave = "shift_number";


    if (localStorage.getItem(clave) == null) {


        var terminal = "";
        var office = "";

        var terminalid = "";
        var officeid = "";

        localforage.getItem('terminal_name')
            .then(function (value) {
                // Se ejecuta después de que el valor haya sido recuperado
                console.log('Terminal Name recuperado:', value);

                terminal = value
            }).catch(function (err) {
                // Manejo de errores
                console.error('Error al recuperar el Terminal Name:', err);
            });


        localforage.getItem('office_name')
            .then(function (value) {
                // Se ejecuta después de que el valor haya sido recuperado
                console.log('Terminal Name recuperado:', value);

                office = value
            }).catch(function (err) {
                // Manejo de errores
                console.error('Error al recuperar el Terminal Name:', err);
            });




        localforage.getItem('office_location_id')
            .then(function (value) {
                // Se ejecuta después de que el valor haya sido recuperado
                console.log('Terminal Name recuperado:', value);

                officeid = value
            }).catch(function (err) {
                // Manejo de errores
                console.error('Error al recuperar el Terminal Name:', err);
            });


        localforage.getItem('terminal_id')
            .then(function (value) {
                // Se ejecuta después de que el valor haya sido recuperado
                console.log('Terminal Name recuperado:', value);

                terminalid = value
            }).catch(function (err) {
                // Manejo de errores
                console.error('Error al recuperar el Terminal Name:', err);
            });

        var clave = "shift_number";


        if (localStorage.getItem(clave) == null) {


            var terminal = "";
            var office = "";
            var terminalid = "";
            var officeid = "";

            Promise.all([
                localforage.getItem('terminal_name'),
                localforage.getItem('office_name'),
                localforage.getItem('office_location_id'),
                localforage.getItem('terminal_id')
            ]).then(function (values) {
                terminall = values[0];
                officee = values[1];
                officeidd = values[2];
                terminalidd = values[3];

                localStorage.setItem("terminal_name", terminall)
                localStorage.setItem("terminal_id", terminalidd)
            }).catch(function (err) {
                console.error('Error al recuperar datos:', err);
            });

            var clave = "shift_number";


            if (localStorage.getItem(clave) == null) {



                fetch(`http://apitaquillassag.dyndns.org/Home/iniciar turno?iduser=${userId}&user_name=${userName}&locationid=${officeidd}&terminal=${terminalidd}&office_name=${officee}&terminal_name=${terminall}`)
                    .then(response => response.json())
                    .then(data => {


                        console.log(data.shift)
                        localStorage.setItem('shift_number', data.shift)
                        localStorage.setItem('saleshift_id', data.saleShift)



                        const url = `http://apitaquillassag.dyndns.org/Home/descargar?url=${data.url}`;


                        fetch(url)
                            .then(response => {

                                if (!response.ok) {
                                    throw new Error(`Error al descargar el archivo. Código de estado: ${response.status}`);
                                }


                                return response.blob();
                            })
                            .then(blob => {

                                const blobUrl = URL.createObjectURL(blob);


                                const link = document.createElement('a');
                                link.href = blobUrl;

                                link.download = 'apertura de caja';


                                document.body.appendChild(link);


                                link.click();


                                document.body.removeChild(link);
                            })
                            .catch(error => {
                                console.error(error);

                            });

                    })

                Swal.fire({
                    title: "Mensaje!",
                    text: `puedes iniciar con la venta`,
                    icon: "success"
                });

                var arrayventas = []

                localStorage.setItem("array_ventas", arrayventas)

                localStorage.setItem('venta_reciente', 0)

            } else {

            }


            fetch('http://apitaquillassag.dyndns.org/Home/Origen', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify('')
            })
                .then(response => response.json())
                .then(data => {
                    var selectOrigen = document.getElementById('origen');


                    while (selectOrigen.options.length > 1) {
                        selectOrigen.remove(1);
                    }

                    data.forEach(option => {
                        var newOption = document.createElement("option");
                        newOption.value = option.id;
                        newOption.text = option.name;
                        selectOrigen.appendChild(newOption);
                    });
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                });


            var selectOrigen = document.getElementById('origen');
            selectOrigen.addEventListener('change', () => {
                var IDOrigen = selectOrigen.value;
                var Origen = selectOrigen.options[selectOrigen.selectedIndex].text;

                var data = { origen: Origen };


                fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(responseData => {
                        var selectDestino = document.getElementById('destino');


                        while (selectDestino.options.length > 1) {
                            selectDestino.remove(1);
                        }


                        responseData.forEach(option => {
                            var newOption = document.createElement("option");
                            newOption.value = option.id;
                            newOption.text = option.name;
                            selectDestino.appendChild(newOption);
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error}`,
                            icon: "error"
                        });
                    });
            });






            function searchDestiny() {

                var selectOrigenUs = document.getElementById('origen');
                var selectDestino = document.getElementById('destino');

                var data = { origen: selectOrigenUs.options[selectOrigenUs.selectedIndex].text };


                fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(responseData => {

                        while (selectDestino.options.length > 1) {
                            selectDestino.remove(1);
                        }

                        responseData.forEach(option => {
                            var newOption = document.createElement("option");
                            newOption.value = option.id;
                            newOption.text = option.name;
                            selectDestino.appendChild(newOption);
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error}`,
                            icon: "error"
                        });
                    });
            }


            document.getElementById('content-button').style.display = "none"
            document.getElementById('content-buttons').style.display = "flex"
            document.getElementById('content-buscador').style.display = "block"



        }




        function convertirAMayusculas(input) {
            input.value = input.value.toUpperCase();
        }


        function validarNumero(input) {

            input.value = input.value.replace(/[^0-9]/g, '');
        }


        function generarID() {
            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let id = '';

            for (let i = 0; i < 8; i++) {
                const indice = Math.floor(Math.random() * caracteres.length);
                id += caracteres.charAt(indice);
            }

            return id;
        }





        function actualizarCurrentSale() {

            var ventareciente = localStorage.getItem('num_ventas')
            var shiftnumber = localStorage.getItem('shift_number')
            var userid = localStorage.getItem('id')


            fetch(`http://apitaquillassag.dyndns.org/Home/ActualizarSaleShift?userid=${userid}&shiftNumber=${shiftnumber}&currentSale=${ventareciente}`, {

                method: 'PATCH',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
                },
                body: JSON.stringify({})
            })
                .then(response => response.text())
                .then(data => {

                    if (data == "OK") {


                        Swal.fire({
                            title: "pago realizado!",
                            text: `se ha capturado exitosamente`,
                            icon: "success"
                        });


                        window.location.href = 'Boletos.aspx'

                    } else {

                        Swal.fire({
                            title: "Error",
                            text: `Hubo un error al guardar "venta reciente" en el registro de datos`,
                            icon: "error"
                        });
                    }

                })



        }





        function limpiarTabla() {
            var tabla = document.getElementById('tabla-viajes');

            // Eliminar todas las filas excepto la primera (encabezados)
            while (tabla.rows.length > 1) {
                tabla.deleteRow(1);
            }
        }


    } else {
       
        fetch('http://apitaquillassag.dyndns.org/Home/Origen', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify('')
        })
            .then(response => response.json())
            .then(data => {
                var selectOrigen = document.getElementById('origen');


                while (selectOrigen.options.length > 1) {
                    selectOrigen.remove(1);
                }

                data.forEach(option => {
                    var newOption = document.createElement("option");
                    newOption.value = option.id;
                    newOption.text = option.name;
                    selectOrigen.appendChild(newOption);
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: `${error}`,
                    icon: "error"
                });
            });


        var selectOrigen = document.getElementById('origen');
        selectOrigen.addEventListener('change', () => {
            var IDOrigen = selectOrigen.value;
            var Origen = selectOrigen.options[selectOrigen.selectedIndex].text;

            var data = { origen: Origen };


            fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {
                    var selectDestino = document.getElementById('destino');


                    while (selectDestino.options.length > 1) {
                        selectDestino.remove(1);
                    }


                    responseData.forEach(option => {
                        var newOption = document.createElement("option");
                        newOption.value = option.id;
                        newOption.text = option.name;
                        selectDestino.appendChild(newOption);
                    });
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                });
        });






        function searchDestiny() {

            var selectOrigenUs = document.getElementById('origen');
            var selectDestino = document.getElementById('destino');

            var data = { origen: selectOrigenUs.options[selectOrigenUs.selectedIndex].text };


            fetch('http://apitaquillassag.dyndns.org/Home/Destino', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {

                    while (selectDestino.options.length > 1) {
                        selectDestino.remove(1);
                    }

                    responseData.forEach(option => {
                        var newOption = document.createElement("option");
                        newOption.value = option.id;
                        newOption.text = option.name;
                        selectDestino.appendChild(newOption);
                    });
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error!",
                        text: `${error}`,
                        icon: "error"
                    });
                });
        }


        document.getElementById('content-button').style.display = "none"
        document.getElementById('content-buttons').style.display = "flex"
        document.getElementById('content-buscador').style.display = "block"

    }
}



function CerrarCajamenor() {


    var saleshift = localStorage.getItem('saleshift_id')
    var venta = localStorage.getItem('venta_reciente')
    var venta_reciente = parseFloat(venta)


    const CashCheckpoint = {

        sale_shift_id: saleshift,
        previous_amount: venta_reciente,
        new_amount: 0

    }


    fetch('http://apitaquillassag.dyndns.org/Home/CerrarTurno', {

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(CashCheckpoint)

    })
        .then(response => response.text())
        .then(data => {

            if (data.length <= 6) {
                alert("ocurrio un error")
            } else {

                localStorage.setItem('cashcheckpoint', data);
                var cashcheckpoint = localStorage.getItem('cashcheckpoint');
                var salesnumberArray = JSON.parse(localStorage.getItem('array_ventas')) || [];

                let Saleshift = salesnumberArray.map(salesnumber => {
                    return {
                        salesnumber: salesnumber
                    };
                });

                fetch(`http://apitaquillassag.dyndns.org/Home/agregarCashCheckpoint?cashcheck=${cashcheckpoint}`, {

                    method: 'PATCH',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json',  // Puedes cambiarlo según las necesidades de la API
                    },
                    body: JSON.stringify(Saleshift)

                })
                    .then(response => response.text())
                    .then(data => {



                        if (data == "Operación exitosa") {

                            Swal.fire({
                                title: "OK",
                                text: `Se ha cerrado la caja exitosamente`,
                                icon: "success"
                            });

                            location.href = "informeCierre.aspx"

                        } else {
                            Swal.fire({
                                title: "Error",
                                text: `Hubo un error al cerrar la caja`,
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        alert("ocurrio un error: " + error)
                    })


            }

        }).catch(error => {

            alert("Ocurrio un error: " + error)
        })



}



function CerrarCajavacia() {

    alert("caja en 0")
    var saleshift = localStorage.getItem('saleshift_id')
    var venta = localStorage.getItem('venta_reciente')
    var venta_reciente = parseFloat(venta)


    const CashCheckpoint = {

        sale_shift_id: saleshift,
        previous_amount: 0,
        new_amount: 0

    }



    fetch('http://apitaquillassag.dyndns.org/Home/CerrarTurno', {

        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(CashCheckpoint)

    })
        .then(response => response.text())
        .then(data => {

            if (data.length <= 6) {
                alert("ocurrio un error")
            } else {

                localStorage.setItem('cashcheckpoint', data);
                var cashcheckpoint = localStorage.getItem('cashcheckpoint');

                location.href = "informeCierre.aspx"



            }


        }).catch(error => {

            alert("Ocurrio un error: " + error)
        })






}
