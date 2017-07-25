/**
 * Created by usuario1 on 4/14/2017.
 */
angular
    .module('main')
    .service('InfoService',InfoService);

InfoService.$inject = ['$location'];
function InfoService($location) {

    this.baseUrl = baseUrl;

    function baseUrl() {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    }
}