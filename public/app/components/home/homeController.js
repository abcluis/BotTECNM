/**
 * Created by usuario1 on 7/25/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .controller('HomeController', HomeController);



    HomeController.$inject = ['surveys'];
    /* @ngInject */
    function HomeController(surveys) {
        var vm   = this;
        vm.surveys = surveys;
        vm.radar = surveys.map(function(element){
            return [
                castPertinence(element.pertinence.emphasis_invest),
                castPertinence(element.pertinence.experience_residence),
                castPertinence(element.pertinence.oportunity_part),
                castPertinence(element.pertinence.quality_teachers),
                castPertinence(element.pertinence.satisfaction_cond),
                castPertinence(element.pertinence.study_plan)
            ]
        });

        function castPertinence(word) {
            if(word === 'Muy buena'){
                return 100
            }else if (word === 'Buena'){
                return 80
            }else if (word === 'Regular'){
                return 60
            }else if (word === 'Mala'){
                return 40
            }
        }

        function getAverages(radar) {
            let suma = [0,0,0,0,0,0];


            radar.map(function (el, index) {
               el.map(function (el2, index2) {
                   suma[index2] = suma[index2] + el2;
               })
            });

            var promedio = [];

            suma.map((function (el,index) {
                promedio[index] = el / radar.length;
            }));

            return promedio;
        }

        vm.labels = ["Instituto Tecnologico Chihuahua II", "Instituto Tecnologico Delicias", "Otros"];
        vm.data = [3, 1, 1];

        vm.labelsradar =["Enfasis en investigacion", "Experiencia en residencias", "Participacion proyectos", "Calidad docentes", "Infraestructura", "Plan de estudios"];

        vm.dataradar = [
            getAverages(vm.radar),
            [0,0,0,0,0,0]
        ];


    }

})();

