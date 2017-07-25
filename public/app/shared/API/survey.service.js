(function () {
    'use strict';

    angular
        .module('main')
        .service('SurveyService', SurveyService);

    SurveyService.$inject = ['$resource','InfoService'];

    /* @ngInject */
    function SurveyService($resource,InfoService) {
        return $resource(InfoService.baseUrl() + '/api/survey/:id', {id: "@id"});
    }

})();

