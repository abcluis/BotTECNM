(function () {
    'use strict';

    angular
        .module('main')
        .controller('NavController', NavController);


    /* @ngInject */
    function NavController() {
        let vm   = this;
        vm.title = 'NavController';


    }

})();

