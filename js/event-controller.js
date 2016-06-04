angular.module("eventapp.controllers",[])
 .controller('AppCtrl', function ($scope, $state) {

        $scope.logout = function () {
         
            $state.go('app.login');
        };

        $scope.revokePermissions = function () {
             
        };

    })
//LOgin Controler
    .controller('LoginCtrl', function ($scope, $state) {
 $scope.username="";
 $scope.password="";
 
 
        $scope.doLogin = function () {
		var user=$scope.username;
		var pwd=$scope.password;
 if(user=="demo" && user==pwd){
 
 $state.go("app.home");
 }
           
        };

    })
	//HOme controller
    .controller('HomeCtrl', function ($scope, $state) {
 $scope.username="";
 $scope.password="";
 
 
        $scope.doLogin = function () {
		var user=$scope.username;
		var pwd=$scope.password;
 if(user=="demo" && user==pwd){
 
 $state.go("app.home");
 }
           
        };

    })	
	
	
	
	
	
	;

    