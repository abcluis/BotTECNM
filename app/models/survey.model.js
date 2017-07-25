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
        control_number:      Number,
        birthdate:           String,
        curp:                String,
        true_gender:         String,
        civil_status:        String,
        actual_address:      String,
        actual_city:         String,
        actual_municipality: String,
        actual_state:        String,
        phone:               Number,
        email:               String,
        phone_alt:           Number,
        career_speciality:   String,
        date_graduate:       String,
        certificated:        Boolean,
        english_mastery:     String,
        other_mastery:       String,
        package_comp:        [
            {name: String}
        ]
    },
    pertinence:    {
        quality_teachers:     String,
        study_plan:           String,
        oportunity_part:      String,
        emphasis_invest:      String,
        satisfaction_cond:    String,
        experience_residence: String
    },
    work_aspect:   {
        actual_activity:       String,
        activity_studies:      String,
        time_get:              String,
        how_get:               String,
        requirements:          [
            {description: String}
        ],
        language_use:          String,
        speak_language:        String,
        write_language:        String,
        read_language:         String,
        listen_language:       String,
        old_job:               String,
        salary:                Number,
        level_job:             String,
        work_condition:        String,
        work_study_relation:   String,
        organism:              String,
        main_activity_company: String
    }

});

let survey = mongoose.model('Survey', surveySchema);

module.exports = survey;