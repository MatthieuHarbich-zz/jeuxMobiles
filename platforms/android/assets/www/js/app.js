// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
<<<<<<< HEAD
angular.module('aquarium', ['ionic','timer','aquarium.auth', 'aquarium.constants', 'aquarium.home', 'aquarium.games'])
=======
angular.module('aquarium', ['ionic', 'aquarium.auth', 'aquarium.constants', 'aquarium.home', 'aquarium.games','aquarium.wash','aquarium.flash','aquarium.trash','aquarium.music'])
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
  
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.run(function(AuthService, $rootScope, $state) {

  
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    
    // if (!AuthService.currentUserId && toState.name != 'login') {

      
    //   $state.go('login');
    // }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {




$ionicConfigProvider.tabs.position('bottom'); 


  $stateProvider


    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller:'appCtrl'
      
      
    })

    .state('app.home', {
      url: '/home',
       views: {
        
        'app-home': {
  
          templateUrl: 'templates/home.html',
          controller:'homeCtrl'
          
        }
      }
    })

    .state('app.games', {
      url: '/games',
       views: {
        
        'app-home': {
  
          templateUrl: 'templates/games.html',
          controller:'gamesCtrl'
          
        }
      }
    })

    .state('app.flash', {
      url: '/flash',
<<<<<<< HEAD
=======
      cache : false,
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
       views: {
        
        'app-home': {
  
          templateUrl: 'templates/flash.html',
          controller:'flashCtrl'
          
        }
      }
    })

    .state('app.trash', {
      url: '/trash',
<<<<<<< HEAD
=======
      cache : false,
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
       views: {
        
        'app-home': {
  
          templateUrl: 'templates/trash.html',
          controller:'trashCtrl'
          
        }
      }
    })

    .state('app.wash', {
      url: '/wash',
<<<<<<< HEAD
=======
      cache : false,
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
       views: {
        
        'app-home': {
  
          templateUrl: 'templates/wash.html',
          controller:'washCtrl'
          
        }
      }
    })

    

    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
    })

<<<<<<< HEAD
    .state('register', {
      url: '/register',
      controller: 'registerCtrl',
      templateUrl: 'templates/register.html'
    })

=======
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
   
  ;

  
  $urlRouterProvider.otherwise(function($injector) {
<<<<<<< HEAD
    $injector.get('$state').go('login'); 
=======
    $injector.get('$state').go('app.home'); 
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
  });


});


