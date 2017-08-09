/**
 * Created by usuario1 on 6/22/2017.
 */

let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let messages = require('../utils/messages.bot');

let valuesPerformance = ['1', '2', '3', '4', '5'];

let surveySchema = new Schema({
    id_student:    {
        type:   String,
        unique: true
    },
    school:        String,
    personal_data: {
        full_name:           {
            type:     String,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z ]+$/.test(v);
                },
                message:   messages.full_name
            }
        },
        number_control:      {
            type:     String,
            validate: {
                validator: function (v) {
                    return /^[0-9]+$/.test(v);
                },
                message:   messages.number_control
            }
        },
        birthdate:           {
            type:     String,
            validate: {
                validator: isValidDate,
                message:   messages.birthdate
            }
        },
        curp:                {
            type:     String,
            validate: {
                validator: isValidCurp,
                message:   messages.curp
            }
        },
        true_gender:         {
            type: String,
            enum: {
                values:  ['Masculino', 'Femenino'],
                message: messages.true_gender
            }
        },
        civil_status:        String,
        actual_address:      String,
        actual_city:         String,
        actual_municipality: String,
        actual_state:        {
            type:     String,
            validate: {
                validator: isValidState,
                message:   messages.actual_state
            }
        },
        phone:               {
            type:     String,
            validate: {
                validator: function (v) {
                    return /^[0-9]+$/.test(v);
                },
                message:   messages.phone
            }
        },
        email:               {
            type:     String,
            validate: {
                validator: validateEmail,
                message:   messages.email
            }
        },
        phone_alt:           {
            type:     String,
            validate: {
                validator: function (v) {
                    return /^[0-9]+$/.test(v);
                },
                message:   messages.phone_alt
            }
        },
        career:              String,
        speciality:          String,
        date_graduate:       {
            type:     String,
            validate: {
                validator: isValidGraduateDate,
                message:   messages.date_graduate
            }
        },
        certificated:        {
            type: String,
            enum: {
                values:  ['Si', 'No'],
                message: messages.certificated
            }
        },
        english_mastery:     {
            type: String,
            enum: {
                values:  ['20', '40', '60', '80', '100'],
                message: messages.english_mastery
            }
        },
        other_mastery:       String,
        package_comp:        [
            {name: String}
        ]
    },
    pertinence:    {
        quality_teachers:     {
            type: String,
            enum: {
                values:  ['Muy buena', 'Buena', 'Regular', 'Mala'],
                message: messages.quality_teachers
            }
        },
        study_plan:           {
            type: String,
            enum: {
                values:  ['Muy bueno', 'Bueno', 'Regular', 'Malo'],
                message: messages.study_plan
            }
        },
        oportunity_part:      {
            type: String,
            enum: {
                values:  ['Muy buena', 'Buena', 'Regular', 'Mala'],
                message: messages.oportunity_part
            }
        },
        emphasis_invest:      {
            type: String,
            enum: {
                values:  ['Muy buena', 'Buena', 'Regular', 'Mala'],
                message: messages.emphasis_invest
            }
        },
        satisfaction_cond:    {
            type: String,
            enum: {
                values:  ['Muy buena', 'Buena', 'Regular', 'Mala'],
                message: messages.satisfaction_cond
            }
        },
        experience_residence: {
            type: String,
            enum: {
                values:  ['Muy buena', 'Buena', 'Regular', 'Mala'],
                message: messages.experience_residence
            }
        }
    },
    work_aspect:   {
        actual_activity:    String,
        activity_studies:   String,
        speciality_inst:    String,
        time_getjob:        String,
        how_gotjob:         String,
        recruitment_reqs:   [
            {description: String}
        ],
        language_job:       String,
        perc_speak:         String,
        perc_write:         String,
        perc_read:          String,
        perc_listen:        String,
        years_antiguaty:    String,
        year_income:        String,
        minimum_salary:     Number,
        hierarchical_level: String,
        work_condition:     String,
        work_studyrel:      String,
        organism:           String,
        business_act:       String,
        social_reason:      String,
        address_iii:        String,
        city_iii:           String,
        municipality_iii:   String,
        state_iii:          String,
        tel_ext_iii:        String,
        fax_iii:            String,
        email_iii:          String,
        webpage_iii:        String,
        boss_namejob:       String,
        economic_sector:    String,
        comp_orgsize:       String
    },
    performance:   {
        academic_efficiency:   {
            type : String,
            enum : {
                values : ['Muy eficiente', 'Eficiente', 'Poco eficiente', 'Deficiente'],
                message : messages.academic_efficiency
            }
        },
        academic_calification: {
            type : String,
            enum : {
                values : ['Excelente', 'Bueno', 'Regular', 'Malo', 'Pesimo'],
                message: messages.academic_calification
            }
        },
        residences_utility:    {
            type : String,
            enum : {
                values : ['Excelente', 'Bueno', 'Regular', 'Malo', 'Pesimo'],
                message : messages.residences_utility
            }
        },
        field_of_study:        {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.field_of_study
            }
        },
        academic_degree:       {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.academic_degree
            }
        },
        work_experience:       {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.work_experience
            }
        },
        labor_competence:      {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.labor_competence
            }
        },
        institute_position:    {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.institute_position
            }
        },
        knowledge_flanguages:  {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.knowledge_flanguages
            }
        },
        references:            {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.references
            }
        },
        personality:           {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.personality
            }
        },
        leadership:            {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.leadership
            }
        },
        others_performance:    {
            type: String,
            enum: {
                values : valuesPerformance,
                message: messages.others_performance
            }
        }
    },
    expectations : {
        courses : Boolean,
        what_courses : String,
        postgraduate : Boolean,
        what_postgraduate : String
    },
    social : {
        belongs_orgs : Boolean,
        what_orgs : String,
        belongs_pro_orgs : Boolean,
        what_pro_orgs : String,
        belongs_association : Boolean
    }
});



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
function isValidGraduateDate(dateString) {
    let regEx = /^\d{4}-\d{2}$/;
    return dateString.match(regEx);
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

function isValidState(string) {

    let state_names = [
        'aguascalientes', 'baja california norte', 'baja california sur',
        'campeche', 'chihuahua', 'chiapas', 'coahuila', 'colima',
        'distrito federal', 'durango', 'guerrero', 'guanajuato', 'hidalgo',
        'jalisco', 'estado de mexico', 'michoacan', 'morelos', 'nayarit', 'nuevo leon',
        'oaxaca', 'puebla', 'queretaro', 'quintana Roo', 'sinaloa', 'san luis potosí',
        'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatán', 'zacatecas'
    ];

    return state_names.indexOf(string.toLowerCase()) > -1;
}

let survey = mongoose.model('Survey', surveySchema);

module.exports = survey;