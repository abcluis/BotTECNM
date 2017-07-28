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


        vm.labels = [...new Set(surveys.map(element => element.school))];
        vm.data = [];
        /*vm.data = [
            surveys.filter((survey) => survey.school === vm.labels[0]).length,
            surveys.filter((survey) => survey.school === vm.labels[1]).length,
            surveys.filter((survey) => survey.school === vm.labels[2]).length,
        ];*/

        vm.labels.map(function (element, index) {
            vm.data.push(surveys.filter((survey) => survey.school === vm.labels[index]).length)
        });

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

