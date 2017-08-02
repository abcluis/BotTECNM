/**
 * Created by usuario1 on 6/22/2017.
 */

let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let surveySchema = new Schema({
    id_student:    {
        type:   String,
        unique: true
    },
    school:        String,
    personal_data: {
        full_name:           String,
        number_control:      Number,
        birthdate:           String,
        curp:                String,
        true_gender:         String,
        civil_status:        String,
        actual_address:      String,
        actual_city:         String,
        actual_municipality: String,
        actual_state:        String,
        phone:               String,
        email:               String,
        phone_alt:           String,
        career:              String,
        speciality:          String,
        date_graduate:       String,
        certificated:        Boolean,
        english_mastery:     String,
        other_mastery:       String,
        package_comp:        [
            {name: String}
        ]
    },
    pertinence:    {
        quality_teachers:     {
            type: String,
            enum: ['Muy buena', 'Buena' , 'Regular' , 'Mala']
        },
        study_plan:           {
            type: String,
            enum: ['Muy bueno', 'Bueno' , 'Regular' , 'Malo']
        },
        oportunity_part:      {
            type: String,
            enum: ['Muy buena', 'Buena' , 'Regular' , 'Mala']
        },
        emphasis_invest:      {
            type: String,
            enum: ['Muy buena', 'Buena' , 'Regular' , 'Mala']
        },
        satisfaction_cond:    {
            type: String,
            enum: ['Muy buena', 'Buena' , 'Regular' , 'Mala']
        },
        experience_residence: {
            type: String,
            enum: ['Muy buena', 'Buena' , 'Regular' , 'Mala']
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
    }

});

let survey = mongoose.model('Survey', surveySchema);

module.exports = survey;