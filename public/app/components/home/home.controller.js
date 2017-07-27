/**
 * Created by usuario1 on 7/25/2017.
 */
(function () {
    'use strict';

    angular
        .module('main')
        .controller('HomeController', HomeController);


    HomeController.$inject = ['surveys', 'HomeService'];
    /* @ngInject */
    function HomeController(surveys, HomeService) {
        let vm     = this;
        vm.surveys = surveys;
        vm.labels  = ["Instituto Tecnologico Chihuahua II", "Instituto Tecnologico Delicias", "Otros"];
        vm.data    = [3, 1, 1];

        vm.labelsradar = ["Enfasis en investigacion", "Experiencia en residencias", "Participacion proyectos", "Calidad docentes", "Infraestructura", "Plan de estudios"];

        vm.dataradar = [
            HomeService.getDataRadar(vm.surveys),
            [0, 0, 0, 0, 0, 0]
        ];

        vm.defaultData = function defaultData() {
            vm.dataradar[0] = HomeService.getDataRadar(vm.surveys);
            vm.school       = undefined;
        };

        vm.changeSchool = function () {
            if (vm.school) {
                vm.dataradar[0] = HomeService.changeDataRadar(vm.surveys, vm.school);
            }else {
                vm.dataradar[0] = HomeService.getDataRadar(vm.surveys);
            }

        }

    }

})();

