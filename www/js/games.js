angular.module('aquarium.games', [])

        .factory('GameFactory', function ($http, apiUrl) {

            return{
            };

        })

        .controller('gamesCtrl', function (store, HomeFactory, $window, $scope, musicController, $ionicPlatform) {





            $scope.height = ($window.innerHeight + 3) / 3;

            $scope.heightStyle = "" + $scope.height + "px";




            $scope.myStyle = {
                "height": $scope.heightStyle
            };


            $ionicPlatform.on('resume', function () {

                musicController.stopAmbianceMusique();

            });

            $scope.$on("$ionicView.enter", function (scopes, states) {
                $scope.trashLastScore = store.get('lastTrash');
                $scope.flashLastScore = store.get('lastFlash');
                $scope.washLastScore = store.get('lastWash');
                $scope.$apply();
            });




            $scope.myStyle = {
                "height": $scope.heightStyle
            };
            $scope.myStyleScore = {
                "height": $scope.heightStyle,
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






