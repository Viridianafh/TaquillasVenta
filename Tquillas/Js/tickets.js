function descargarBoleto(id) {
    let nombre = $("#Nombre" + id).html();
    let ticket = $("#Ticket" + id).html();
    if (infoBoletos.length > 0) {
        for (var x = 0; x < infoBoletos.length; x++) {
            if ((infoBoletos[x].nombre == nombre) && (infoBoletos[x].idTicket == ticket)) {
                var codigo = new QRious({
                    value: infoBoletos[x].idTicket, // La URL o el texto
                    size: 200,
                    backgroundAlpha: 0, // 0 para fondo transparente
                    foreground: "#000000", // Color del QR
                    level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
                });
                var qr = codigo.image.src;
                var doc = new jsPDF({ format: 'letter' });
                let imagen = new Image();
                imagen.src = boleto2;
                doc.addImage(imagen, "JPEG", 0, 5, 220, 290);
                let cod = new Image();
                cod.src = codigo.image.src;
                doc.addImage(cod, "PNG", 150, 65, 40, 40);
                doc.setTextColor(22, 96, 167);
                doc.setFontSize(13);
                doc.text(18, 45, infoBoletos[x].origen);
                doc.text(68, 45, infoBoletos[x].destino);
                doc.text(142, 45, infoBoletos[x].asiento);
                doc.text(50, 64, infoBoletos[x].nombre);
                doc.text(50, 77, infoBoletos[x].fechaSalida);
                doc.text(50, 85, infoBoletos[x].fechaLlegada);
                doc.text(50, 94, parseFloat(infoBoletos[x].total).toFixed(2));
                doc.text(115, 94.5, infoBoletos[x].tipopasajero);
                doc.text(115, 104, ticket);
                doc.text(115, 113, num_compra);
                doc.text(50, 104, ((parseFloat(infoBoletos[x].total)) - parseFloat(infoBoletos[x].precioVenta)).toFixed(2));
                doc.text(50, 113, parseFloat(infoBoletos[x].precioVenta).toFixed(2));
                doc.setTextColor(14, 14, 14);
                doc.text(88, 104, "Folio ");
                doc.text(88, 113, "# Compra ");
                doc.save("Boleto_" + ticket + '.pdf');
                x = infoBoletos.length;
            }
        }
    }
    else {
        window.open("https://apisales.turismoenomnibus.com.mx/sale/downloadTicket/" + $("#Ticket" + id).html() + "?timeZone=America/Mexico_City", "_blank");
    }
}