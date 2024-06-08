document.addEventListener('DOMContentLoaded', () => {


    
  

    var qrElements = document.querySelectorAll('#qrcode');

    // Itera sobre cada elemento y genera un código QR.
    qrElements.forEach(function (el) {
        var qrcode = new QRCode(el, {
            text: "HOLI ES UN EJEMPLO",
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Opcional: Si deseas cambiar el contenido del código QR posteriormente.
        qrcode.clear(); // Limpia el código.
        qrcode.makeCode("HOLII ESTE ES UN EJEMPLO"); // Genera otro código QR.
    })

       

})



//function DownloadGuide(objet) {


//    var document = objet

//    document.forEach(e => {

//        var pdf = new document(pdf)


//        var sectionpdf = document.getElemetById("").
//       // valores del documetno
//        pdf.add.image("").readonly.
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly
//        pdf.row("").readonly



//    })


//}