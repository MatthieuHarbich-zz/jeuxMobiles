angular.module('aquarium.games', [])

        .factory('GameFactory', function ($http, apiUrl) {

            return{
            };

        })

        .controller('gamesCtrl', function (HomeFactory, $window, $scope,musicController,$ionicPlatform) {



            console.log($window.innerHeight);

            $scope.height = ($window.innerHeight + 3) / 3;

            $scope.heightStyle = "" + $scope.height + "px";

            console.log($scope.heightStyle);


            $scope.myStyle = {
                "height": $scope.heightStyle
            };
            
            
            $ionicPlatform.on('resume', function () {

                    musicController.stopAmbianceMusique();
                    
                });


            $scope.trashLastScore = 31;
            $scope.flashLastScore = 31;
            $scope.washLastScore = 31;



      $scope.myStyle = {
		    "height" : $scope.heightStyle
		};
        $scope.myStyleScore = {
        "height" : $scope.heightStyle,
        "line-height": $scope.heightStyle
        };


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
        
        
       



