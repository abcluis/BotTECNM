let Survey       = require('../app/models/survey.model');
const mongoose   = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@ds133582.mlab.com:33582/bottecnm', function(err){
    if(err)
        throw err;
    console.log('Connected to BotTECNM db');
});


let survey1 = new Survey({
    id_student:    1,
    school:        'Instituto Tecnologico de Chihuahua II',
    personal_data: {
        full_name:           'Luis Fernando Gallegos',
        number_control:      203243123,
        birthdate:           '30/08/1995',
        curp:                'GAGL9508303212',
        true_gender:         'Masculino',
        civil_status:        'Soltero',
        actual_address:      'Angel Posada',
        actual_city:         'Chihuahua',
        actual_municipality: 'Chihuahua',
        actual_state:        'Chihuahua',
        phone:               6145134221,
        email:               'abc_luis30@hotmail.com',
        phone_alt:           3213213212,
        career_speciality:   'Ingenieria En Sistemas Computacionales',
        date_graduate:       '08/18',
        certificated:        true,
        english_mastery:     '50',
        other_mastery:       'Ninguna',
        package_comp:        [
            {name: 'SQL'},
            {name: 'JAVA'},
            {name: 'Angular'}
        ]
    },
    pertinence:    {
        quality_teachers:     'Buena',
        study_plan:           'Buena',
        oportunity_part:      'Buena',
        emphasis_invest:      'Buena',
        satisfaction_cond:    'Buena',
        experience_residence: 'Muy buena'
    },
    work_aspect:   {
        actual_activity:    'Trabaja',
        activity_studies:   'Maestria',
        speciality_inst:    'Big Data',
        time_getjob:        'Menos de 6 meses',
        how_gotjob:         'Residencia prof.',
        recruitment_reqs:   [
            {description: 'Idioma Extranjero'}
        ],
        language_job:       'Inglés',
        perc_speak:         'Alto',
        perc_write:         'Alto',
        perc_read:          'Alto',
        perc_listen:        'Alto',
        years_antiguaty:    'Menos de un año',
        year_income:        '2018',
        minimum_salary:     20000,
        hierarchical_level: 'Supervisor',
        work_condition:     'Contrato',
        work_studyrel:      '80%',
        organism:           'Privado',
        business_act:       'Tecnologico',
        social_reason:      'Software SA',
        address_iii:        'Avenida Siempre Viva',
        city_iii:           'Chihuahua',
        municipality_iii:   'Chihuahua',
        state_iii:          'Chihuahua',
        tel_ext_iii:        '31232132132',
        fax_iii:            '321123',
        email_iii:          'software@software.com',
        webpage_iii:        'software.com',
        boss_namejob:       'jefe',
        economic_sector:    'Tecnologico',
        comp_orgsize:       'Pequeña'
    }
});

let survey2 = new Survey({
    id_student:    2,
    school:        'Instituto Tecnologico de Chihuahua',
    personal_data: {
        full_name:           'Mario Alberto Guillen',
        number_control:      432432432,
        birthdate:           '12/05/1995',
        curp:                'MAGRDSA321DSA',
        true_gender:         'Masculino',
        civil_status:        'Soltero',
        actual_address:      'Alguna Calle al norte',
        actual_city:         'Chihuahua',
        actual_municipality: 'Chihuahua',
        actual_state:        'Chihuahua',
        phone:               3213213213,
        email:               'mario@hotmail.com',
        phone_alt:           4324324324,
        career_speciality:   'Ingenieria En Sistemas Computacionales',
        date_graduate:       '08/18',
        certificated:        true,
        english_mastery:     '80',
        other_mastery:       'Ninguna',
        package_comp:        [
            {name: 'WEB'},
            {name: 'PHP'},
            {name: 'Word'}
        ]
    },
    pertinence:    {
        quality_teachers:     'Muy buena',
        study_plan:           'Buena',
        oportunity_part:      'Buena',
        emphasis_invest:      'Regular',
        satisfaction_cond:    'Buena',
        experience_residence: 'Muy buena'
    },
    work_aspect:   {
        actual_activity:    'Trabaja',
        time_getjob:        'Menos de 6 meses',
        how_gotjob:         'Residencia prof.',
        recruitment_reqs:   [
            {description: 'Idioma Extranjero'}
        ],
        language_job:       'Inglés',
        perc_speak:         'Alto',
        perc_write:         'Alto',
        perc_read:          'Alto',
        perc_listen:        'Alto',
        years_antiguaty:    'Menos de un año',
        year_income:        '2018',
        minimum_salary:     18000,
        hierarchical_level: 'Jefe de área',
        work_condition:     'Contrato',
        work_studyrel:      '60%',
        organism:           'Privado',
        business_act:       'Tecnologico',
        social_reason:      'Paginas web SA',
        address_iii:        'Av. Heroico Colegio Militar 999',
        city_iii:           'Chihuahua',
        municipality_iii:   'Chihuahua',
        state_iii:          'Chihuahua',
        tel_ext_iii:        '321321321',
        fax_iii:            '323232',
        email_iii:          'software@paginas.com',
        webpage_iii:        'paginas.com',
        boss_namejob:       'jefe del web',
        economic_sector:    'Tecnologico',
        comp_orgsize:       'Pequeña'
    }
});

let survey3 = new Survey({
    id_student:    3,
    school:        'Instituto Tecnologico de Chihuahua II',
    personal_data: {
        full_name:           'Hugo Licon',
        number_control:      203243123,
        birthdate:           '20/10/1993',
        curp:                'HULCDN321321321',
        true_gender:         'Masculino',
        civil_status:        'Soltero',
        actual_address:      'Calle 32a 2020',
        actual_city:         'Chihuahua',
        actual_municipality: 'Chihuahua',
        actual_state:        'Chihuahua',
        phone:               3213213211,
        email:               'hugo@hotmail.com',
        phone_alt:           3213213232,
        career_speciality:   'Ingenieria En Sistemas Computacionales',
        date_graduate:       '08/15',
        certificated:        true,
        english_mastery:     '80',
        other_mastery:       'Aleman',
        package_comp:        [
            {name: 'PHP'},
            {name: 'WEB'},
            {name: 'ANDROID'}
        ]
    },
    pertinence:    {
        quality_teachers:     'Regular',
        study_plan:           'Buena',
        oportunity_part:      'Regular',
        emphasis_invest:      'Regular',
        satisfaction_cond:    'Buena',
        experience_residence: 'Muy buena'
    },
    work_aspect:   {
        activity_studies:   'Maestria',
        speciality_inst:    'Inteligencia artificial'
    }
});

survey1.save()
    .then((data) => {
        console.log('Guardado ------ 1');
        return survey2.save();
    })
    .then((data) => {
        console.log('Guardado ------ 2');
        return survey3.save();
    })
    .then((data) => {
        console.log('Guardado ------ 3');
    })
    .catch((err) => {
        console.log(err);
    });