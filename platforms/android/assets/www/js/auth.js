angular.module('aquarium.auth', ['angular-storage'])

  .service('AuthService', function($rootScope, store) {
    $rootScope.currentUserId = store.get('currentUserId'); // récupérer dans le localstorage
    var service = {
      currentUserId: store.get('currentUserId'),

      setUser: function(user) {
        service.currentUserId = user.userId;
        store.set('currentUserId', user.userId);
        $rootScope.currentUserId = store.get('currentUserId');
      },

      unsetUser: function() {
        service.currentUserId = null;
        store.remove('currentUserId');
        $rootScope.currentUserId = store.get('currentUserId');

<<<<<<< HEAD
      },

      postPhoto: function(imageData, callback){
        
         $http({
              method: "POST",
              url: "https://warm-bastion-3094.herokuapp.com/api/images",
              headers: {
                Authorization: "Bearer " + "Py7n9/utjzJmYotOoOPnPgmd+x+C8YP9AifhsquC8sVGDNiSEmskPNows5WXKEl6P5W9gBlROZIZl0+kj1iDAMyGnM+w4l75BRWij7rNLJIcHRA8QB2CUUpl5lMtbsOoTJobWO+P/J7oLyt/YGMHMLOqh70ylcr+eYQXYSanjrk=",
                "Content-Type": "application/json"
              },
                data: {
                data: imageData
              }
            }).success(function(data) {

             
              callback(null, data.url);
              
            }).error(function(data){
                

                //attention au callback
            });
      }
      
=======
      }
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
    };

    return service;
  })

<<<<<<< HEAD
.factory('CameraService', function($q){
    return{
      getPicture: function(options){
        var deferred = $q.defer();

        alert('get picture');
        navigator.camera.getPicture(function(result){
          
          deferred.resolve(result);
        }, function(err){
         
          deferred.reject(err);
        }, options);

        return deferred.promise;
      }
    }
  })  

  .controller('LoginCtrl', function(apiUrl,CameraService, AuthService, $http, $ionicHistory, $ionicLoading, $scope, $state) {

    // The $ionicView.beforeEnter event happens every time the screen is displayed.
    
      // Re-initialize the user object every time the screen is displayed.
      // The first name and last name will be automatically filled from the form thanks to AngularJS's two-way binding.
      $scope.user = {};
      $scope.users = {};

     $scope.getPhoto = function() {
          alert('in get photo')
          CameraService.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false,
            destinationType: navigator.camera.DestinationType.DATA_URL
          }).then(function(imageData) {
            alert(imageData);
            $http({
              method: "post",
              url: qimgUrl + "/images",
              headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + qimgToken
              },
              data: {
                data: imageData
              }
            }).success(function(data) {
              $scope.newIssue.photo = data.url;
              alert(data);
              $state.go('register');

            });
          }, function(err) {
            alert("erorr" + err);

            $scope.error = err;
          });

        };
    


    $scope.moveToRegister = function(){
      $state.go('register');
    }
=======
  .controller('LoginCtrl', function(apiUrl, AuthService, $http, $ionicHistory, $ionicLoading, $scope, $state) {

    // The $ionicView.beforeEnter event happens every time the screen is displayed.
    $scope.$on('$ionicView.beforeEnter', function() {
      // Re-initialize the user object every time the screen is displayed.
      // The first name and last name will be automatically filled from the form thanks to AngularJS's two-way binding.
      $scope.user = {};
    });

>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
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

<<<<<<< HEAD
  .controller('registerCtrl', function(CameraService, AuthService, $scope, $state) {
    
     $scope.$on('$ionicView.beforeEnter', function(){
        
      })

     
    
      if (navigator.camera) {
                   CameraService.getPicture({
                    quality: 75,
                    targetWidth: 400,
                    targetHeight: 300,
                    destinationType: Camera.DestinationType.DATA_URL
                    }).then(function(imageData) {
                        

                       
                    });
                  }
   

    
  })

=======
>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b

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