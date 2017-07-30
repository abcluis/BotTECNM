/**
 * Created by usuario1 on 7/26/2017.
 */
module.exports = validations;


function validations(req, res, next) {

    let keys  = Object.keys(req.query);
    let field = keys[1];

    if (req.path === '/bot/start') {
        return next();
    }

    switch (field) {
        case 'curp':
            if (isValidCurp(req.query[field])) {
                next();
            } else {
                next(new Error('Por favor ingresa una curp valida'));
            }
            break;
        case 'birthdate':

            if (isValidDate(req.query[field])) {
                next();
            } else {
                next(new Error('Por favor ingresa la fecha con el formato correcto'));
            }
            break;
        case 'actual_state':
            if (isValidState(req.query[field].toLowerCase())) {
                next();
            } else {
                next(new Error('Por favor debes ingresar un estado valido'));
            }

            break;
        case undefined:

            next(new Error('Por favor agregue el segundo campo'));

            break;
        default:
            next();
            break;
    }
}

function isValidState(string) {
    let state_names = [
        'aguascalientes', 'baja california norte', 'baja california sur',
        'campeche', 'chihuahua', 'chiapas', 'coahuila', 'colima',
        'distrito federal', 'durango', 'guerrero', 'guanajuato', 'hidalgo',
        'jalisco', 'estado de mexico', 'michoacan', 'morelos', 'nayarit', 'nuevo leon',
        'oaxaca', 'puebla', 'queretaro', 'quintana Roo', 'sinaloa', 'san luis potosí',
        'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatán', 'zacatecas'
    ];

    return state_names.indexOf(string) > -1;
}

function isValidDate(dateString) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx))
        return false;  // Invalid format
    let d;
    if (!((d = new Date(dateString)) | 0))
        return false; // Invalid date (or this could be epoch)
    return d.toISOString().slice(0, 10) === dateString;
}

function isValidCurp(curp) {

    // Fuente
    // https://es.stackoverflow.com/questions/31039/c%C3%B3mo-validar-una-curp-de-m%C3%A9xico

    let re       = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado)  //Coincide con el formato general?
        return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        let diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma     = 0.0,
            lngDigito   = 0.0;
        for (let i = 0; i < 17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito === 10) return 0;
        return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1]))
        return false;

    return true; //Validado

}
