 angular.module('starter', ['ionic','ngRoute', 'ui.calendar','eventapp','ngCordova'])
.run(function ($ionicPlatform, $state) {
    $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.playlists"){
     // navigator.app.exitApp();
    }
	else
	 if($state.current.name=="app.login"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);


    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })


/*     .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html",
          controller:'noticeCtrl'
        }
      }
    }) */
     .state('app.Performance', {
         url: "/Performance",
         views: {
             'menuContent': {
                 templateUrl: "templates/performance.html",
                 controller: 'PerformanceCtrl'
             }
         }
     })

     .state('app.syllabus', {
         url: "/syllabus",
         views: {
             'menuContent': {
                 templateUrl: "templates/syllabus.html"
             }
         }
     })
	    .state('app.login', {
         url: "/login",
         views: {
             'menuContent': {
                 templateUrl: "templates/login.html",
				 controller: 'login'
             }
         }
     })
	 
	    .state('app.circularnotice', {
         url: "/circularnotice",
         views: {
             'menuContent': {
                 templateUrl: "templates/circularnotice.html"
             }
         }
     })
      .state('app.Attendance', {
          url: "/Attendance",
          views: {
              'menuContent': {
                  templateUrl: "templates/attendance.html",
                  controller: 'MyattCtrl'
              }
          }
      })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
})


 .state('app.coc', {
     url: "/coc",
     views: {
         'menuContent': {
             templateUrl: "templates/coc.html",
             controller: 'MyCtrl'    
         }
     }
 })
 .state('app.feedback', {
     url: "/feedback",
     views: {
         'menuContent': {
             templateUrl: "templates/feedback.html",
             controller: 'feedback'    
         }
     }
 })
  .state('app.fee', {
     url: "/fee",
     views: {
         'menuContent': {
             templateUrl: "templates/fee.html",
             controller: 'feectrl'    
         }
     }
 })
   .state('app.feepaygateway', {
     url: "/feepaygateway/:amt/:tcode",
     views: {
         'menuContent': {
             templateUrl: "templates/feepaygateway.html",
             controller: 'feectrlgateway'    
         }
     }
 })
  .state('app.gps', {
     url: "/gps",
     views: {
         'menuContent': {
             templateUrl: "templates/gps.html",
             controller: 'MapCtrl'    
         }
     }
 })

  .state('app.time', {
      url: "/time",
      views: {
          'menuContent': {
              templateUrl: "templates/timetable.html",
              controller: 'MytimeCtrl'    
          }
      }
  })
   
    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
})

 
    .state('app.Exam', {
        url: "/Exam",
        views: {
            'menuContent': {
                templateUrl: "templates/Exam.html",
                controller: 'examsallCtrl'
				
            }
        }
    })

    .state('app.Graphs', {
      //  url: "/Graphs",
        url: "/Graphs/:examId",
        views: {
            'menuContent': {
                templateUrl: "templates/Graphs.html",
                controller: 'examCtrl'
				
            }
        }
    })
       .state('app.Examall', {
        url: "/Examall/:examId",
        views: {
            'menuContent': {
                templateUrl: "templates/Examall.html",
                controller: 'examCtrl'
				//params: {new_param: null}
            }
        }
    })
/*end ****/	   

     .state('app.Awards', {
         url: "/Awards",
         views: {
             'menuContent': {
                 templateUrl: "templates/Awards.html",
                 controller: 'AwardsTest'
             }
         }
     })
	      .state('app.p_t_meeting', {
         url: "/p_t_meeting",
         views: {
             'menuContent': {
                 templateUrl: "templates/PTMeeting.html",
                 controller: 'PTMeeting'
             }
         }
     })
	      .state('app.feepaypage', {
         url: "/feepaypage",
         views: {
             'menuContent': {
                 templateUrl: "templates/feepaypage.html",
                 controller: 'feectrl'
             }
         }
     })
	   .state('app.support', {
         url: "/support",
         views: {
             'menuContent': {
                 templateUrl: "templates/support.html"
             }
         }
     })


  /*  .state('app.Graphs', {
        url: "/Graphs",
        views: {
            'menuContent': {
                templateUrl: "templates/Graphs.html",
                controller: 'MyCtrl1'
            }
        }
    })*/
       
     .state('app.SuccessPage', {
      url: "/SuccessPage",
      views: {
        'menuContent' :{
            templateUrl: "templates/information.html", 
            controller: 'infoCtrl'        
        }
      }    
    })
  
    .state('app.InfoPage2', {
      url: "/InfoPage",
      templateUrl: "templates/information.html"       
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

