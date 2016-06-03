angular.module('starter', ['ionic','ui.calendar', 'starter.services', 'starter.controllers' ])
.run(function ($ionicPlatform, $state) {
    $ionicPlatform.registerBackButtonAction(function (event) {
        navigator.app.backHistory();
    }, 100)

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
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })
    .state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html"
            }
        }
    })
    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html",
                controller: 'noticeCtrl'
            }
        }
    })
     .state('app.Performance', {
         url: "/Performance",
         views: {
             'menuContent': {
                 templateUrl: "templates/performance.html",
                 controller: 'PerformanceCtrl'
             }
         }
     })
     .state('app.Syllabus', {
         url: "/Syllabus",
         views: {
             'menuContent': {
                 templateUrl: "templates/Syllabus.html"
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
            'menuContent': {
                templateUrl: "templates/playlists.html",
                controller: 'PlaylistsCtrl'
            }
        }
    })
    .state('app.month', {
        url: "/month",
        views: {
            'menuContent': {
            templateUrl: "templates/month.html",
            controller: 'calendar'
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
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    })
    .state('app.ClassAwards', {
         url: "/ClassAwards",
         views: {
             'menuContent': {
                 templateUrl: "templates/ClassAwards.html",
                 controller: 'AwardsTest'
             }
         }
     })
     .state('app.Awards', {
         url: "/Awards",
         views: {
             'menuContent': {
                 templateUrl: "templates/Awards.html",
                 controller: 'AwardsTest'
             }
         }
     })
    .state('app.Graphs', {
        url: "/Graphs",
        views: {
            'menuContent': {
                templateUrl: "templates/Graphs.html",
                controller: 'MyCtrl1'
            }
        }
    })
     .state('app.SuccessPage', {
         url: "/SuccessPage",
         views: {
             'menuContent': {
                 templateUrl: "templates/information.html",
                 controller: 'infoCtrl'
             }
         }
     })
    .state('app.InfoPage', {
        url: "/InfoPage",
        templateUrl: "templates/browse.html"
    })
    .state('app.InfoPage2', {
        url: "/InfoPage",
        templateUrl: "templates/information.html"
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/playlists');
})
.controller('calendar', function ($scope) {

    $scope.name = 'matthew';

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.events = [
    { title: 'All Day Event', start: new Date(y, m, 1) },
    { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
    { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
    { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
    { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
    { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
  ];

    /* remove event */
    $scope.remove = function (index) {
        $scope.events.splice(index, 1);
    };

    $scope.previousEntries = function () {
        $scope.myCalendar.fullCalendar('prev');
    }

    $scope.nextEntries = function () {
        $scope.myCalendar.fullCalendar('next');
    }

    $scope.todayEntries = function () {
        $scope.myCalendar.fullCalendar('today');
    }

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: false,
            header: false,
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];
})