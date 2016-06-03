angular.module('eventapp', ['ngRoute'])
//config state
.config(['$routeProvider', function($routeProvider) {
            $routeProvider
            
            .when('/login', {
               templateUrl: 'templates/login.html',
               controller: 'LoginCtrl'
            })
            
            .when('/home', {
               templateUrl: 'templates/home.html',
               controller: 'HomeCtrl'
            })
            
            .otherwise({
               redirectTo: '/login'
            });
         }]);