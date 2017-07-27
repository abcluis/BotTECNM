/**
 * Created by usuario1 on 7/25/2017.
 */
(function () {
    'use strict';
    angular
        .module('main')
        .config(config);

    config.$inject = ['$stateProvider','$urlRouterProvider'];

    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url :         '/',
                templateUrl : 'app/components/home/home.html',
                controller :  'HomeController as vm',
                resolve: {
                    surveys : ['SurveyService', function (SurveyService) {
                        return SurveyService.query().$promise
                            .then((surveys) => {
                                surveys = surveys.filter(function (element) {
                                    return element.pertinence.emphasis_invest &&
                                        element.pertinence.experience_residence &&
                                        element.pertinence.oportunity_part &&
                                        element.pertinence.quality_teachers &&
                                        element.pertinence.satisfaction_cond &&
                                        element.pertinence.study_plan;
                                });

                                return surveys;
                            });
                    }]
                }
            });

    }


})();