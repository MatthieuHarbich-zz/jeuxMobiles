angular.module('aquarium.games', [])

<<<<<<< HEAD
  .factory('GameFactory', function($http, apiUrl) {

      return{


        

    };   

  })

  .controller('gamesCtrl', function(HomeFactory, $window, $scope){


    	
    console.log($window.innerHeight);

    $scope.height = ($window.innerHeight + 3) / 3;

    $scope.heightStyle = ""+$scope.height+"px";
     
      console.log($scope.heightStyle);

      $scope.myStyle = {
		    "height" : $scope.heightStyle
		};
        $scope.myStyleScore = {
        "height" : $scope.heightStyle,
        "line-height": $scope.heightStyle
    };



  })

   .controller('flashCtrl', function(HomeFactory,$state, $window, $scope){
    
    $scope.moveToFlash = function(){

      $state.go('app.flash');
    }

    

  })

   .controller('trashCtrl', function(HomeFactory, $state, $window, $scope){
    
    $scope.moveToTrash = function(){
      $state.go('app.trash');
    }

    console.log("trash");   

  })

   .controller('washCtrl', function(HomeFactory, $state, $window, $scope){
    
    $scope.moveToWash = function(){
      $state.go('app.wash');
    }

    console.log("wash");   

  })
  
;
=======
        .factory('GameFactory', function ($http, apiUrl) {

            return{
            };

        })

        .controller('gamesCtrl', function (HomeFactory, $window, $scope,musicController,$ionicPlatform) {



            console.log($window.innerHeight);

            $scope.height = ($window.innerHeight - 42) / 3;

            $scope.heightStyle = "" + $scope.height + "px";

            console.log($scope.heightStyle);

            $scope.myStyle = {
                "height": $scope.heightStyle
            };
            
            
            $ionicPlatform.on('resume', function () {

                    musicController.stopAmbianceMusique();
                    
                });



        })





        

        .controller('washDirection', function ($state, $window, $scope, $ionicPopup, $ionicPlatform) {
            $scope.moveToWash = function () {
                $state.go('app.wash', {}, {cache: false});
            }

        })
        
        .controller('trashDirection', function ($state, $window, $scope, $ionicPopup, $ionicPlatform) {
            $scope.moveToTrash = function () {
                $state.go('app.trash', {}, {cache: false});
            }

        })
        
        .controller('flashDirection', function ($state, $window, $scope, $ionicPopup, $ionicPlatform) {
           $scope.moveToFlash = function () {

                $state.go('app.flash', {}, {cache: false});
            }

        })
        
        
       



>>>>>>> c35f75ee9a50e06136946f48ffbdd984d1d2750b
