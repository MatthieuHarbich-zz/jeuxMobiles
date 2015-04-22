angular.module('aquarium.auth', ['angular-storage'])

  .service('AuthService', function($rootScope, store) {
   
        
    

    
    $rootScope.currentUserId = store.get('currentUserId');
    console.log(store.get('currentUserId')); // récupérer dans le localstorage
    console.log(store.get('currentUserSalt')); // récupérer dans le localstorage
    $rootScope.image = {};
    var service = {
      currentUserId: store.get('currentUserId'),

      response: function(response){
            if (response.status === 401) {
            }

            return response || $q.when(response);
      },
      responseError: function(rejection) {
          var reservedPaths = ['/', '/mycube', '/connect', '/event'];
          if (rejection.status === 401 && _.contains(reservedPaths, $location.path().trim())) {
              var stateService = $injector.get('$state');
              var httpService = $injector.get('$http');
              stateService.go('home');
          }
          return $q.reject(rejection);
      },

      setUser: function(user) {
        service.currentUserId = user._id;
        store.set('currentUserId', user._id);
        $rootScope.currentUserId = store.get('currentUserId');
      },

      setSalt: function(user) {
        service.currentUserSalt = user.salt;
        store.set('currentUserSalt', user.salt);
        $rootScope.currentUserSalt = store.get('currentUserSalt');
      },

      unsetUser: function() {
        service.currentUserId = null;
        store.remove('currentUserId');
        $rootScope.currentUserId = store.get('currentUserId');

      } 

      
    };

    return service;
  })

.factory('CameraService', function($q){
    return{
      getPicture: function(options){
        var deferred = $q.defer();

      
        navigator.camera.getPicture(function(result){
          
          deferred.resolve(result);
        }, function(err){
         
          deferred.reject(err);
        }, options);

        return deferred.promise;
      }
    }
  })  

  .controller('LoginCtrl', function(apiUrl,CameraService, AuthService, $http, $ionicHistory,$rootScope, $ionicLoading, $scope, $state) {

    // The $ionicView.beforeEnter event happens every time the screen is displayed.
    
      // Re-initialize the user object every time the screen is displayed.
      // The first name and last name will be automatically filled from the form thanks to AngularJS's two-way binding.
      $scope.user = {};
      $scope.users = {};

      $scope.login = function(pseudo, password){
          console.log('login');

          console.log(pseudo + password);
          $http({
              method: "POST",
              url: apiUrl + "/users/login",
              data: 
                {
               "pseudo" : pseudo,
                "hashedPassword" : password 
            }
              
            }).success(function(data) {

              $rootScope.user = data.user;
              $rootScope.userScore = data.scores;
              AuthService.setUser(data);
              $ionicLoading.hide();
              $ionicHistory.nextViewOptions({
		    disableBack: true,
		    historyRoot: true
		});
              $state.go('app.home');
              console.log(data);

              AuthService.setUser(data.user);
              
            }).error(function(data){
                console.log(data);
                $ionicLoading.hide();
                alert('Probleme d authentification');
                //attention au callback
            });

      };



     $scope.newUser = function(pseuedo, email, password, imgId){
      alert(imgId);
      $ionicLoading.show({
	    template: 'Register in...',
	    delay: 750
	});
      $http({
              method: "POST",
              url: apiUrl + "/users",
              data: 
                {
                pseudo: pseuedo,
                email: email,
                hashedPassword:password,
                imgId: '5532da73f2e8e1fc04335f0d'
              }
              
            }).success(function(data) {
                $ionicLoading.hide();
              console.log(data);
              $rootScope.newUser = data;
              console.log('lig');
              console.log(pseuedo + password);
              $scope.login(pseuedo, password);
              AuthService.setUser(data.user);
              AuthService.setSalt(data.user);

              
            }).error(function(data){
                $ionicLoading.hide();
                alert('Probleme d authentification');
                //attention au callback
            });
     }

     
      

     $scope.getPhoto = function() {
         
          CameraService.getPicture({
            quality: 75,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            correctOrientation: true
          }).then(function(imageData) {
            
            $scope.imageData = imageData; 
            $http({
              method: "post",
              url: apiUrl + "/images",
              headers: {
                "Content-type": "application/json"
              },
              data: {
                imgBase64: imageData
              }
            }).success(function(data) {
              
              $rootScope.image.imageId = data;
             
              $state.go('register');

            }).error(function(error){

              alert('errror' + error);


            });
          }, function(err) {
            alert("erorr" + err);

            $scope.error = err;
          });

        };
    


    $scope.moveToRegister = function(){
      $state.go('register');
    }
    // Add the register function to the scope.
    $scope.register = function() {

      // Forget the previous error (if any).
      delete $scope.error;

      

      // Show a loading message if the request takes too long.
      $ionicLoading.show({
        template: 'Logging in...',
        delay: 750
      });

      // Make the request to retrieve or create the user.
      $http({
        method: 'POST',
        url: apiUrl + '/users/logister',
        data: $scope.user
      }).success(function(user) {

        // If successful, give the user to the authentication service.
        AuthService.setUser(user);
        AuthService.setSalt(user);

        // Hide the loading message.
        $ionicLoading.hide();

        // Set the next view as the root of the history.
        // Otherwise, the next screen will have a "back" arrow pointing back to the login screen.
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });

        // Go to the issue creation tab.
        $state.go('app.map');

      }).error(function() {

        // If an error occurs, hide the loading message and show an error message.
        $ionicLoading.hide();
        $scope.error = 'Could not log in.';
      });
    };
  })

  .controller('LogoutCtrl', function(AuthService, $scope, $state) {
    
    $scope.logOut = function() {
      AuthService.unsetUser();
      console.log('logout');
      $state.go('login');
    };

    
  })

  .controller('rankingCtrl', function($http, $rootScope, apiUrl, CameraService, AuthService, $scope, $state) {
    
    // $scope.isBetterRanking(4,9);
    $scope.isBetterRanking = function(avantDernierRank, actualRank){
      console.log('avant dernier '  + avantDernierRank);
      console.log('actuel ' + actualRank);
      if(avantDernierRank > actualRank){
        return true;
      }else{
        return false;
      }
    }
     
    
    
   

    
  })


  .factory('AuthInterceptor', function(AuthService) {
    return {

      // The request function will be called before all requests.
      // In it, you can modify the request configuration object.
      request: function(config) {

        // If the user is logged in, add the X-User-Id header.
        if (AuthService.currentUserId) {
          config.headers['X-User-Id'] = AuthService.currentUserId;
        }

        return config;
      }
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
;