(function () {
    'use strict';

    angular
        .module('main')
        .service('SurveyService', SurveyService);

    SurveyService.$inject = ['$resource'];

    /* @ngInject */
    function SurveyService($resource) {
        return $resource('http://localhost:3000/api/survey/:id', {id: "@id"});
    }

})();

