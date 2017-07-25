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

    }

})();

