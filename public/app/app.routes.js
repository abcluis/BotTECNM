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
                controller :  'HomeController as $ctrl',
                resolve: {
                    surveys : ['SurveyService', function (SurveyService) {
                        return SurveyService.query().$promise;
                    }]
                }
            });

    }


})();