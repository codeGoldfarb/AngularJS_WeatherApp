//MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes

weatherApp.config(function ($routeProvider){
    
    
    $routeProvider
      .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
    })
    
        .when('/forecast',{
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        
    
    })
    
     .when('/forecast/:days',{
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        
    
    })
    
});


//SERVICES

weatherApp.service('cityService', function(){
    
    this.city = "Columbus, OH";
    
})
    


//Controllers

weatherApp.controller('homeController', ['$scope','$location', '$resource','cityService', function($scope, $location, $resource, cityService){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        
        cityService.city = $scope.city;
    })
    
    $scope.submit = function(){
        
        $location.path("/forecast");
        
    }
    
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    //|| means default to 2 days
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=59233c6576186198034faf3248cc52de", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
    
    //console.log($scope.weatherResult);
    
    $scope.convertToFahrenheit = function(degK){
        
        return Math.round((1.8*(degK-273)) + 32);
        
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt * 1000);
    }

    
}]);