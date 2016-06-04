angular.module("eventapp",['ionic','eventapp.controllers','eventapp.directives','eventapp.service'])
    .config(function ($stateProvider, $urlRouterProvider) {
                 $stateProvider 
				 .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl"
            })
.state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: "HomeCtrl"
                    }
                }
            })
           .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            })
			

			
            .state('app.logout', {
                url: "/logout",
                views: {
                    'menuContent': {
                        templateUrl: "templates/logout.html",
                        controller: "LogoutCtrl"
                    }
                }
            });

            

        // fallback route
        $urlRouterProvider.otherwise('/app/login');

    });