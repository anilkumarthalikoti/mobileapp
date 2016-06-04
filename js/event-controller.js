angular.module("eventapp.controllers",[])
 .controller('AppCtrl', function ($scope, $state) {

        $scope.logout = function () {
         
            $state.go('app.login');
        };

        $scope.revokePermissions = function () {
             
        };

    })

    .controller('LoginCtrl', function ($scope, $location) {
 $scope.username="";
 $scope.password="";
 
 
        $scope.doLogin = function () {
alert($scope.username);
           
        };

    });

    