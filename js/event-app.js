angular.module("eventapp",['ionic','eventapp.controllers'])
 .run(function ($rootScope, $state, $ionicPlatform, $window) {

    

        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== "app.login" && toState.name !== "app.logout" ) {
                $state.go('app.login');
                event.preventDefault();
            }
        });

        

    })

    .config(function ($stateProvider, $urlRouterProvider) {
     

            $stateProvider .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl"
            });
 $stateProvider.state('app.playlist', {
                url: "/playlist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: "HomeCtrl"
                    }
                }
            });
           $stateProvider .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            });
			

			
             $stateProvider.state('app.logout', {
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