(function () {
    'use strict';

    angular
        .module('app')
        .controller('WeatherAppController', WeatherAppController);

    WeatherAppController.$inject = ['weatherFactory', 'toastr'];

    /* @ngInject */
    function WeatherAppController(weatherFactory, toastr) {
        var vm = this;
        vm.cityWeatherInfo = cityWeatherInfo;
        vm.cityNames = [];

        function cityWeatherInfo(cityInput) {
            weatherFactory
                .getWeatherDet(cityInput)
                .then(function (data) {
                    vm.results = data;
                    vm.dateTime = new Date(vm.results.dt*1000).toString();
                    console.log(vm.results);

                    if (vm.cityNames.indexOf(data.name) == -1) {
                        vm.cityNames.push(
                            {
                                "name": data.name,
                                "temperature": data.main.temp,
                                "date": vm.dateTime,
                            });
                    }
                    if (data.cod == 200) {
                        toastr.success("We have weather!");
                    } else {
                        toastr.info("Houston, we have a problem: " + data.status + " " + data.statusText);
                    }
                }, function (error) {
                    toastr.error("Danger Will Robinson: " + error.status + " , " + error.statusText);
                });
        }
    }
})();