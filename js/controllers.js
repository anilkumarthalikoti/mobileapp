google.load("visualization", "1", {packages:["columnchart"]});
var baseurl='http://www.bitstax.com/';
angular.module('eventapp', [])	
.controller('examCtrl',  function ($scope, $http, $timeout, $ionicModal,$ionicSlideBoxDelegate,$location,$state,$stateParams,$ionicLoading) {
     // Examination module  
	$scope.exid=$stateParams.examId;
     $scope.sname = sessionStorage['sName'].toString();									 
		var eid=$stateParams.examId;
		
				var show = function () {
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
                
                if (navigator.connection.type == Connection.CELL_2G) {
                 
                }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                    
                    showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };

    var hide = function () {
	
        $ionicLoading.hide();
    };
	
	$scope.slideshow=false;
	show();
		
		
	$http.get(baseurl+'webservices.php?function=spexamportion&examid='+eid+'&type=examsch').
	
	success(function (data) { 
					$scope.sch = data; 
					$scope.sch1 = data; 
					
					hide();
					
					
					
					$ionicSlideBoxDelegate.update();
					
			     $scope.slideshow=true;
				 

                     
					  });
	$scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
		$scope.goback = function ($t) {
        console.log("calling back ");
        $state.go("app.Graphs", { "examId": $t});
		
    };

	$scope.goto = function ($to) {
        console.log("calling create ");
        $state.go("app.Examall", { "examId": $to});
		
    };
		 $scope.lftdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
			  $scope.rgtdisable='';
	  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
			 if($ionicSlideBoxDelegate.currentIndex()+1==$ionicSlideBoxDelegate.slidesCount()){
		  $scope.rgtdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
		   $scope.lftdisable='';
		    }
			else
			 if($ionicSlideBoxDelegate.currentIndex()==0){
			  $scope.lftdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
			  $scope.rgtdisable='';
				}
			else{
				  $scope.rgtdisable='';
				  $scope.lftdisable='';
				 }
  };
  
  $scope.lftdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
 $scope.nextSlide = function() {
 $ionicSlideBoxDelegate.next();
 if($ionicSlideBoxDelegate.currentIndex()+1==$ionicSlideBoxDelegate.slidesCount()){
  $scope.rgtdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
   $scope.lftdisable='';
 }else{
  $scope.rgtdisable='';
  $scope.lftdisable='';
 }
  }
  $scope.previousSlide=function(){ 
  $ionicSlideBoxDelegate.previous();
  
    if($ionicSlideBoxDelegate.currentIndex()==0){
  $scope.lftdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
  $scope.rgtdisable='';
	}
  else{ 
  $scope.lftdisable='';
  $scope.rgtdisable='';
  }
  }
  
  $scope.moveslide=function(tem){
    $ionicSlideBoxDelegate.slide(tem);
  }
    $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
	
})

.controller('examsallCtrl',  function ($scope, $http, $timeout, $ionicModal,$state,$ionicLoading) {  
    // Examination module  
    $scope.sname = sessionStorage['sName'].toString();									 
		var cls=sessionStorage['sClass'];
		var yr=sessionStorage['scurrentacyear'];
		var br=sessionStorage['sBranch'];
		var show = function () {
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
                
                if (navigator.connection.type == Connection.CELL_2G) {
                 
                }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                    
                    showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };

    var hide = function () {
	
        $ionicLoading.hide();
    };
	show();
	
 $http.get(baseurl+'webservices.php?function=spexamschedule&year='+yr+'&class='+cls+'&branch='+br+'&type=examsch').
 
	success(function (data) { 
	if(data[0].exam_name == undefined)
	{
    $scope.examnodatamessage="Data Not Available";		
	}
	else
	{
		$scope.sch = data; 
	}
	hide();
					  });
			$scope.gotopor = function ($n) {alert($n);
        console.log("calling create ");
		$state.go('app.Graphs');
		
		
    };

  $scope.search;
  

})
.controller('login', function ($scope, $ionicModal, $timeout, $http, $state,$ionicLoading,$ionicPopup,$ionicSideMenuDelegate) {
    // Used to hide the menu in login
	$ionicSideMenuDelegate.canDragContent(false);
	})
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $http, $state,$ionicLoading,$ionicPopup,$ionicSlideBoxDelegate) {
    // Home page
    $scope.loginData = {};
var usr = localStorage.getItem("user");
var passwor = localStorage.getItem("pwd");
if(usr != '')
{
var rempwd='YES';
}
$scope.loginData.username=usr;
$scope.loginData.password=passwor;

$scope.checkboxModel = {
       value1 : rempwd
     };

    //  Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        console.log('close login called');
        $scope.modal.hide();
    };

    // Open the login modal
	
    $scope.login = function () {
	//	alert('show login');
        $scope.modal.show();
    };

    $scope.logout = function () {
				sessionStorage['sName'] = '';
				sessionStorage['sImage'] = '';
			     sessionStorage['sBranch'] = '';
                sessionStorage['sClass'] = '';
                sessionStorage['sSection'] = '';
				sessionStorage['sParentId'] = '';
				sessionStorage['sStudentId'] = '';
				
		$state.go('app.login');
    }

   

    $scope.doLogin = function () {
        console.log('----------------------------------------------------------------------------------------------------------------------------------------');
        var pwd = $scope.loginData.password;
        var user = $scope.loginData.username;
		
	if($scope.checkboxModel.value1 == 'YES')
	{
		localStorage.setItem("user", user);
        localStorage.setItem("pwd", pwd); 		
     }
    else
    {
        localStorage.setItem("user", '');
        localStorage.setItem("pwd", ''); 		
    }	
		
		
var show = function () {

        if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
                
                if (navigator.connection.type == Connection.CELL_2G) {
                  //  alert('You are Connected 2g network for better performance pls connect 3g/WiFi');
                }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                    
                    showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };
	   var hide = function () {
        $ionicLoading.hide();
    };
	show();
	if(user=="demo" && user==pwd){
	hide();
	$state.go("app.playlists", {}, { reload: true,inherit: false });
	}else{
	hide();
	}
	/*
        $http.get(baseurl+'webservices.php?function="splogin"&user='+user+'&pwd='+pwd+'&type="login"').then(function (resp) {
            console.log('Success', resp);
			 hide();
			
			
           
		    console.log('Success', resp);
		
            if (resp.data[0].name === undefined)
           
			   {
               // $scope.message = "Your login attempt was not successful. Please try again.";
		   alert('Your login attempt was not successful. Please check credentials');
		   }
            else 
			{
			   if(resp.data != 'null')
			   {
			   
                window.localStorage['name'] = resp.data[0].name;
                sessionStorage['sName'] = resp.data[0].name;
             
			  sessionStorage['sImage'] = "http://183.82.8.39:9090/stuimg/" + resp.data[0].simage + ".jpg";
                sessionStorage['sBranch'] = resp.data[0].stud_branch;
                sessionStorage['sClass'] = resp.data[0].class;
                sessionStorage['sSection'] = resp.data[0].section;
				sessionStorage['sParentId'] = user;
				sessionStorage['sStudentId'] = resp.data[0].simage;
				sessionStorage['sColour_code'] = resp.data[0].colour_code;
				sessionStorage['acdyear']=resp.data[0].acd_id;
				sessionStorage['prevclass']=resp.data[0].prevclass;
				
				$http.get(baseurl+'webservices.php?function=spgetcurrentacyear&type=1').then(function (resp) {
					$scope.getacyear=resp.data;
					sessionStorage['scurrentacyear']=$scope.getacyear[0].current_acd_year;
					sessionStorage['spreviousyear']=$scope.getacyear[0].previous_acd_year;
				})
				show();
				$http.get(baseurl+'webservices.php?function=spclasspriority&branch='+sessionStorage['sBranch'] + '&class='+sessionStorage['sClass']+'&type=1').then(function (resp) {

					sessionStorage['sPriority'] =resp.data[0].priority;
					hide();
				})
				
                $scope.message = resp.data[0].sName + " Logged in successfully!!!";
                $scope.closeLogin();
               
			   $state.go("app.playlists", {}, { reload: true,inherit: false });
				
                console.log('Loaded new photo', resp);
				}
				else
				{
				alert('Sorry for inconvenience , Something problem ');
				}
            }
        }, function (err) {
            console.error('ERR', err);
			hide();
         
		 
		 
		 alert('Your login attempt was not successful. Please try again.');
        })*/

    };


    /*-------------------------------------forgot password -------------------------------------------------*/
    $scope.forgotData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/forgot.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    // Triggered in the forgot modal to close it
    $scope.closeforgot = function () {
        $scope.modal2.hide();
    };

    // Open the forgot modal
    $scope.forgot = function () {
        $scope.modal2.show();
    };

    // Perform the forgot password action when the user submits the forgot details in form
    $scope.doForgot = function () {
        console.log('Doing forgot password', $scope.loginData);
       
	   
        var user1 = $scope.forgot.sname;
        var id = $scope.forgot.Id;
		var dob = $scope.forgot.DOB;
     $http.get(baseurl+'webservices.php?function=spforgotpwd&id='+id+'&user='+user1+'&dob='+dob+'&type=1').then(function (resp) {
            console.log('Success', resp);
	    if (resp.data[0].spforgotpwd === undefined)
                {
                 alert('Provided data is invalid. Please check once again ');
				 }
            else {
				alert("Your Password :"+resp.data[0].spforgotpwd)
                                
            }
        }, function (err) {
            console.error('ERR', err);
           
			alert("Something Problem, Please try again later. ");
        })

 };
	
	  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
      title: '<table width="100%" border="0"><tr><td><strong>St.Andrews</strong></td><td align="right" style="font-size: 12px;"><strong> V 1.0</strong></td></tr></table>',
     template: '<table width="100%" border="0"><tr><td style="text-align: center;">Software ​& ​Mobile application developed by​:​ <br/><strong> ​Elite ProCon Solutions Pvt​.​ Ltd​.​</strong> <br />Software Solutions <br /> Hyderabad ​  <b>&diams;</b>   ​Vijayawada ​ <b>&diams;</b>   ​Bengaluru​   <b>&diams;</b>   USA​ <br /><br/></td></tr><tr><td><strong> Technical Support</strong> :<br />support@eliteprojects.com<br />9963697077<br /><br/></td>  </tr>  <tr>    <td><strong>Sales : </strong><br />sales@eliteprojects.com<br />9963832077<br />0866 - 2477077 / 6647677<br />web :www.eliteprojects.com</td>  </tr></table>'
	  

	  });
     alertPopup.then(function(res) {
       console.log('Thank you');
     });
   };
   
   
  

  // Called each time the slide changes

  
  
  
  
  /************************************/
	
})

.controller('PlaylistCtrl', function ($scope, $ionicPlatform) {
   // Supported
    scope.$watch('ready', function () {

    });

})


.controller('PlaylistsCtrl', function ($scope, $ionicModal, $timeout, $http, $state) {
    // Home Page
    console.log("home page " + sessionStorage['name']);
	
    if (sessionStorage['sName'] == "undefined" || sessionStorage['sName'] == "") {
	}else{
        $scope.sname = sessionStorage['sName'].toString() + " , " + sessionStorage['sBranch'].toString() + " , " + sessionStorage['sClass'].toString() + " , " + sessionStorage['sSection'].toString();
       
	  $scope.ImageURI = "http://183.82.8.39:9090/stuimg/"+sessionStorage['sStudentId']+".jpg";
	  $scope.colourcode=sessionStorage['sColour_code'];
        console.log("home page loading done ");
	
    }

    $scope.create = function () {
        console.log("calling create ");
        $state.go("app.SuccessPage");
    };
})

.controller('circularnotices', function ($scope, $ionicModal, $timeout, $http, $state,$ionicSlideBoxDelegate, $ionicScrollDelegate) {
   $scope.sname = sessionStorage['sName'].toString();
   // Get Circular notice data
    $http.get(baseurl+'webservices.php?function=spcircularnotice&type=time').then(function (resp) {
	
	$scope.cnotices=resp.data;
	$ionicSlideBoxDelegate.update();
	});
	  		 $scope.lftdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
			  $scope.rgtdisable='';
	  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
			 if($ionicSlideBoxDelegate.currentIndex()+1==$ionicSlideBoxDelegate.slidesCount()){
		  $scope.rgtdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
		   $scope.lftdisable='';
		    }
			else
			 if($ionicSlideBoxDelegate.currentIndex()==0){
			  $scope.lftdisable="opacity: 0.3; pointer-events: none;   cursor: default;";
			  $scope.rgtdisable='';
				}
			else{
				  $scope.rgtdisable='';
				  $scope.lftdisable='';
				 }
  };
  
  $scope.moveslide=function(tem){
    $ionicSlideBoxDelegate.slide(tem);
  }
	   
   
   
   //	$ionicSlideBoxDelegate.update();
     $scope.updateSlideStatus = function(slide) {
	
if(slide == undefined)
{
slide=0;
}
$scope.zoomMin = 1;
  var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
  if (zoomFactor == $scope.zoomMin) {
    $ionicSlideBoxDelegate.enableSlide(true);
  } else {
    $ionicSlideBoxDelegate.enableSlide(false);
  }
};
/* $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    }; */
	
	   $scope.lftdisable1="opacity: 0.3; pointer-events: none;   cursor: default;";
 $scope.nextSlide = function() {
 $ionicSlideBoxDelegate.next();
 if($ionicSlideBoxDelegate.currentIndex()+1==$ionicSlideBoxDelegate.slidesCount()){
  $scope.rgtdisable1="opacity: 0.3; pointer-events: none;   cursor: default;";
   $scope.lftdisable1='';
 }else{
  $scope.rgtdisable1='';
  $scope.lftdisable1='';
 }
  }
  $scope.previousSlide=function(){ 
  $ionicSlideBoxDelegate.previous();
  
    if($ionicSlideBoxDelegate.currentIndex()==0){
  $scope.lftdisable1="opacity: 0.3; pointer-events: none;   cursor: default;";
  $scope.rgtdisable1='';
	}
  else{ 
  $scope.lftdisable='';
  $scope.rgtdisable='';
  }
  }
	

})

.controller('PlaylistCtrl', function ($scope, $stateParams, $location, $rootScope) {

   // Supported file
    $scope.infopage = function () {
        window.alert("Information page comes here");
        console.log($location.path());

    }
})

.controller('PlaylistCtrl', function ($scope, $stateParams, $location, $rootScope, $ionicLoading) {
    // Supported 
    $scope.show = function () {   
    };
   console.log($location.path());
    //    }
})


 .controller('MyCtrl', function ($scope, $http) {
 // Code of conduct data
            $scope.groups = [];
            resp = [{ "Description": "<div style=\"text-align:left; line-height:22px;\">The School's mission is to prepare all students to graduate with the knowledge and skills to become productive and responsible citizens. The energies of all parties will be properly focused upon academics and academic achievements in an atmosphere of high disciplinary expectations. <br \/>\u000d\u000a  <br \/>\u000d\u000a  It is the right of every student of St. Andrews School to enjoy a safe and enjoyable learning environment. <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>1.1\u0009Aims<\/strong> <br \/>\u000d\u000a  <br \/>\u000d\u000a  To ensure that every member of the school community feels valued and respected<br \/>\u000d\u000a  <br \/>\u000d\u000a  To support the way in which all members of this school community can live and work together in an environment that is happy, safe and secure and where effective learning can take place<br \/>\u000d\u000a  To promote teaching and learning through the building of good relationships based on mutual respect and consideration for others<br \/>\u000d\u000a  To help children grow in a safe, happy and secure environment and become positive, responsible and independent members of the community<br \/>\u000d\u000a  To reward good behaviour and provide encouragement and stimulation to all pupils<br \/>\u000d\u000a  To treat all children fairly and apply this policy in a consistent way<br \/>\u000d\u000a  To ensure that children are aware of the school rules and the Code of Conduct<br \/>\u000d\u000a  To teach through the school curriculum, values and attitudes as well as knowledge and skills, in order to promote responsible behaviour, self-discipline and respect for self, others and the world around us<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>1.2\u0009A Positive Approach<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  An effective discipline policy is one that seeks to lead children towards high self-esteem and self-discipline. Consequently, good discipline arises from good relationships and from setting expectations of good behaviour. It is important that children are familiar with the school ethos and the Code of Conduct. In this context, children will be rewarded for good behaviour. <br \/>\u000d\u000a  <br \/>\u000d\u000a  We use a positive system of rewards, which will include: <br \/>\u000d\u000a  <br \/>\u000d\u000a  Verbal praise<br \/>\u000d\u000a  Positive comments in books<br \/>\u000d\u000a  Special mention in class<br \/>\u000d\u000a  Informal referral to Principal. Vice-principal for commendation<br \/>\u000d\u000a  Using stars\/smiley faces on charts, books etc.<br \/>\u000d\u000a  Use of special award certificates within classrooms<br \/>\u000d\u000a  <br \/>\u000d\u000a  We reinforce good behaviour and help our children feel good about themselves <br \/>\u000d\u000a<\/div>", "Title": "1.Statement of Expectation" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">The Principal has endorsed this policy and, with the school teaching staff, will review its effectiveness. They will ensure that the policy is administered fairly and consistently. <br \/>\u000d\u000a  <br \/>\u000d\u000a  Principals are accountable through the school board for ensuring a safe, secure and harmonious work environment for students and staff<br \/>\u000d\u000a  Principals are responsible for the implementation and monitoring of the school’s discipline policy<br \/>\u000d\u000a  Principals are responsible for ensuring that the school’s policy is evaluated and reviewed by the school community at least every three years<br \/>\u000d\u000a  Principals must ensure that students and staff are provided with the relevant training in behaviour management<br \/>\u000d\u000a  Any changes to the policy must be updated on the school website and explained to students<br \/>\u000d\u000a  Principals must ensure that all disciplinary actions involving suspension or expulsion from school are consistent with the Suspension and Expulsion of School Students – Procedures<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2.1\u0009Role of Teachers<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Teacher Rights<br \/>\u000d\u000a  To be treated with respect by parents and students<br \/>\u000d\u000a  To be able to teach without disruption from students<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2.2\u0009Teacher Responsibilities<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Will adhere to the Discipline Policy<br \/>\u000d\u000a  To establish rules and directions that clearly defines the limits of acceptable and unacceptable student behaviour. (As per behaviour management training module)<br \/>\u000d\u000a  Will explain and review school and classroom rules at the beginning of the year and as necessary throughout the year (As per student rules)<br \/>\u000d\u000a  Will listen to the opinions of students and have them heard and respected as long as the opinions are expressed in a responsible and timely way<br \/>\u000d\u000a  Will encourage students to strive for personal excellence<br \/>\u000d\u000a  Will serve as role models by demonstrating enthusiasm for learning and teaching<br \/>\u000d\u000a  Will emphasize the importance of promptness and regular attendance<br \/>\u000d\u000a  Will ask for assistance from parents and administration when support is needed in handling the behaviour of students<br \/>\u000d\u000a  Will demonstrate respect and care for students<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2.3\u0009Vice-principal Responsibilities<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  V.P. must call for a report showing all behaviour infringements and take the appropriate action against students with poor behavioural patterns <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2.4\u0009Student Discipline<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  It is vital that all students understand what is expected of them. The school rules should be explained as well the consequences of breaking the rules. <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2.5\u0009Students Responsibilities<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  I have the responsibility to treat others with compassion. This means I will not laugh at others, tease others, or hurt others’ feelings<br \/>\u000d\u000a  I have the responsibility to respect others as individuals and not treat others unfairly because of weight, gender, appearance, height, ancestry, disability, etc.,<br \/>\u000d\u000a  I have the responsibility to make the school safe by not: hitting, kicking, pushing, pinching, threatening or hurting anyone<br \/>\u000d\u000a  I have the responsibility to not steal or destroy the property of others<br \/>\u000d\u000a  I have the responsibility to help maintain a calm and quiet school. This means I will not yell, scream, shout, make loud noises, or otherwise disturb others<br \/>\u000d\u000a  I have the responsibility to wear the appropriate uniform<br \/>\u000d\u000a<\/div>", "Title": "2. The Role of the Principal" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">The rules have been kept to a minimum and are clearly stated below. In the interest of good school discipline, we encourage parents and teachers to read this document with their children and to ensure that they understand the school rules fully. <br \/>\u000d\u000a  <br \/>\u000d\u000a  The school expects all students to cooperate with its efforts to implement preventive and protective measures to secure their health, safety and welfare. <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>The School Rules apply:<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Inside the school premises<br \/>\u000d\u000a  On the bus<br \/>\u000d\u000a  Extra -curricular events\/ activities<br \/>\u000d\u000a  Educational trips<br \/>\u000d\u000a  Picnics<br \/>\u000d\u000a  When in uniform<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.1\u0009Punctuality<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Students are expected to be on time for school and classes<br \/>\u000d\u000a  The gates will be opened for receiving students at 7:45 A.M.<br \/>\u000d\u000a  Students who are not in school by 8.10 A.M. will be considered late<br \/>\u000d\u000a  After 2 late arrivals in a month, students will be sent back<br \/>\u000d\u000a  The school day begins for Play School, LKG and UKG at 8:55 A. M.<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.2\u0009Attendance<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Students are expected to attend school regularly<br \/>\u000d\u000a  Leave is permissible only under special circumstances. Leave application written by the Parent\/Guardian should be sent to the Vice- Principal in advance<br \/>\u000d\u000a  Absence from school has to be notified through leave note<br \/>\u000d\u000a  Students suffering from infectious diseases will not be permitted to attend school until fully cured and medically certified to attend class<br \/>\u000d\u000a  Leave of absence will not ordinarily be given on the first and last days of the term<br \/>\u000d\u000a  A student stands liable of not being promoted due to irregular attendance<br \/>\u000d\u000a  Any student who is absent without an official reason, will be subjected to disciplinary action<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.3\u0009Uniform<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  The school uniform is to be worn in a proper manner whenever a student comes to school and at all school-related activities, including those held outside the school premises. Neatness and cleanliness in dress and person is insisted upon. The school reserves the right to send back home, those who do not conform to the prescribed uniform and appearance code. <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>1. Uniform for Girls<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  A-line dress and Bloomers for primary school girls (LKG - V)<br \/>\u000d\u000a  Blue skirt with box pleats, red and white stripped short sleeve shirt with the school logo on the left of the shirt and blue bloomers for seniors (VI-X)<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2. Uniform for Boys<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Red and white striped short sleeve shirt with the school logo on the left of the shirt<br \/>\u000d\u000a  Blue shorts for primary school boys (LKG-V), blue trousers for seniors (VI – X)<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3. Shoes and Socks<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Only black leather shoes and blue socks with red bands are allowed<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>4. Sports Uniform<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  White uniform with the respective house colours are to be worn by students from classes VI – X on the day of the Games class\u000d\u000a  Only white canvas shoes with white socks are allowed<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.4\u0009Appearances<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>1. Boys<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Boys must be neat in appearance, clean shaven and no facial hair is allowed<br \/>\u000d\u000a  Boys’ hair must be cut short and neat. Hair should not touch the collar<br \/>\u000d\u000a  Hair must not touch the eyebrows when combed down<br \/>\u000d\u000a  No long side burns are allowed. Hair must not touch the ear<br \/>\u000d\u000a  No fanciful haircut is allowed. Hair must not be tinted or dyed<br \/>\u000d\u000a  Body piercing or body art is strictly prohibited<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>2. Girls<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Girls with hair touching the lower collar must tie it up neatly with a red elastic band<br \/>\u000d\u000a  Girls with long hair need to tie it in two neat plaits with red scrunchies.<br \/>\u000d\u000a  Loose hair or fringes must be neatly pinned up<br \/>\u000d\u000a  No fanciful haircut is allowed. Hair must not be tinted or dyed<br \/>\u000d\u000a  Only a pair of simple and small ear studs are allowed<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3. Jewellery and Contact Lenses<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  No ornament or jewellery is allowed<br \/>\u000d\u000a  No tinted contact lenses will be allowed<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>4. Nails and Make-Up<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Nails are to be kept clean and short at all times. Application of nail polish and make up is not permitted<br \/>\u000d\u000a  Henna painting on any part of the body is not allowed<br \/>\u000d\u000a  Body art in any form is strictly prohibited<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>5. Hairstyles:<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Hair should always be kept neat and presentable at all times. Hair products such as hair gel should not be used. <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.5\u0009Class Rules<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Come to class on time and hand in homework and assignments on time<br \/>\u000d\u000a  Follow the teacher’s instructions immediately<br \/>\u000d\u000a  Talk in the classroom, only when permitted<br \/>\u000d\u000a  Remain in the assigned seat until permission is given to get up. Students must never leave the classroom without the teacher’s permission<br \/>\u000d\u000a  Bring the required school books and materials every day unless you are directed otherwise<br \/>\u000d\u000a  Treat others as you would like to be treated<br \/>\u000d\u000a  Respect other people’s property and person (no hitting or stealing)<br \/>\u000d\u000a  Be responsible for your own learning. (No copying or cheating)<br \/>\u000d\u000a  Do not eat sweets or other food in class unless you have been given special permission<br \/>\u000d\u000a  Laugh with all, but laugh at none<br \/>\u000d\u000a  Birthday sweets - No expensive gifts\/eatables are permitted to be distributed. Simple toffees may be distributed in class<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.6\u0009Academic Discipline<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  There should be silence during morning assembly and in the building during class hours<br \/>\u000d\u000a  Students should not litter in any part of the school premises at all times<br \/>\u000d\u000a  No student should leave the school premises during school hours without written permission from the Principal\/Vice-principal<br \/>\u000d\u000a  Playing in classrooms, in the toilets or on the corridors is strictly forbidden. Only one person at a time should leave the classroom to go to the toilet\u000d\u000a  Students must walk quietly, in a single line and in an orderly fashion, while entering or leaving the classroom, students should not run in the corridors or within the school building<br \/>\u000d\u000a  Lying, stealing and cheating are forms of dishonesty and such are unacceptable behaviours. Be honest with fellow students and teachers. Students party to acts of lying, stealing or cheating will face disciplinary action<br \/>\u000d\u000a  Students who are not feeling well and wish to go home must have the form signed by the Principal\/Vice-principal after informing the teacher in the class. The parents or guardians are to fetch the student from school. In the case of parents or guardians inability to fetch the student, the student will remain in the sick-bay until the school’s dismissal <br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.7\u0009Library Rules<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Books are issued for a week. It can be renewed for a week further<br \/>\u000d\u000a  If the book is not returned or renewed by the due date, an overdue fee is charged<br \/>\u000d\u000a  Books that are overdue by 45 days are accounted lost and borrowers will receive a bill of payment<br \/>\u000d\u000a  A fine of double the cost of book will be levied on lost and damaged books<br \/>\u000d\u000a  Losing\/damaging books and non-payment of library dues and fines will result in lack of library privileges<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.8\u0009Playground Rules<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Be kind and friendly to others<br \/>\u000d\u000a  Keep your hands and feet to yourself and no spitting<br \/>\u000d\u000a  Play safely and be in the right place at the right time<br \/>\u000d\u000a  Show respect to the school environment<br \/>\u000d\u000a  Play fairly and include others<br \/>\u000d\u000a  Respect and obey playground supervisors. All activities are subject to their approval.<br \/>\u000d\u000a  Play safe games refraining from rough play, fighting, pushing, tripping, tackle, football, throwing objects which are harmful and\/or disruptive\u000d\u000a  Do not use disrespectful or abusive language, inappropriate voice volume or scream<br \/>\u000d\u000a  Keep balls away from the windows and roofs<br \/>\u000d\u000a  Stay off mud and puddles<br \/>\u000d\u000a  Stay away from fences<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>3.9\u0009General<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Hazing, ragging, bullying and\/or any other type of verbal or physical acts of harassment of school personnel or students is prohibited forgery of school or school related documents are illegal. The school expects all students to cooperate with its efforts to implement preventive and protective measures to secure their health, safety and welfare<br \/>\u000d\u000a  Students must take reasonable care of their own safety and not place others at risk by their actions. Students must not engage in reckless or careless behaviour that might compromise the School’s preventive and protective measures, (e.g. letting off fire extinguishers without good cause or maliciously setting off the fire alarm)<br \/>\u000d\u000a  Students must adhere to the School’s fire and emergency procedures, by evacuating the building if the fire alarm sounds, and going to the emergency assembly point. They must follow any instructions given to them by fire wardens or security staff<br \/>\u000d\u000a  Students must respect all school property (classrooms, halls, stairways, bathrooms, playground, library, all equipment (lab and computer), textbooks and supplies). Pupils are expected to treat the school, school property and the school surroundings with proper care and respect. Breakages or damage caused must be reported immediately to the Principal. You are expected to treat the school and equipment with the same care and respect as you would with your own valuable personal possessions<br \/>\u000d\u000a  You are to treat all people with consideration and respect. Fighting, pushing, spitting, shoving, tripping, kicking, biting and rough horse-play are not acceptable student behaviours<br \/>\u000d\u000a  Placing of signs and slogans on school property without the permission of the proper school authority is not acceptable<br \/>\u000d\u000a  Students are responsible for the care of their own belongings, including bicycles<br \/>\u000d\u000a  Gifts to staff members is strictly prohibited <\/div>", "Title": "3. Rules for Students" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">Students should not partake of any illegal substances. The following items are prohibited inside the school premises:<br \/>\u000d\u000a  <br \/>\u000d\u000a  Pen knives<br \/>\u000d\u000a  Razors<br \/>\u000d\u000a  Glass bottles<br \/>\u000d\u000a  Alcohol\/ alcoholic beverage<br \/>\u000d\u000a  Cigarettes<br \/>\u000d\u000a  Narcotics<br \/>\u000d\u000a  Chewing gum<br \/>\u000d\u000a  Fizzy drinks<br \/>\u000d\u000a  Pornographic material<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>4.1\u0009Electronic Gadgets<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Bringing Electronic Gadgets to school is strictly prohibited. Students found in possession of any such gadget will invite stringent disciplinary action\u000d\u000a  Photographing or video-graphing persons inside the school or on the bus, with or without their knowledge is not only invasion of privacy, but also illegal and may lead to expulsion from school <\/div>", "Title": "4. Prohibited Items \/ Substances" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">Most of the following are restricted for reasons of safety or risk of damage. It is a serious breach of School regulations to be found in an Out-of-Bounds area without permission.\u000d\u000a  All school administrative offices<br \/>\u000d\u000a  <br \/>\u000d\u000a  The roof \/ terrace of all buildings<br \/>\u000d\u000a  The auditorium except for planed events<br \/>\u000d\u000a  Storerooms and workshops<br \/>\u000d\u000a  Staff quarters<br \/>\u000d\u000a  Classrooms and school buildings after 3:30 p.m.<br \/>\u000d\u000a  The staff room<br \/>\u000d\u000a  Photocopier area, unless under supervision <\/div>", "Title": "5. Out-of-Bound Areas" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">While the school provides transportation, parents remain responsible for supervision of their children until such time that the student boards the bus in the morning and after the student leaves the bus after returning from the school or other school activity<br \/>\u000d\u000a  <br \/>\u000d\u000a  Once a student boards the bus and only at that time does he\/she become the responsibility of the school. Such responsibility will end when the student is delivered to the bus stop\u000d\u000a  Students are required to conduct themselves on the bus in a manner consistent with established standards for classroom behaviour. Uniform disciplinary procedures will be enforced in a consistent manner by GM Operations with the advice of the Principal<br \/>\u000d\u000a  <br \/>\u000d\u000a  Students who become a perpetual disciplinary problem on the school bus will have their riding privileges suspended. In such cases, the parent will be totally responsible for ensuring that his\/her child is safely transported to and from school<br \/>\u000d\u000a  <br \/>\u000d\u000a  <strong>6.1\u0009Transport Rules & Regulations<\/strong><br \/>\u000d\u000a  <br \/>\u000d\u000a  Bus Pass to be carried daily. Children found without Bus Pass during routine\/surprise check will be prevented from using the facility. During this period parents are responsible for the safe transport of the child to and from school<br \/>\u000d\u000a  <br \/>\u000d\u000a  In case the Bus Pass is lost, a duplicate pass can be obtained on payment<br \/>\u000d\u000a  Temporary permission for your child to travel on a different bus route or requests for creation of new boarding points will NOT be entertained<br \/>\u000d\u000a  In case of relocation within the city, permission to travel on a new bus route is subject to availability of seating space<br \/>\u000d\u000a  In order to discontinue using the school bus, a request has to be made vide an application form available at the school transport office. Bus fee will be charged in full even if the facility has been availed for part of the month<br \/>\u000d\u000a  Application for cancellation of bus service will not be accepted after the 20th of a month and will be effective from the 1st of every month<br \/>\u000d\u000a  Application of cancellation of bus service will not be processed until all bus fee dues are cleared<br \/>\u000d\u000a  Bus fee paid for the month of April will not be refunded under any circumstance<br \/>\u000d\u000a  The Bus Pass has to be submitted along with all requests regarding cancellations\/change of bus routes<br \/>\u000d\u000a  Students misbehaving in the bus will invite disciplinary action<br \/>\u000d\u000a  Please contact the GM Operations or Transport Manager (Mobile no.) for further information <\/div>", "Title": "6. Student Conduct on School Buses" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">A Code of Sportsmanship states that the following code will be upheld by all players and spectators:<br \/>\u000d\u000a  <br \/>\u000d\u000a  The rules of any game must be regarded as mutual agreements, the spirit or letter of which no one should try to evade or break<br \/>\u000d\u000a  No advantages are to be sought over others, except the advantage of superior skill<br \/>\u000d\u000a  Officials and opponents must be regarded and treated as honest in intention<br \/>\u000d\u000a  Decisions of officials, no matter how unfair they may seem, must be accepted absolutely by players and coaches<br \/>\u000d\u000a  Visiting teams and spectators are honoured guests and should be treated as such. They should also behave as such<br \/>\u000d\u000a  To win is always desirable, but to win at any cost utterly defeats the purpose of the game<br \/>\u000d\u000a  Every team must learn that losing can be a triumph when their best has been given<br \/>\u000d\u000a  Coaches, players or spectators who do not fully support this code have no place in our representative matches <\/div>", "Title": "7. Code of Sportsmanship" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">The following are considered very serious offences and may lead to a student being dealt with severely. Sanctions could be in the form of detention, suspension or even expulsion from the school.<br \/>\u000d\u000a  <br \/>\u000d\u000a  Vandalism<br \/>\u000d\u000a  Possession of electronic gadgets<br \/>\u000d\u000a  Truancy<br \/>\u000d\u000a  Smoking in and out of school<br \/>\u000d\u000a  Stealing - including the taking of the books of others, etc., without permission<br \/>\u000d\u000a  Fighting in and out of school<br \/>\u000d\u000a  Extortion<br \/>\u000d\u000a  Threats<br \/>\u000d\u000a  Open defiance - including defying orders of those in authority, e.g. teachers, student councillors\u000d\u000a  Use of foul language and offensive body language<br \/>\u000d\u000a  Cheating during tests and examinations (all students involved will be given a zero)<br \/>\u000d\u000a  Hooliganism in and out of school<br \/>\u000d\u000a  Possession of pornographic material<br \/>\u000d\u000a  Gambling \/ Betting<br \/>\u000d\u000a  Intimacy<br \/>\u000d\u000a  Bullying<br \/>\u000d\u000a  Substance Abuse <\/div>", "Title": "8. Severe Behaviour Offences" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">Certain severe offences fall into an additional category. In cases which are particularly disruptive in nature, due to their seriousness or which represent a perceived or present danger to students, staff, or the orderly functioning of the school, the administration may seek permanent removal of a student from St. Andrews School, with immediate effect [after the said incident itself] <\/div>", "Title": "9. Critical Behaviour Offences" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">If a student has difficulty recognising his or her responsibilities in relation to the expectations we have set out, an adult in charge will intervene and respond with an appropriate action. These actions may include:<br \/>\u000d\u000a  <br \/>\u000d\u000a  Restriction of privileges and activities<br \/>\u000d\u000a  Lunch detention \/Break Detention<br \/>\u000d\u000a  Temporary isolation from the group<br \/>\u000d\u000a  Parent-student conference with school personnel<br \/>\u000d\u000a  Replacement\/repair of damaged property<br \/>\u000d\u000a  Parent contact<br \/>\u000d\u000a  In-school suspension<br \/>\u000d\u000a  Out-of-school suspension<br \/>\u000d\u000a  Expulsion<br \/>\u000d\u000a  Class exclusion<br \/>\u000d\u000a  Extra classroom work<br \/>\u000d\u000a  Verbal reprimand<br \/>\u000d\u000a  <br \/>\u000d\u000a  As might be expected, the more serious the misbehaviour, the more severe the consequence. The following are considered \"major\" acts of misconduct and will be dealt with by exclusion, suspension, expulsion, or other measures:<br \/>\u000d\u000a  <br \/>\u000d\u000a  Objectionable behaviour<br \/>\u000d\u000a  Physical assault causing pain or injury<br \/>\u000d\u000a  Use of intimidation, coercion, or force<br \/>\u000d\u000a  Initiation activities.<br \/>\u000d\u000a  Behaviours dangerous to self or others<br \/>\u000d\u000a  Wilful damage to property<br \/>\u000d\u000a  Possession or use of alcohol, illegal drugs, tobacco, or other contraband items<br \/>\u000d\u000a  Repeated violation of general expectations and classroom rules<br \/>\u000d\u000a  Use of, and\/or possession of a weapon<br \/>\u000d\u000a  Theft<br \/>\u000d\u000a  Extortion<br \/>\u000d\u000a  Belligerent behaviour including swearing or abusive language<br \/>\u000d\u000a  Defiance<br \/>\u000d\u000a  Excessive absenteeism. <\/div>", "Title": "10. Consequences for Inappropriate Behaviour" }, { "Description": "<div style=\"text-align:left; line-height:22px;\">The school will capture all behavioural infringements into the ERP system for easy tracking of student discipline. <\/div>", "Title": "11. Administrative Tracking of Discipline"}]
           $scope.sname = sessionStorage['sName'].toString();
            angular.forEach(resp, function (COC, index) {
                $scope.groups[index] = {
                    name: COC.Title,
                    items: []
                }
                $scope.groups[index].items.push(COC.Description);
            }, function (err) {
                console.error('ERR', err);
                $scope.conditions = "Error";
            })

           $scope.toggleGroup = function (group) {
                if ($scope.isGroupShown(group)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = group;
                }
            };
            $scope.isGroupShown = function (group) {
                return $scope.shownGroup === group;
            };

        })

.controller('MytimeCtrl', function ($scope, $http,$ionicLoading,$ionicTabsDelegate) {
   // Time table
    $scope.sname = sessionStorage['sName'].toString();
	var show = function () {
	   if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
               if (navigator.connection.type == Connection.CELL_2G) {
               }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                  showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };

    var hide = function () {
	  $ionicLoading.hide();
    };
	// Right swipe
	$scope.goRight=function(){
	var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
	
	}
	// Left Swipe
	$scope.goLeft=function(){
	var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
	
	}
    $scope.conditions = "";
	show();
	

    $scope.selectBranch = function () {
        $scope.table = [];
        $scope.table1 = '';
        $scope.mClassName = '';
    }
   // Used to get Time table data
     $http.get(baseurl+'webservices.php?function=sptimetable&class='+sessionStorage['sClass'].toString()+'&branch='+sessionStorage['sBranch'].toString()+'&section='+sessionStorage['sSection'].toString()+'&type=time').then(function (resp) {
	   
        console.log('First Getting Success', resp);
        $scope.conditions = resp.data;
		if($scope.conditions[0].period_no == undefined)
		{
		$scope.usermsg="Data Not Available";
		}
		hide();
    }, function (err) {
        console.error('ERR', err);
		hide();
        $scope.conditions = "Error";
    })
 
})

.controller('infoCtrl', function ($scope, $http) {
 // Information page
    $scope.sname = sessionStorage['sName'].toString();
})

.controller('MyattCtrl', function ($scope, $http,$ionicLoading) {
    // Attendance module
	$scope.currentyear=sessionStorage['scurrentacyear'];
	$scope.startyear = 	$scope.currentyear.substring(0,4);
	$scope.attenmonth=true;
	$scope.attenyear=true;
	$scope.avggg=1;
	if(sessionStorage['sPriority'] > 8 )
		{
		$scope.attenmonth=false;
		$scope.attenyear=false;
		$scope.attendmessage='No attendance for High School';
		
		}
		if(sessionStorage['sPriority'] <= 8 && sessionStorage['sPriority'] > 5)
		{
		$scope.avggg=2;
		
		}
	

	var show = function () {
	 // alert('load');
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
               if (navigator.connection.type == Connection.CELL_2G) {
               }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                  showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };

    var hide = function () {
	
        $ionicLoading.hide();
    };
    console.log('in Success MyattCtrl');
    $scope.yTotal = 0;
    $scope.yPresent = 0;
    $scope.yavg = 0;
    $scope.yavgabs = 0;

    $scope.sname = sessionStorage['sName'].toString();
    $scope.groups = [];
 
    $scope.ajan = 0;
    $scope.afeb = 0;
    $scope.amar = 0;
    $scope.aapr = 0;
    $scope.amay = 0;
    $scope.ajun = 0;
    $scope.ajul = 0;
    $scope.aaug = 0;
    $scope.asep = 0;
    $scope.aoct = 0;
    $scope.anov = 0;
    $scope.adecadec = 0;
	
	
	$scope.pajan = 0;
    $scope.pafeb = 0;
    $scope.pamar = 0;
    $scope.paapr = 0;
    $scope.pamay = 0;
    $scope.pajun = 0;
    $scope.pajul = 0;
    $scope.paaug = 0;
    $scope.pasep = 0;
    $scope.paoct = 0;
    $scope.panov = 0;
    $scope.padec = 0;
	

    $scope.myJun = false;
    $scope.myJul = false;
    $scope.myAug = false;
    $scope.mySep = false;
    $scope.myOct = false;   
    $scope.myNov = false;
    $scope.myDec = false;
    $scope.myJan = false;
    $scope.myFeb = false;
    $scope.myMar = false;
    $scope.myApr = false;
    $scope.myMay = false;
	show();
	
	// Used to get yearly calender 
    $http.get(baseurl+'webservices.php?function=spfullyearlyattendance&studentsno='+sessionStorage['sStudentId']+'&branch='+sessionStorage['sBranch']+'&class='+sessionStorage['sClass']+'&section='+sessionStorage['sSection']+'&attenddate='+$scope.currentyear+'&type=1').then(function (resp) {
        console.log('Success', resp);
        $scope.conditions = resp.data;
		$scope.fconditions = resp.data;
		hide();
		for (var i = 0; i < $scope.conditions.length; i++) {
			var d = new Date();
            var n = d.getMonth() +1 ;
			if($scope.conditions[i].amonth == n)
			{
		   $scope.mTotal = (parseInt($scope.conditions[i].worktotal) ) / $scope.avggg;
            $scope.mPresent = (parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)) / $scope.avggg;
            $scope.mavgabs = (parseInt($scope.conditions[i].absent))/ $scope.avggg;
			$scope.mavg = ($scope.mPresent / $scope.mTotal) * 100;
			}
		}
		
		
        for (var i = 0; i < $scope.conditions.length; i++) {
            $scope.yTotal += (parseInt($scope.conditions[i].worktotal))/ $scope.avggg;
            $scope.yPresent += (parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent))/ $scope.avggg;
            $scope.yavgabs += (parseInt($scope.conditions[i].absent))/ $scope.avggg;
            switch (parseInt($scope.conditions[i].amonth)) {
                case 1:
                    $scope.ajan = (parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)) ;
					$scope.pajan = Math.round(((parseInt($scope.ajan)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aajan = 100- $scope.pajan;
                    if ($scope.pajan > 0)
                        $scope.myJan = true;
                    break;
                case 2:
                    $scope.afeb = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.pafeb = Math.round(((parseInt($scope.afeb) /(parseInt($scope.conditions[i].worktotal)))*100));
					$scope.aafeb=100-$scope.pafeb;
                    if ($scope.pafeb > 0)
                        $scope.myFeb = true;
                    break;
                case 3:
                    $scope.amar = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.pamar = Math.round(((parseInt($scope.amar)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aamar=100-$scope.pamar;
                    if ($scope.pamar > 0)
                        $scope.myMar = true;
                    break;
                case 4:
                    $scope.aapr = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.paapr = Math.round(((parseInt($scope.aapr)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aaapr=100-$scope.paapr;
                    if ($scope.paapr > 0)
                        $scope.myApr = true;
                    break;
                case 5:
                    $scope.amay = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.pamay = Math.round(((parseInt($scope.amay)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aamay=100-$scope.pamay;
                    if ($scope.pamay > 0)
                        $scope.myMay = true;
                    break;
                case 6:
                    $scope.ajun = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.pajun = Math.round(((parseInt($scope.ajun)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aajun=100-$scope.pajun;
                    if ($scope.pajun > 0)
                        $scope.myJun = true;
                    break;
                case 7:
                    $scope.ajul = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.pajul = Math.round(((parseInt($scope.ajul)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aajul =100-$scope.pajul ;
                    if ($scope.pajul > 0)
                        $scope.myJul = true;
                    break;
                case 8:
                    $scope.aaug = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.paaug = Math.round(((parseInt($scope.aaug)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aaaug=100-$scope.paaug;
                    if ($scope.paaug > 0)
                        $scope.myAug = true;
                    break;
                case 9:
                    $scope.asep = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.pasep = Math.round(((parseInt($scope.asep)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aasep=100-$scope.pasep;
                    if ($scope.pasep > 0)
                        $scope.mySep = true;
                    break;
                case 10:
                    $scope.aoct = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.paoct = Math.round(((parseInt($scope.aoct)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aaoct=100-$scope.paoct;
                    if ($scope.paoct > 0)
                        $scope.myOct = true;
                    break;
                case 11:
                    $scope.anov = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.panov = Math.round(((parseInt($scope.anov)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aanov=100-$scope.panov;
                    if ($scope.panov > 0)
                        $scope.myNov = true;
                    break;
                case 12:
                    $scope.adec = parseInt($scope.conditions[i].worktotal) - parseInt($scope.conditions[i].absent)
					$scope.padec = Math.round(((parseInt($scope.adec)/(parseInt($scope.conditions[i].worktotal)) )*100));
					$scope.aadec=100-$scope.padec;
                    if ($scope.padec > 0)
                        $scope.myDec = true;
                    break;


            }

        }
        $scope.yavg = ($scope.yPresent / $scope.yTotal) * 100;
     
    });
	$scope.sname = '';
    $scope.sname = sessionStorage['sName'].toString();

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $scope.events = [];

    $scope.mTotal = 0;
    $scope.mPresent = 0;
    $scope.mavg = 0;
    $scope.mavgabs = 0;
    var v = 0;
      // Used to get monthly calender 
     $http.get(baseurl+'webservices.php?function=spyearlyattendance&studentsno='+sessionStorage['sStudentId']+'&branch='+sessionStorage['sBranch']+'&class='+sessionStorage['sClass']+'&section='+sessionStorage['sSection']+'&attenddate='+$scope.currentyear+'&type=1').then(function (resp) {
	  
        console.log('Success', resp);
		
        $scope.conditions = resp.data;
		show();
        angular.forEach(resp.data, function (att, index) {
		
		if(sessionStorage['sPriority'] <= 5)
		{
		if(att.studentabsent === 'morningpresent')
		{
        att.studentabsent='Full';
		}
		}
		   
		   $scope.events.push({ start: new Date(att.ayear, att.amonth - 1, att.adate), className: '' + att.studentabsent });
			
			
        });
		
    }, function (err) {
        console.error('ERR', err);
        $scope.conditions = "Error";
    })


	$scope.calculatemonthattendance=function(monthno,ayearr)
		{
			function findIndexInData(data, property, value,property1, value1) {
    var result = -1;
    data.some(function (item, i) {
        if (parseInt(item[property]) === parseInt(value) && parseInt(item[property1]) === parseInt(value1) ) {
		
            result = i;
            return true;
        }
    });
  
    return result;
        }
	  var index=findIndexInData($scope.fconditions, 'amonth', monthno,'year',ayearr);
 
	  if(index != -1)
	  {
	 $scope.mTotal = (parseInt($scope.fconditions[index].worktotal)) / $scope.avggg ;
       $scope.mPresent = (parseInt($scope.fconditions[index].worktotal) - (parseInt($scope.fconditions[index].absent) )) / $scope.avggg;
       $scope.mavgabs = ((parseInt($scope.fconditions[index].absent))) / $scope.avggg;
	   $scope.mavg = ($scope.mPresent / $scope.mTotal) * 100; 
	  }
	  else{
	   $scope.mTotal = 0;
       $scope.mPresent = 0;
       $scope.mavgabs = 0;
	   $scope.mavg = 0;
	  }

		}
  $scope.renderView = function(view){    
        var t = new Date(view.calendar.getDate());
		
	var d = new Date(t);
	var aa=d.getMonth();
	var ayearr=d.getFullYear();
	var monthh=aa+1;
	
	$scope.teste="Calculate "+monthh +"th month attendance";
	$scope.calculatemonthattendance(monthh,ayearr);

    };
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: false,
            header: {
               left:'title',
                center: '',
                right: 'prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
			viewRender: $scope.renderView
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];

	/* Calendar code end */
})


.controller('noticeCtrl', function ($scope, $http) {
  // Supported  
   $scope.sname = sessionStorage['sName'].toString();
})

.controller('PerformanceCtrl', function ($scope, $http, $timeout, $ionicModal,$ionicLoading,$filter) {
   // Performance module Start Scholastic
   $scope.classs=sessionStorage['sClass'];
     $scope.yearr=sessionStorage['scurrentacyear'];
  /*  var cls=sessionStorage['sClass'];
  var yr=sessionStorage['scurrentacyear']; */
  var show = function () {
	   if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
              if (navigator.connection.type == Connection.CELL_2G) {
              }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                 showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
              console.error('Cannot find Connection');
        }
    };

    var hide = function () {
	
        $ionicLoading.hide();
    };
	
	show();
	
 	$scope.schhandle=function(){
	$scope.jassesement=[];
	$scope.junsch=false;
//	$scope.assess();
	}
	
	$scope.schhandle1=function(){
	$scope.jassesement=[];
	$scope.junsch=false;
	$scope.jskill=null;
	$scope.jsubskill=null;
//	$scope.assess();
	}
	if( sessionStorage['sPriority']  > 5 )
	{
	$scope.highschool=true;
	$scope.juniorschool=false;
		
	}
	else
	{
	$scope.highschool=false;
	$scope.juniorschool=true;
	}
		function findIndexInData(data, property, value) {
         var result = -1;
          data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
   }
		$scope.emptyOrNull = function(item){
	  return !(item.prefix_1 === null || item.prefix_1.trim().length === 0)
	}
	
        
		

  
  
  
  //    Used to higher class chart data
  $scope.update = function() {

   if($scope.subj == null)
   {
	$scope.schhigh=false;
	}
			if($scope.subj !=  null)
		   {
		   
			 var asid=parseInt($scope.subj.assesssmentid);
			 var sid=parseInt($scope.ass.sub_id);
			 show();
				}
			else
			{
			$scope.schhigh=false;
		//	var asid='';
			
			}
			show();
			$scope.schhigh=false;
		//	alert(parseInt(asid) + ':'+ $scope.yearrmod.spacademicyears +':'+sessionStorage['sStudentId']+':'+parseInt($scope.ass.sub_id));
		if($scope.subj != null)
		{
 $http.get(baseurl+'scholasticgetperformance.php?assid='+asid+'&year='+$scope.yearrmod.spacademicyears+'&sno='+sessionStorage['sStudentId']+'&subject_id='+parseInt($scope.ass.sub_id)).
 then(function (resp) {
	hide();
	
	$scope.schhigh=true;
	var data = new google.visualization.DataTable(resp.data);
	
		var options = { 
			  title: null,
			   width:300, height:240,
				legend:'none',
				is3D: true,
				chartArea : {top : 40},
				colors:[{color:'#0071c1', darker:'#e12e31'}],
				  tooltip: {isHtml: true},
				  seriesType: "bars",
    series: {5: {type: "line"}}
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('chartdiv'));
			chart.draw(data, options);
			},function(error){
	       console.error('Something problem '+error);
			});
			}
			
			}
			
	// Used to junior class chart data		
   $scope.assfn = function() {
	$scope.subj=[];
	$scope.junsch=false;
	//alert($scope.jsubject + $scope.jskill +$scope.jsubskill );
	if(($scope.jsubject != null) && ($scope.jskill != null) && ($scope.jsubskill != null) )
	{
	
	
//	$scope.schhigh=false;
/*   if($scope.jsubskill !=  null)
   {
   
   }
			else
			{
			
			var sid='';
			} */
			show();
			
		//	alert($scope.jsubskill.sub_id+':'+$scope.yearrmod.spacademicyears+':'+sessionStorage['sStudentId']+':'+$scope.jassesement.assesssmentid);
    $http.get(baseurl+'scholasticgetsubjectmarks.php?sid='+$scope.jsubskill.sub_id+'&year='+$scope.yearrmod.spacademicyears+'&sno='+sessionStorage['sStudentId']+'&assid='+parseInt($scope.jassesement.assesssmentid)).
  
    success(function (data1) {
	hide();
	$scope.junsch=true;
	var data = new google.visualization.DataTable(data1);

		var options = {
			  title: null,
			   width:300, height:240,
				legend:'none',
				is3D: true,
				 colors:[{color:'#0071c1', darker:'#e12e31'}],
				chartArea : {top : 40},
				 
				  
				
			};
			var chart = new google.visualization.ColumnChart(document.getElementById('chartdiv2'));
			chart.draw(data, options);
			});
		
			}
			else
			{
			alert('Please check fields');
			}
			 }
			 
			 
			 // Used to get Assessment data
  $scope.assess = function () {
		/* var cls=sessionStorage['sClass'];
		var yr=sessionStorage['scurrentacyear']; */
		if($scope.ass == null)
		{
		$scope.highmodass=false;
	    $scope.schhigh=false;
		}
		else
		{
		$scope.highsub=true;
		$scope.highmodass=true;
	    $scope.schhigh=true;
		$scope.juniorsub=true;
		}
		if(sessionStorage['acdyear'] != $scope.yearrmod.spacademicyears)
		{
		$scope.classs=sessionStorage['prevclass'];
		
		if($scope.classs == '5')
		{
	    $scope.highschool=false;
	    $scope.juniorschool=true;
		}
		}
		else
		{
		$scope.classs=sessionStorage['sClass'];
		}
		
	
show();
 $http.get(baseurl+'webservices.php?function=spscholasticgetassessment&year='+$scope.yearrmod.spacademicyears+'&class='+$scope.classs+'&type=1').

	success(function (data2) {
	hide();
	$scope.graph11=data2;
	
	if($scope.graph11[0].assesssmentid != undefined)
	{
	$scope.highsub=true;
	$scope.juniorsub=true;
	$scope.highmodass=true;
	$scope.juniorjskill=true;
	$scope.juniorjsubskill=true;
	$scope.juniormodass=true;
	$scope.subj=$scope.graph11[0];
	 $scope.jassesement=$scope.graph11[0];
	if( sessionStorage['sPriority']  > 5 )
	{
	if($scope.ass.sub_id != "")
	{
	$scope.graph11.push({
			"assesssmentid":"",
			"priority":"0",
			"name":"All"
			})
	}
	$scope.update();
	}
	else
	{
	$scope.assfn();




if($scope.jsubject.sub_id != "")
	{
	$scope.graph11.push({
			"assesssmentid":"",
			"priority":"0",
			"name":"All"
			})
	}





	}   
	}
	else
	{
	
	$scope.juniorjskill=false;
	$scope.juniorjsubskill=false;
	$scope.juniormodass=false;
	$scope.junsch=false;
	
	$scope.highmodass=false;
	$scope.schhigh=false;
	$scope.juniorsub=false;
	$scope.scholasticmessage='Data Not Available';
//	alert('Data Not Available');
	}
	  });
	  
	  
	  
	  
		}
		
		// Used to get Subjects data
     	$scope.subject = function () {
		$scope.juniorjskill=false;
	$scope.juniorjsubskill=false;
	$scope.juniormodass=false;
	$scope.junsch=false;
	
	$scope.highmodass=false;
	$scope.schhigh=false;
	if($scope.yearrmod == null){
	$scope.highsub=false;
	$scope.juniorsub=false;
	$scope.scholasticmessage='';
	}
	
		
		if(sessionStorage['acdyear'] != $scope.yearrmod.spacademicyears)
		{
		$scope.classs=sessionStorage['prevclass'];
			
		if($scope.classs == '5')
		{
		
	     $scope.highschool=false;
	     $scope.juniorschool=true;
		}
		}
		else
		{
		$scope.classs=sessionStorage['sClass'];
		}
		
		/* var cls=sessionStorage['sClass'];
		var yr=sessionStorage['scurrentacyear']; */
		
 $scope.scholasticsection=true;    
// alert($scope.yearrmod.spacademicyears + $scope.classs);
 show();
   $http.get(baseurl+'webservices.php?function=spscholasticgetsubjects&year='+$scope.yearrmod.spacademicyears+'&class='+$scope.classs+'&type=1').

	success(function (data3) {
	hide();
	$scope.scholasticsection=true;
	$scope.scholasticmessage='';
	if(data3[0].subject == undefined)
	{

	$scope.scholasticmessage='Data Not Available';
	}
	$scope.graph12=data3;
		if( sessionStorage['sPriority']  > 5 )
		{
			$scope.graph12.push({
			"sub_id":"",
			"class":"",
			"subject":"All Subjects",
			"isactive":"Y",
			"max_marks":"100",
			"priority":"-1",
			"acyear":null,
			"prefix_1":null,
			"prefix_2":null,
			"priority1":null,
			"priority2":null	
			})
			var index=findIndexInData($scope.graph12, 'subject', "All Subjects"); 
			$scope.ass=$scope.graph12[index];
			
		}
		else
		{
	$scope.jsubject=$scope.graph12[0];
	$scope.jskill=$scope.graph12[0];
	$scope.jsubskill=$scope.graph12[0];
	    }
	 $scope.assess();
		  });
		  	
		     
		}
		$scope.yearr=function(){
			 $http.get(baseurl+'webservices.php?function=spgetcurrentacyearperformance&type=1').then(function (resp) {
		$scope.getacyearper=resp.data;
		 $scope.academicYears = [{ "id": "1", "spacademicyears": $scope.getacyearper[0].current_acd_year }, { "id": "2", "spacademicyears": $scope.getacyearper[0].previous_acd_year }];
		    $scope.yearrmod=$scope.academicYears[0];
			
			$scope.subject();
		    })
			}
			
			$scope.coyearr=function(){
			 $http.get(baseurl+'webservices.php?function=spgetcurrentacyearperformance&type=1').then(function (resp) {
		$scope.getacyearper=resp.data;
		 $scope.academicYears = [{ "id": "1", "spacademicyears": $scope.getacyearper[0].current_acd_year }, { "id": "2", "spacademicyears": $scope.getacyearper[0].previous_acd_year }];
		    $scope.myear=$scope.academicYears[0];
			$scope.callcosch();
			
		    })
			}
		// Start co-scholastic 
	
    $scope.pgroups = [];
    $scope.psgroups = [];
   $scope.sname = sessionStorage['sName'].toString();
   $scope.coscholasticsection=true;
    $scope.callcosch=function(){
	 
	 $scope.mMainskills=[];
	 $scope.msubskills=[];
	 
	 if($scope.myear == null){
	 $scope.coscholasticsection=false;
	 $scope.coscholasticmessage='';
	 }
	
	if(sessionStorage['acdyear'] != $scope.myear.spacademicyears)
		{
		$scope.classs=sessionStorage['prevclass'];
		if($scope.classs == '5')
		{
		
	     $scope.highschool=false;
	     $scope.juniorschool=true;
		}
		}
		else
		{
		$scope.classs=sessionStorage['sClass'];
		}
     show();
    $http.get(baseurl+'webservices.php?function=spcoscholastic&year='+$scope.myear.spacademicyears+'&class='+$scope.classs+'&studentno='+sessionStorage['sStudentId']+'&type=1').then(function (resp) {
        console.log('Success', resp);
        $scope.conditions = resp.data;
		 $scope.coscholasticsection=true;
		$scope.coscholasticmessage='';
		$scope.mMainskills=$scope.conditions[0];
		$scope.msubskills=$scope.conditions[0];
		if($scope.conditions[0].mainskills == undefined)
		{
		 $scope.coscholasticsection=false;
		$scope.coscholasticmessage='Data Not Available';
		}
	hide();
     
		  $scope.tett=function()
		  {
		  	$scope.msubskills=[];
		
		  }
		  
  $scope.itest = function(data){
		
			if(($scope.msubskills != null) && ($scope.mMainskills != null))
			{
			return ((data.sub_name ==  $scope.msubskills.sub_name) && (data.mainskills ==  $scope.mMainskills.mainskills));
			}
			
		}      
    },
    function (err) {
        console.error("ERR", err);
        $scope.conditions = "Error";
    });
           }
		   
		   /******* Filter ***********/
		   
		   $scope.jsubjectf=function(data)
		   {
		   if(($scope.jsubject != null))
		   {
		   return ((data.prefix_1 ==  $scope.jsubject.prefix_1));
		   }
		   }
		    $scope.jsubskillf=function(data)
		   {
		   if(($scope.jsubject != null) && $scope.jskill != null)
		   {
		   return ((data.prefix_1 ==  $scope.jsubject.prefix_1) && (data.prefix_2 ==  $scope.jskill.prefix_2));
		   }
		   }
		   
		     $scope.mskills = function(data){
			if(($scope.mMainskills != null))
			{
			return ((data.mainskills ==  $scope.mMainskills.mainskills));
			}
		    }
            /******* Filter ***********/			
		   

})

.controller('PlaylistCtrl', function ($scope, $ionicLoading) {
   // Supported
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Loading...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
})

.filter('unique', function () {
   // Unique filter
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        /* for (var i = 0; i < input.length; i++) {
            if (typeof unique[input[i][key]] == "undefined") {
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        } */
		
		 angular.forEach(input, function (att, index) {
		  if (typeof unique[input[index][key]] == "undefined") {
                unique[input[index][key]] = "";
                uniqueList.push(input[index]);
            }
		 
		 })
		
        return uniqueList;
    };
})

.filter("asDate", function () {
   // Date filter
    return function (input) {
	
        return new Date(input);
    }
})

.filter('myFilter', function () {

  // custom Filter
    return function (inputs, filterValues) {

        var output = [];
        angular.forEach(inputs, function (input) {
            if (filterValues.indexOf(input.name) !== -1)
                output.push(input);
        });
        return output;
    };
})



.controller('feectrl', function ($scope, $http, $timeout, $ionicModal, $ionicActionSheet, $ionicLoading,$state) {
// Fee module
$scope.sname = sessionStorage['sName'].toString();
$scope.feetotal=0;
$scope.disableSelect = true;
  var show = function () {
	 
        if (window.Connection) {
            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
               
                if (navigator.connection.type == Connection.CELL_2G) {
               }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                    
                    showBackdrop: true
                });
                setTimeout(function () { hide(); }, 10000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };

    var hide = function () {
	
        $ionicLoading.hide();
    };

  $scope.testpay= function (){
	        var fselectedmonth=$scope.feetst.monthdisplay;
	         
			 var d=new Date();
			 var t=d.getTime();
			 var txn=sessionStorage['sStudentId']+t;
			 var today = new Date();
             var cdate=today.toISOString().substring(0, 10);
			  $http.get(baseurl+'webservices.php?function=spfeeinsertpymttotal_temp&month_paid='+fselectedmonth+'&receiptno=ONLINE123&acyear='+sessionStorage['scurrentacyear']+'&total_amount='+$scope.ftotal+'&stdclass='+sessionStorage['sClass']+'&studentno='+sessionStorage['sStudentId']+'&paid_date='+cdate+'&mode_of_payment=online&onlineid='+txn+'&txnid=temp&status=sent&type=1').then(function (resp) {
		
			 
			 for(var i=0;i<$scope.displaymonthsamount.length;i++)
			{				
	
			 $http.get(baseurl+'webservices.php?function=spfeeinsertpymtdetail_temp&studentno='+sessionStorage['sStudentId']+'&feehead_code='+$scope.displaymonthsamount[i].feehead_code+'&month_paid='+fselectedmonth+'&amount='+$scope.displaymonthsamount[i][$scope.feetst.month]+'&receiptno=ONLINE123&branchcol=B&status=sent&txnid=temp&txn_code='+txn+'&type=1').then(function (resp) {
				
			 })
            }
            for(var i=0;i<$scope.displayyearlypay.length;i++)
			{
				if($scope.feetst.month == $scope.displayyearlypay[0].firstmonth)
				{
			$http.get(baseurl+'webservices.php?function=spfeeinsertpymtdetail_temp&studentno='+sessionStorage['sStudentId']+'&feehead_code='+$scope.displayyearlypay[i].feehead_code+'&month_paid='+fselectedmonth+'&amount='+$scope.displayyearlypay[i].amount+'&receiptno=ONLINE123&branchcol=B&status=sent&txnid=temp&txn_code='+txn+'&type=1').then(function (resp) {
				
			 })
				}
			}
			if($scope.finepay != 0)
				{
			$http.get(baseurl+'webservices.php?function=spfeeinsertpymtdetail_temp&studentno='+sessionStorage['sStudentId']+'&feehead_code=200&month_paid='+fselectedmonth+'&amount='+$scope.finepay+'&receiptno=ONLINE123&branchcol=B&status=sent&txnid=temp&txn_code='+txn+'&type=1').then(function (resp) {
				
			 })
				}
				if($scope.buspayy != 0)
				{
			$http.get(baseurl+'webservices.php?function=spfeeinsertpymtdetail_temp&studentno='+sessionStorage['sStudentId']+'&feehead_code=111&month_paid='+fselectedmonth+'&amount='+$scope.buspayy+'&receiptno=ONLINE123&branchcol=B&status=sent&txnid=temp&txn_code='+txn+'&type=1').then(function (resp) {
				
			 })
				}
				if($scope.linfinepay != 0)
				{
			$http.get(baseurl+'webservices.php?function=spfeeinsertpymtdetail_temp&studentno='+sessionStorage['sStudentId']+'&feehead_code='+$scope.displaylibfines[0].fine_code+'&month_paid='+fselectedmonth+'&amount='+$scope.linfinepay+'&receiptno=ONLINE123&branchcol=B&status=sent&txnid=temp&txn_code='+txn+'&type=1').then(function (resp) {
				
			 })
				}
				

             
	           var sname=sessionStorage['sName'].toString();
 
			  $state.go('app.feepaygateway',{"amt":$scope.ftotal,"tcode": txn});
				
			},function(error){
			 console.log('error', error);
			 }) 
				
				
  }
	$scope.testclick = function(monthh,monthhno,monthhd){
	       
			var mftotal=$scope.displaymonthsamount;
			var yftotal=$scope.displayyearlypay;
			var bftotal=$scope.displaybuspay;
			var fselectedmonth=monthh;
			var fselectedmonthno=monthhno;
			$scope.ftotal=0;
			$scope.buspayy=0;
			$scope.finepay=0;
			$scope.linfinepay=0;
			$scope.feefines=[];
			

		var feedays=("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf($scope.feetst11.monthdisplay) / 3);
			
			var monthlib=("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(monthhd) / 3) + 1;
			
			var d = new Date();
			d.setDate(1);
			d.setMonth(feedays);
			if($scope.feetst11.monthdisplay =='JAN' || $scope.feetst11.monthdisplay =='FEB' || $scope.feetst11.monthdisplay =='MAR')
			{
			d.setYear(d.getYear+1);
			}
			 var todaydate=new Date();
			 var yearlib=todaydate.getFullYear();
			 if(todaydate.getMonth() < d.getMonth())
			 {
			 d.setYear(d.getFullYear()-1);
			 }
			
			var one_day=1000*60*60*24;
			var dayscompleted=Math.ceil((todaydate.getTime()-d.getTime())/(one_day)); 
			
			
			if(bftotal != undefined)
			{
			for(var i=0;i<bftotal.length;i++)
			{
			if($scope.displaybuspay[i].monthno === fselectedmonthno)
			{
			
			   $scope.buspayy= parseInt($scope.displaybuspay[i].amt);
				$scope.ftotal += parseInt($scope.displaybuspay[i].amt);
		
			}						 
			}
			}
			

				
				
				//  Library Fines
			if($scope.displaylibfines[0].amount != undefined)
		{
		$scope.linfinepay=parseInt($scope.displaylibfines[0].amount);
			$scope.ftotal += parseInt($scope.displaylibfines[0].amount);
		}	
				
				
		
			for(var i=0;i<mftotal.length;i++)
			{				
			$scope.ftotal += parseInt($scope.displaymonthsamount[i][fselectedmonth]);
             		
		//	alert(fselectedmonth+';'+$scope.displaymonthsamount[i].feehead_code +':'+$scope.displaymonthsamount[i].feehead_name+':'+$scope.displaymonthsamount[i][fselectedmonth]);
			
			}
			for(var i=0;i<yftotal.length;i++)
			{
				if(monthhd == $scope.displayyearlypay[0].firstmonth)
				{
			$scope.ftotal += parseInt($scope.displayyearlypay[i].amount);	
				}
							 
			}
			
			// Late fee 
			
			if(($scope.ftotal != 0))
			{
				if((parseInt($scope.displaylatefeefine[0].dayofmon) <= parseInt(dayscompleted)) && (parseInt($scope.displaylatefeefine[1].dayofmon) >= parseInt(dayscompleted)) && ($scope.feecont != (23 || 2)))	
	        { 
			
		     $scope.feefines.push({
				'feehead_code':'200',
                'feehead_name':'Late Fee',
                'amount':$scope.displaylatefeefine[0].amount			
			 });
			 $scope.finepay=parseInt($scope.displaylatefeefine[0].amount);
			 $scope.ftotal += parseInt($scope.displaylatefeefine[0].amount);
			
			//	alert(dayscompleted+' Days late '+':'+ ' Pay Rs '+$scope.displaylatefeefine[0].amount+' fine');
			}
			else
				if((parseInt($scope.displaylatefeefine[1].dayofmon) <= parseInt(dayscompleted)) && ($scope.feecont != (23 || 2)))
				{
			  
					$scope.feefines.push({
				'feehead_code':'200',
                'feehead_name':'Late Fee',
                'amount':$scope.displaylatefeefine[1].amount			
			 });
			 $scope.finepay=parseInt($scope.displaylatefeefine[1].amount)
			 $scope.ftotal += parseInt($scope.displaylatefeefine[1].amount);
		
				}
				}
				else
				{
				$scope.feeeee=false;
				$scope.nofeemsg='No Fee available';
				}
		//	alert(fselectedmonthno);
			$scope.onpayment=true;
			hide();
			

		}
		
		$scope.getfeepaymonthss=function()
		{
		$scope.testclick($scope.feetst11.month,$scope.feetst11.no,$scope.feetst11.monthdisplay);
		}


     show();
	$http.get(baseurl+'webservices.php?function=spfeepaiddetails&year='+sessionStorage['scurrentacyear']+'&stdclass='+sessionStorage['sClass']+'&studentno='+sessionStorage['sStudentId']+'&type=1').
        success(function (data) {
			$scope.displaymonths=data;
			
			$scope.feeeee=true;
			$scope.feepaiddiv=true;
			$scope.feehistory=true;
			
			if($scope.displaymonths[0].month_paid === undefined)
			{
			$scope.sfee=[];
			$scope.feepaiddiv=false;
			$scope.feehistory=false;
			$scope.feehistorymessage='No History available';
		   //hide();
			//$scope.messagee='Paid details not found';
			}
			else
			{
			$scope.feeeee=true;
			$scope.sfee=$scope.displaymonths[0];
			
			}
			
			$http.get(baseurl+'webservices.php?function=spfeegetmonths&year='+sessionStorage['sStudentId']+'&stdclass='+sessionStorage['sClass']+'&type=1').
        success(function (data) {
			$scope.displaymonthspay=data;
			if($scope.displaymonthspay[0].months == undefined)
			{
			$scope.duemessage='Previous academic year having dues';
			}
			
			
			$scope.monthvar=[];
			function findIndexInData(data, property, value) {
         var result = -1;
          data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
   }
   
   for (var i=0;i<data.length;i++)
			{
				var mon=data[i].months;
				if($scope.displaymonths[0].month_paid != undefined)
				{
          var index=findIndexInData($scope.displaymonths, 'month_paid', mon); 
		  var aa=index.toString();
		        }
				else
				{
				var aa='-1'
				}
		  
		   if(aa =='-1')
		  { 
			$scope.monthvar.push({
				'month':mon.toLowerCase(),
				'no':data[i].monthno,
				'monthdisplay':mon
				
			});	
			}
			}
			if($scope.monthvar[0] != undefined)
			{
			$scope.paycurmonth=true;
			}
			else{
			$scope.paymsg='No Month to be paid';
			}
			$scope.feetst=$scope.monthvar[0];
			$scope.feetst11=$scope.monthvar[0];
		
			$http.get(baseurl+'webservices.php?function=spfeeconcession&year='+sessionStorage['scurrentacyear']+'&ac_no='+sessionStorage['sStudentId']+'&type=1').
        success(function (data) {
			if(data[0].fee_code== undefined)
			{
				$scope.checkconcession="Not applicable for fee concession";
				$http.get(baseurl+'webservices.php?function=spfeepayyearly&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&stdclass='+sessionStorage['sClass']+'&type=1').
        success(function (data) {
			$scope.displayyearlypay=data;
			$scope.displayyearlypay=[];
			
			for(var i=0;i<data.length;i++)
			{ 
				$scope.feetotal += parseInt(data[i].amount)
			$scope.displayyearlypay.push({
				'feehead_code':data[i].feehead_code,
				'feehead_name':data[i].feehead_name,
				'firstmonth': $scope.displaymonthspay[0].months,
				 'amount':data[i].amount
				
			});
			
			}
			
			
			$http.get(baseurl+'webservices.php?function=spfeepaybus&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&ac_no='+sessionStorage['sStudentId']+'&class='+sessionStorage['sClass']+'&type=1').
        success(function (data) {
			if(data[0].applicant_no != undefined)
			{
			$scope.displaybuspay=[];
			for (var i=0;i<data.length;i++)
			{
			$scope.displaybuspay.push({
				
				'feehead_code':'111',
				'feehead_name':'Bus Fee',
				'applicant_no':data[i].applicant_no,
				'amt':data[i].amt,
				'month':data[i].month,
				'monthno':data[i].monthno
			});
			}
			
			}
			
			$http.get(baseurl+'webservices.php?function=spfeepaymonth&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&stdclass='+sessionStorage['sClass']+'&type=1').
        success(function (data) {
			$scope.displaymonthsamount=data;
			
			$scope.testclick($scope.feetst.month,$scope.feetst.no,$scope.feetst.monthdisplay);
			
		});
			
			
			});
			
			
		});
		
	
			}
			else
			{
			
			$scope.feecont=data[0].typeid;
				$scope.checkconcession=data;
				$http.get(baseurl+'webservices.php?function=spfeepayyearlyc&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&stdclass='+sessionStorage['sClass']+'&studentno='+sessionStorage['sStudentId']+'&type=1').
        success(function (data) {
			$scope.displayyearlypay=[];
			hide();
			for(var i=0;i<data.length;i++)
			{ 
				$scope.feetotal += parseInt(data[i].amount)
			$scope.displayyearlypay.push({
				'feehead_code':data[i].feehead_code,
				'feehead_name':data[i].feehead_name,
				'firstmonth': $scope.displaymonthspay[0].months,
				 'amount':data[i].amount
				
			});
			
			}
				$http.get(baseurl+'webservices.php?function=spfeepaybus&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&ac_no='+sessionStorage['sStudentId']+'&class='+sessionStorage['sClass']+'&type=1').
        success(function (data) {
			if(data[0].applicant_no != undefined)
			{
			$scope.displaybuspay=[];
			for (var i=0;i<data.length;i++)
			{
			$scope.displaybuspay.push({
				
				'feehead_code':'111',
				'feehead_name':'Bus Fee',
				'applicant_no':data[i].applicant_no,
				'amt':data[i].amt,
				'month':data[i].month,
				'monthno':data[i].monthno
			});
			}
			
			}
			
			$http.get(baseurl+'webservices.php?function=spfeepaymonthc&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&stdclass='+sessionStorage['sClass']+'&studentno='+sessionStorage['sStudentId']+'&type=1').
        success(function (data) {
			$scope.displaymonthsamount=data;
		//	hide();
		$scope.testclick($scope.feetst.month,$scope.feetst.no,$scope.feetst.monthdisplay);
		});
			
		});
		});
		
		
		
			}
		});
		});
		
		$http.get(baseurl+'webservices.php?function=spfeefine&year='+sessionStorage['scurrentacyear']+'&branch='+sessionStorage['sBranch']+'&type=1').
        success(function (data) {
			$scope.displaylatefeefine=data;
		//	alert(data[0].dayofmon);
		});
				$http.get(baseurl+'webservices.php?function=spfeepaylibfines&class='+sessionStorage['sClass']+'&section='+sessionStorage['sSection']+'&ac_no='+sessionStorage['sStudentId']+'&type=1').
        success(function (data) {
		
			$scope.displaylibfines=data;
	
			
		});
	
		
		

			
		});
		

	
	$scope.movetofeepaypage=function()
	{
	$state.go('app.feepaypage');
	}
	
})


.controller('feectrlgateway', function ($scope, $http, $timeout, $ionicModal, $ionicActionSheet, $ionicLoading,$state,$sce,$stateParams) {
// Fee module payment page
$scope.sname = sessionStorage['sName'].toString();
$scope.amtt=$stateParams.amt;
$scope.codee=$stateParams.tcode;

$scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
  $scope.movie = {src:baseurl+'payumoney/index.php?name='+$scope.sname+'&amt='+$scope.amtt+'&tcode='+$scope.codee, title:"Egghead.io AngularJS Binding"};


})



.controller('PTMeeting', function ($scope, $http, $timeout, $ionicModal, $ionicActionSheet, $ionicLoading) {
// Parent teacher meeting module
if(sessionStorage['sPriority'] > 5)
{
$scope.hidesubjectmeet=true;
}
            

 	 var show = function () {

        if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
               if (navigator.connection.type == Connection.CELL_2G) {
               }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                  showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };
	   var hide = function () {
        $ionicLoading.hide();
    };
	
	
			 $scope.sname = sessionStorage['sName'].toString();
	         $scope.sBranch=sessionStorage['sBranch'].toString();
             $scope.sClass=sessionStorage['sClass'].toString();
             $scope.sSection=sessionStorage['sSection'].toString();

			 
			  function refreshdata(a){
			  
			  $scope.sumeeting();
		 $http.get(baseurl+'webservices.php?function=spptmcheckslotbooking&meetid='+$scope.meetingidd+'&studentid='+sessionStorage['sStudentId']+'&class='+sessionStorage['sClass']+'&section='+sessionStorage['sSection']+'&branch='+sessionStorage['sBranch']+'&type=1').
        success(function (data) {
			$scope.checkBooking=data;
			//alert($scope.checkBooking);
            $scope.sfromtime=$scope.checkBooking[0].fromtime;
			if($scope.checkBooking.length != 1)
			{
			$scope.schedulebtn=true;
			$scope.modifyschedulebtn=false;
			}
			else
			{
            $scope.schedulebtn=false;
			$scope.modifyschedulebtn=true;
			$scope.sfromtime=$scope.checkBooking[0].fromtime;
			$scope.stotime=$scope.checkBooking[0].totime;
		var aa=new Date($scope.mdateee);
		aa.setHours($scope.sfromtime.slice(0, -6));
		aa.setMinutes($scope.sfromtime.slice(3, -3));
		   $scope.activeClass=aa;
		   $scope.iPcount1 = function(data){
	return (parseInt(data.count) < parseInt($scope.pcount) && data.Time != aa  );
			
		}
		
			}
		})
          
		   }
			

$http.get(baseurl+'webservices.php?function=spptmeetschedule&fromclass='+$scope.sClass+'&branch='+sessionStorage['sBranch'].toString()+'&section='+$scope.sSection+'&type=1').
        success(function (data) {
			$scope.ptmettingsection=true;
            $scope.DataPTMetting = data;
			$scope.mdatee=$scope.DataPTMetting[0];
			$scope.meetingDate=$scope.DataPTMetting[0].cmeetdate;
			$scope.teacherName=$scope.DataPTMetting[0].teacher_name;
			$scope.mdateee=$scope.mdatee.meetdate;
			$scope.meetingidd=$scope.mdatee.meetid;
			$scope.sParentId=sessionStorage['sParentId'];
			$scope.pcount=$scope.mdatee.pcount;
			$scope.meettime_interval=$scope.mdatee.time_interval;
			
			if($scope.DataPTMetting[0].cmeetdate == undefined)
			{
			$scope.ptmettingsection=false;
			$scope.message='No Schedules found';
			}
			
			  
		
			var totimec = new Date($scope.DataPTMetting[0].starttime);
				var fromtimec = new Date($scope.DataPTMetting[0].endtime);
				var timeInterval;
				var timeIntervals=[];
				$scope.checkIntervals=[];
				do{
					var timeInterval='';
					
				timeInterval=timeInterval+totimec;

				var checkaltertime=new Date(timeInterval);
							 var chh=checkaltertime.getHours();
							 var cmm=checkaltertime.getMinutes();
							 var ctotaltime=chh+':'+cmm;
							 
							 for(var i=0;i<$scope.DataPTMetting.length;i++)
						{ 
							$scope.mdatee=$scope.DataPTMetting[i];
							var con_date_from1=$scope.mdateee + ' '+$scope.mdatee.fromtime1;
						
							var checkaltertime1=new Date(con_date_from1);
							 var chh1=checkaltertime1.getHours();
							 var cmm1=checkaltertime1.getMinutes();
							 var ctotaltime1=chh1+':'+cmm1;
						
							if(ctotaltime == ctotaltime1)
							{
								$scope.check_count='';
							$scope.check_count=$scope.mdatee.pcount1;
							$scope.checkIntervals.push({ 
						"Time" : ctotaltime,
						"Scheduled" :$scope.check_count
					});
							}
							
						}
					
				timeIntervals.push({ 
						"Time" : timeInterval,
						"count" : $scope.check_count
					});
					$scope.check_count=0;
				if($scope.DataPTMetting[0].time_interval == '')
				{
				$scope.DataPTMetting[0].time_interval=10;
				}
				totimec=new Date(totimec.getTime() + ($scope.DataPTMetting[0].time_interval * 60 * 1000));
				}
				while(totimec<fromtimec)
				
				$scope.Configinterval=timeIntervals;
				$scope.ConfigintervalSubject=timeIntervals;
                
				// Call refresh data function If any slots booked. 
				refreshdata($scope.meetingidd);	 
	})
	
	 $scope.onclickof=function(data)
  {
	  $scope.activeClass = data;
  }
	
		$scope.scheduleslot=function(){
			if(typeof $scope.activeClass != "undefined")
			{
			var totimes = new Date($scope.activeClass);
		   var totimess=new Date(totimes.getTime() + ($scope.DataPTMetting[0].time_interval * 60 * 1000));
		   $scope.slottotime=totimess;
		   
			 var fromaltertime=new Date($scope.activeClass);
			 var fhh=fromaltertime.getHours();
			 var fmm=fromaltertime.getMinutes();
			 var ftotaltime=fhh+':'+fmm;
			 
			 var toaltertime=new Date($scope.slottotime);
			 var thh=toaltertime.getHours();
			 var tmm=toaltertime.getMinutes();
			 var ttotaltime=thh+':'+tmm;
	          show();
 $http.get(baseurl+'webservices.php?function=spptminsertschedule&meetid='+$scope.meetingidd+'&parentid='+$scope.sParentId+'&studentid='+sessionStorage['sStudentId']+'&class='+$scope.sClass+'&section='+$scope.sSection+'&branch='+$scope.sBranch+'&fromtime='+ftotaltime+'&totime='+ttotaltime+'&meetdate='+$scope.mdateee+'&type=1').
		      
      then(function (data) {       
				   $scope.bookedresult = true;
				   alert('Scheduled Meeting Slot. Thank you');
				   $scope.schedulebtn=false;
       
				   refreshdata();
				   hide();
			   
		},function(error){
		 alert('Something Problem. Try again later');
		 hide();
		})
		}
		else
		{
			alert('Please select slot');
		}
		}
		
		
		$scope.modifyscheduleslot=function()
		{
		var totimes = new Date($scope.activeClass);
		   var totimess=new Date(totimes.getTime() + ($scope.DataPTMetting[0].time_interval * 60 * 1000));
		   $scope.slottotime=totimess;
		
		
		 var fromaltertime=new Date($scope.activeClass);
			 var fhh=fromaltertime.getHours();
			 var fmm=fromaltertime.getMinutes();
			 var ftotaltime=fhh+':'+fmm;
			 
		 var toaltertime=new Date($scope.slottotime);
			 var thh=toaltertime.getHours();
			 var tmm=toaltertime.getMinutes();
			 var ttotaltime=thh+':'+tmm;
			  show();	
		 
		$http.get(baseurl+'webservices.php?function=spptmupdatemeeting&meetid='+$scope.meetingidd+'&parentid='+$scope.sParentId+'&fromtime='+ftotaltime+'&totime='+ttotaltime+'&type=1').
        then(function (data) {  
			alert('Updated your meeting slot Thank you.');
				hide();
			 refreshdata();
		}, function (err) {
             alert('Something Problem. Try again later');
			 hide();
        })
		
		
		}
		
		$scope.deletescheduleslot=function()
		{
		show();
	 $http.get(baseurl+'webservices.php?function=spptmdeletemeeting&meetid='+$scope.meetingidd+'&studentid='+sessionStorage['sStudentId']+'&type=1').     
      then(function(data) { 
      refreshdata();	  
	  hide();
	  alert('Slot Deleted');
	  },function(error){
	  alert('Something Problem. Try again later');
	  hide();
	  }
	  
	  )}
	  
	  
	
	 

/* ------------------ Stm -- */

$scope.sumeeting=function()
{
 $scope.DataSubjectinfo=[];
//alert($scope.meetingidd);
 $http.get(baseurl+'webservices.php?function=spptmgetallsubjectlist&class='+ sessionStorage['sClass']+'&acyear='+sessionStorage['scurrentacyear']+'&studentid='+sessionStorage['sStudentId']+'&meetid='+$scope.meetingidd+'&type=1').  
  success(function (data) {
		  $scope.DataSubjectinfo=data;
		})
		
$scope.timecolumns = [{"id":"subjectname","name":"Subject"},{"id":"fromtime","name":"From Time"},{"id":"totime","name":"To Time"}];
	
  $scope.onclickof=function(data)
  {
	  $scope.activeClass = data;
   // alert(data);
  }
   $scope.onclickofSubject=function(data)
  {
	  $scope.activeClass1 = data;
	var convertime=new Date($scope.activeClass1);
			 var chh=convertime.getHours();
			 var cmm=convertime.getMinutes();
			 var ctotaltime=chh+':'+cmm;
			 
			// var totimes = new Date($scope.sfromtimeinfo.Time);
		var totimess=new Date(convertime.getTime() + ($scope.meettime_interval * 60 * 1000));
		$scope.slottotime1=totimess;
			 
			 var convertime1=new Date($scope.slottotime1);
			 var chh1=convertime1.getHours();
			 var cmm1=convertime1.getMinutes();
			 var ctotaltime1=chh1+':'+cmm1;
			 
			 if(typeof $scope.ssubjectinfo.subject != "undefined")
            {
				if(typeof $scope.activeClass1 != "undefined")
				{
				var vsubject=$scope.ssubjectinfo.subject;

 show();		


$http.get(baseurl+'webservices.php?function=spptmsubjectinsertschedule&meetid='+ $scope.meetingidd +'&studentid='+sessionStorage['sStudentId']+'&subjectname='+$scope.ssubjectinfo.subject+'&fromtime='+ctotaltime+'&totime='+ctotaltime1+'&meetdate='+$scope.mdateee+'&type=1').
        success(function (data) {
		
		alert('Inserted success');
   $scope.addsubject.push({ 
        "subjectname" : vsubject,
		"fromtime" : ctotaltime,
		 "totime" : ctotaltime1
		 
    });
			hide();
		})
	function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
}

var index=findIndexInData($scope.DataSubjectinfo, 'subject', $scope.ssubjectinfo.subject);
	$scope.DataSubjectinfo.splice(index,1);
	//alert(index);
			}
			else
			{
				alert('Please select time slot ');
			}
			}
			else
			{
				alert('Please select subject');
			}
$scope.ssubjectinfo='';

		//  }
		  
		  
  }
  
  	 
		  $scope.addsubject = [];
		$http.get(baseurl+'webservices.php?function=spptmgetscheduledsubjects&meetid='+$scope.meetingidd+'&studentid='+sessionStorage['sStudentId']+'&type=1').  
					success(function (data) {
						if(typeof data[0].subjectname != "undefined")
						{
							$scope.addsubject=data;
						}
						
						
					})
		          
				  $scope.a = {
                            b: false
                              };
							  $scope.onItemDelete = function(item) {
							  show();
				
		  $http.get(baseurl+'webservices.php?function=spptmdeletesubjectmeeting&meetid='+$scope.meetingidd+'&subject='+$scope.addsubject[$scope.addsubject.indexOf(item)].subjectname+'&studentid='+sessionStorage['sStudentId']+'&type=1').
			    
					success(function (data) {
					 // $scope.DataSubjectinfo=data;
					 
					 				  $scope.DataSubjectinfo.push({ 
        "subject" : $scope.addsubject[$scope.addsubject.indexOf(item)].subjectname
		
                                            });
					  $scope.addsubject.splice($scope.addsubject.indexOf(item), 1);
					   hide();
		
					})
				
  
	
  };
		
	
}
			 
		

})



.controller('AwardsTest', function ($scope, $http, $timeout, $ionicModal, $ionicActionSheet, $ionicLoading) {
 // Awards module

 
    var show = function () {

        if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
                // alert(navigator.connection.type);
                if (navigator.connection.type == Connection.CELL_2G) {
                  //  alert('You are Connected 2g network for better performance pls connect 3g/WiFi');
                }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                    
                    showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }
    };

    var hide = function () {
        $ionicLoading.hide();
    };
	
$http.get(baseurl+'webservices.php?function=spdisplaystudentaward&branch='+sessionStorage['sBranch']+'&ClassName='+sessionStorage['sClass']+'&stdno='+sessionStorage['sStudentId']+'&type=1').then(function (resp) {
		
		$scope.studentawrdss=resp.data;
		if($scope.studentawrdss != 'false')
		{
		$scope.awardstudent=true;
		}
		else
		{
		//$scope.defaultmsg='No Awards achieved';
		$scope.defaultmsg='';
		}
		
		},function(error){
		 console.log('something problem');
		})
   function findIndexInData(data, para1, value,para2, value1) {
    var result = -1;
    data.some(function (item, i) {
        if (item[para1] === value && item[para2] === value1 ) {
            result = i;
            return true;
        }
    });
    return result;
}




    $scope.data = {};
    var varYear = "";
    var varBranch = "";
    var varClass = "";
    var varAward = "";
    $scope.data.columns = [{ "id": "studentid_fk", "name": "Student_ID" }, { "id1": "studentname", "name1": "Name" }, { "id2": "classname", "name2": "Class" }, { "id3": "section", "name3": "Section"}];
    $scope.data.Classcolumns = [{ "id": "subcategoryname", "name": "AWARDS" }, { "id1": "studentid_fk", "name1": "ID" }, { "id2": "studentname", "name2": "NAME"}];
    $scope.sname = sessionStorage['sName'].toString();
	
	// Functions to use onclick events
	$scope.selectYear = function () {
        $scope.table = [];
        $scope.table1 = '';
        $scope.mBranches = '';
        $scope.mClassName = '';
		$scope.mAwardes = '';
    }
    $scope.selectBranch = function () {
        $scope.table = [];
        $scope.table1 = '';
        $scope.mClassName = '';
		$scope.mAwardes = '';
        $scope.ClassAwards = [];

    }

    $scope.selectClasses = function () {
	$scope.table = [];
	 $scope.mAwardes = '';
		if($scope.mBranches == null){
			alert('Please Select Branch');
		}
		else
		{
        if ($scope.mAwardes) {
          //  $scope.displayData();
        }
		}
		show();
		$http.get(baseurl+'webservices.php?function=spawardsname&acyear='+$scope.mAcademicyear.spacademicyears+'&branch='+$scope.mBranches.branchname+'&class='+$scope.mClassName.class+'&type=1').then(function (resp) {
           
		   hide();
		   if( resp.data == 'false')
		   {
		   $scope.noawmessage='Data Not Available';
		   }
		   else
		   {
		   $scope.mAwardes=='';
		   $scope.defaultmsg='';
		   $scope.noawmessage='';
		   $scope.Awards = resp.data;
		   
		   //$scope.mAwardes=$scope.Awards[0];
		   }

        },function(error){
		// alert('Something error');
		});
    }

    $scope.selectBranchC = function () {
       // $scope.mCSection = '';
        $scope.ClassAwards = [];
		$scope.AwardResponse='';
    }
    $scope.selectClassC = function () {
	    $scope.AwardResponse='';
		$scope.mCSection=null;
		if($scope.mCBranches == null)
		{
			alert('Please Select Branch');
		}
		else
		{
        $scope.ClassAwards = [];
		}
    }
	
	
    // Load the All dropdowns

        show();
	
					
					$scope.academicYears = [{ "id": "1", "spacademicyears": sessionStorage['scurrentacyear'] }, { "id": "2", "spacademicyears": sessionStorage['spreviousyear'] }];

            $scope.mAcademicyear = $scope.academicYears[0];
            $scope.mCAcademicyear = $scope.academicYears[0];

			
			$http.get(baseurl+'webservices.php?function=spbranch&type=1').then(function (resp) {
            $scope.DataBranch = resp.data;
		   var index=(findIndexInData($scope.DataBranch, 'branchname', sessionStorage['sBranch']));
			$scope.mBranches=$scope.DataBranch[index];
            $scope.mCBranches=$scope.DataBranch[index];
			
			
			$http.get(baseurl+'webservices.php?function=spclassname&type=1').then(function (resp) {
       
            $scope.Classes = resp.data;
			var index=(findIndexInData($scope.Classes, 'branchname', sessionStorage['sBranch'],'class', sessionStorage['sClass']));
			$scope.mClassName=$scope.Classes[index];
			$scope.mCClassName=$scope.Classes[index];
			$scope.selectClasses();
			
			 $http.get(baseurl+'webservices.php?function=spsection&type=1').then(function (resp) {
       
             hide();
            $scope.Sections = [];
            
			//alert($scope.Sections);
			if(resp.data != 'false')
			{
			$scope.Sections = resp.data;
			var index=(findIndexInData($scope.Sections, 'section', sessionStorage['sSection'],'classname', sessionStorage['sClass']));
			$scope.mCSection=$scope.Sections[index];
		//	$scope.displayClassAwards();
			}
			else
			{
			$scope.AwardResponse='Data Not Available';
			}
        });
        });
			
        });
		
		 $http.get(baseurl+'webservices.php?function=spawardsname&type=1').then(function (resp) {
					$scope.awardname=resp.data; 
					
					})
			
  


    $scope.displayData = function () {
	$scope.defaultmsg='';
//	$scope.AwardResponse = '';
	$scope.awardstudent=false;
		if($scope.mAcademicyear == null  || $scope.mBranches == null || $scope.mClassName == null || $scope.mAwardes == null )
		{
			//alert('Please check fields');
		}
		else
		{
      //  show();
        $scope.table = [];

        varYear = $scope.mAcademicyear.spacademicyears;
        varBranch = $scope.mBranches.branchname;
        varClass = $scope.mClassName.class;
        varAward = $scope.mAwardes.subcategoryname;
		
		 $scope.awardsection = true;
	  
	 
		}
    };

    $scope.displayClassAwards = function () {
	 $scope.AwardResponse = '';
       if(  $scope.mCAcademicyear == null || $scope.mCClassName == null  || $scope.mCSection == null || $scope.mCBranches == null )
	   {
		  // alert('Please check fields');
	   }
			else
			{	
				//   show();
			
        $scope.ClassAwards = [];


        varYear = $scope.mCAcademicyear.spacademicyears;
        varBranch = $scope.mCBranches.branchname;
        varClass = $scope.mCClassName.class;
        varSection = $scope.mCSection.section;
		 $scope.classawardsection = true;
	
			}
    }
	
	/**********Filter *******/
	
	$scope.mclass=function(data){
	if($scope.mBranches != null)
	{
			return ((data.branchname ==  $scope.mBranches.branchname));			
	}
	}
	$scope.mCCfilter=function(data){
	if($scope.mCBranches != null)
	{
			return ((data.branchname ==  $scope.mCBranches.branchname));			
	}
	}
	
	$scope.mCSfilter=function(data){
	if( ($scope.mCBranches != null) && ($scope.mCClassName != null)   )
	{
			return ((data.classname ==  $scope.mCClassName.class) && ($scope.mCClassName.branchname ==  $scope.mCBranches.branchname) );			
	}
	}
	
	
	$scope.tableaward=function(data){
	if( ($scope.mBranches != null) && ($scope.mClassName != null) && ($scope.mAwardes != null)  )
	{
			return ( (data.academicyear ==  $scope.mAcademicyear.spacademicyears) &&  (data.branch ==  $scope.mBranches.branchname) && (data.classname ==  $scope.mClassName.class)  && (data.subcategoryname ==  $scope.mAwardes.subcategoryname));			
	}
	}
	
	$scope.classaward=function(data){
	if( ($scope.mCBranches != null) && ($scope.mCClassName != null) && ($scope.mCSection != null)  )
	{
			return ( (data.academicyear ==  $scope.mCAcademicyear.spacademicyears) &&(data.branch ==  $scope.mCBranches.branchname) &&(data.classname ==  $scope.mCClassName.class)  && (data.section ==  $scope.mCSection.section));			
	}
	}
	
	/**********Filter *******/

    
})

 .controller('MapCtrl', function($scope, $ionicLoading, $compile,$http) {
  // GPS module 
 $scope.sname = sessionStorage['sName'].toString();
  var show = function () {

        if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
                // alert(navigator.connection.type);
                if (navigator.connection.type == Connection.CELL_2G) {
                  //  alert('You are Connected 2g network for better performance pls connect 3g/WiFi');
                }

                $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                    
                    showBackdrop: true
                });
                setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }



    };

    var hide = function () {
        $ionicLoading.hide();
    };
	
      function initialize() {
	  show();
	      $http.get(baseurl+'webservices.php?function=spgpsvehicleno&year='+sessionStorage['scurrentacyear']+'&studentno='+sessionStorage['sStudentId']+'&type=1').then(function (resp) {
        console.log('Success', resp);
		$scope.vnumber=resp.data;
		$scope.busnum=$scope.vnumber[0].vehicleno;
		hide();
	//	alert($scope.vnumber[0].vehicleno);
		if($scope.vnumber[0].vehicleno != undefined)
		{
	  $http.get('http://standrewsws.eliteprocon.in/StAndrewsGPSService/Get/'+$scope.vnumber[0].vehicleno).
				success(function (data) {
				$scope.gpsdata=data;
				//alert($scope.gpsdata[0].Latitude);
				  if($scope.gpsdata[0].Latitude == "")
	   {
	   $scope.usermsg="Your bus number data not available";
	   }
	   else
	   {
	  
        var myLatlng = new google.maps.LatLng($scope.gpsdata[0].Latitude,$scope.gpsdata[0].Longitude);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        }
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: ''
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
		})
		}
		else{
		$scope.usermsg="Student doesn’t travel by school bus";
		}
		})
      }
	  initialize();
   
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
      //  alert('Example of infowindow with ng-click')
      };
      
    })

.directive('actualSrc', function () {
// Supported
    return{
        link: function postLink(scope, element, attrs) {
            attrs.$observe('actualSrc', function(newVal, oldVal){
                 if(newVal != undefined){
                     var img = new Image();
                     img.src = attrs.actualSrc;
                     angular.element(img).bind('load', function () {
                         element.attr("src", attrs.actualSrc);
                     });
                 }
            });

        }
    }
})
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {

      scope.$watch(function() {
          return attrs['ngSrc'];
        }, function (value) {
          if (!value) {
            element.attr('src', attrs.errSrc);  
          }
      });

      element.bind('error', function() {
        element.attr('src', attrs.errSrc);
      });
    }
  }
})

 .controller('feedback', function ($scope, $http) {
 
 $scope.submitfeedback=function(){
 if(($scope.rating == 1) || ($scope.rating == 2)|| ($scope.rating == 3)|| ($scope.rating == 4)|| ($scope.rating == 5))
 {
  $http.get(baseurl+'webservices.php?function=spfeedbackinsert&studentno='+sessionStorage['sStudentId']+'&rating='+$scope.rating+'&comments='+$scope.comments+'&type=time').then(function (resp) {
	alert('Thank you for your valuable feedback');
	$scope.comments="";
	},function(error)
	{
	console.log(error);
	})
	}
	else
	{
	alert('Please give your rating');
	}
 }
 
 })
.controller('syllabus', function($scope, $ionicScrollDelegate, $timeout,$cordovaFileTransfer,$ionicLoading) {

$scope.sname = sessionStorage['sName'].toString();
$scope.classn = sessionStorage['sClass'].toString();
   var show = function () {

        if (window.Connection) {

            if (navigator.connection.type == Connection.NONE) {
                alert('There is no internet connection available');
            } else {
                
                if (navigator.connection.type == Connection.CELL_2G) {
               }
                 
				 $ionicLoading.show({
                    template: '<div class="loading120"></div>',
                  showBackdrop: true
                });
           setTimeout(function () { hide(); }, 40000);

            }
        } else {
            alert('Cannot find Connection');
        }



    };

    var hide = function () {
        $ionicLoading.hide();
    };
	
	$scope.downloadSyllabus=function(){
      show();
 var url = "http://183.82.8.39:9090/syllabus/"+sessionStorage['sClass']+".jpg";
    var targetPath = cordova.file.externalRootDirectory  + "Download/class"+sessionStorage['sClass']+".jpg";
    var trustHosts = true
    var options = {};
    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
	      hide();
        alert('Downloaded. Please check in file manager download folder.');
      }, function(err) {
                alert('error');
      }, function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100000000;
        })
      });
 }
	
  $timeout(function(){
    //return false; // <--- comment this to "fix" the problem
    var sv = $ionicScrollDelegate.$getByHandle('horizontal2').getScrollView();

  });
  $timeout(function(){
    //return false; // <--- comment this to "fix" the problem
    var sv = $ionicScrollDelegate.$getByHandle('horizontal2').getScrollView();

    var container = sv.__container;

    var originaltouchStart = sv.touchStart;
    var originalmouseDown = sv.mouseDown;
    var originaltouchMove = sv.touchMove;
    var originalmouseMove = sv.mouseMove;

    container.removeEventListener('touchstart', sv.touchStart);
    container.removeEventListener('mousedown', sv.mouseDown);
    document.removeEventListener('touchmove', sv.touchMove);
    document.removeEventListener('mousemove', sv.mousemove);
    

    sv.touchStart = function(e) {
      e.preventDefault = function(){}
      originaltouchStart.apply(sv, [e]);
    }

    sv.touchMove = function(e) {
      e.preventDefault = function(){}
      originaltouchMove.apply(sv, [e]);
    }
    
    sv.mouseDown = function(e) {
      e.preventDefault = function(){}
      originalmouseDown.apply(sv, [e]);
    }

    sv.mouseMove = function(e) {
      e.preventDefault = function(){}
      originalmouseMove.apply(sv, [e]);
    }

    container.addEventListener("touchstart", sv.touchStart, false);
    container.addEventListener("mousedown", sv.mouseDown, false);
    document.addEventListener("touchmove", sv.touchMove, false);
    document.addEventListener("mousemove", sv.mouseMove, false);
  });

});
