function validarCampo(el, expReg) {
        var e = $(el).val().replace(expReg, '');
        $(el).val(e);
}

function maskCnpj(el) {  /*  00.000.000/0000-00    */

    validarCampo(el, /[^0-9\.\/\-/]/g);
    var e = $(el).val();

    if (event.keyCode != 8) {
            
        if (e.length == 2) {
            $(el).val(e + '.');
        }
        if (e.length == 6) {
            $(el).val(e + '.');
        }
        if (e.length == 10) {
            $(el).val(e + '/');
        }
        if (e.length == 15) {
            $(el).val(e + '-');
        }
    }
}

function maskAgencia(el) { /* Agência: xxx-x */
    var e = $(el).val();
    validarCampo(el, /[^0-9\-]/g);

    if(event.keyCode != 8){
        if (e.length == 3) {
            $(el).val(e + '-');
        }
    }
}

function maskConta(el) {  /* Conta: xx.xxx-x */
    var e = $(el).val();
    validarCampo(el, /[^0-9\.\-]/g);

    if (event.keyCode != 8) {
        if (e.length == 2) {
            $(el).val(e + '.');
        }
        if (e.length == 6) {
            $(el).val(e + '-');
        }
    }
}

