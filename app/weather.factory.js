(function () {
  angular
        .module('app')
        .factory('weatherFactory', weatherFactory);

  weatherFactory.$inject = ['$http', '$q'];

  function weatherFactory($http, $q) {
    let service = {
          getWeatherDet: getWeatherDet,
        };
      return service;

        // //////////////
      function getWeatherDet(term) {
          const defer = $q.defer();

          $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + term + '&units=imperial&apikey=c290bc6fa7278451b2d24d29650191bb')
                .then(function(response) {
                  defer.resolve(response.data);
                }, function (error) {
                  defer.reject(error);
                })
          return defer.promise;
        }
    }
})();
