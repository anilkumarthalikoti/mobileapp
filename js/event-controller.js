angular.module("eventapp.controllers",[])
 .controller('AppCtrl', function ($scope, $state) {

        $scope.logout = function () {
         
            $state.go('app.login');
        };

        $scope.revokePermissions = function () {
             
        };

    })
	 .controller('HomeCtrl', function ($scope, $state) { 

    })
 
    .controller('LoginCtrl', function ($scope, $state) {
 $scope.username="";
 $scope.password="";
 
 
        $scope.doLogin = function () {
		var user=$scope.username;
		var pwd=$scope.password;
		 
 if(user=="demo" && user==pwd){
  
// $location.path("/app/home.html");
 
 }
           
        };

    })
 
   ;

    