/**
 * Created by usuario1 on 7/26/2017.
 */
(function () {

    'use strict';

    angular
        .module('main')
        .service('HomeService',HomeService);

    function HomeService() {

        this.getDataRadar = getDataRadar;
        this.changeDataRadar = changeDataRadar;

        function getDataRadar(surveys) {



            let radar = surveys.map(function(element){
                return [
                    castPertinence(element.pertinence.emphasis_invest),
                    castPertinence(element.pertinence.experience_residence),
                    castPertinence(element.pertinence.oportunity_part),
                    castPertinence(element.pertinence.quality_teachers),
                    castPertinence(element.pertinence.satisfaction_cond),
                    castPertinence(element.pertinence.study_plan)
                ]
            });

            return getAverages(radar);

        }

        function changeDataRadar(surveys, school) {
            surveys = surveys.filter(function (element) {
                return element.school === school;
            });

            let data = getDataRadar(surveys);

            return data;
        }

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

            let promedio = [];

            suma.map((function (el,index) {
                promedio[index] = el / radar.length;
            }));

            promedio = promedio.map(function (el) {
                return Number((el).toFixed(1));
            });

            return promedio;
        }


    }

})();