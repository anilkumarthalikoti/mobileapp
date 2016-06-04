angular.module("eventapp.controllers",[])
 .controller('AppCtrl', function ($scope, $state) {

        $scope.logout = function () {
         
            $state.go('app.login');
        };

        $scope.revokePermissions = function () {
             
        };

    })
	 .controller('HomeCtrl', function($scope,fileUpload){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
              // console.dir(file);
               
               var uploadUrl = "/fileUpload";
               fileUpload.uploadFileToUrl(file, uploadUrl);
            }
			
			$scope.openimage=function(){
			document.getElementById("imageupload").click();
			
			}
         })
 
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
 
   ;

    