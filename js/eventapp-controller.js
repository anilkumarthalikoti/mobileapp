angular.module('eventapp', [])
//adding login controller
.controller("LoginCtrl",function($scope){
alert('CLD')
$scope.username="";
$scope.pwd="";

$scope.validateLogin=function(){

}

})
.controller("HomeCtrl",function($scope){

$scope.username="";
$scope.pwd="";

$scope.validateLogin=function(){

}

})

;