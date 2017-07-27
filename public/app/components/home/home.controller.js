/**
 * Created by usuario1 on 7/25/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .controller('HomeController', HomeController);



    HomeController.$inject = ['surveys','dataRadar'];
    /* @ngInject */
    function HomeController(surveys,dataRadar) {
        let vm   = this;
        vm.surveys = surveys;
        vm.labels = ["Instituto Tecnologico Chihuahua II", "Instituto Tecnologico Delicias", "Otros"];
        vm.data = [3, 1, 1];

        vm.labelsradar =["Enfasis en investigacion", "Experiencia en residencias", "Participacion proyectos", "Calidad docentes", "Infraestructura", "Plan de estudios"];

        vm.dataradar = [
            dataRadar,
            [0,0,0,0,0,0]
        ];


    }

})();

