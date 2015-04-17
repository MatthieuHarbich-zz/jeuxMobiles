angular.module('aquarium.trash', [])

        .directive('sac1', function () {
            return {
                link: function (scope, element, attrs) {
                    // watch the degrees attribute, and update the UI when it changes
                    scope.$watch(attrs.degrees, function (vh) {

                        if (vh<(-10)  || vh>99)
                        {
                            element.css({
                                'display': 'none',
                                'top': vh + '%'
                            });
                        }
                        else
                        {
                            //transform the css to rotate based on the new rotateDegrees
                            element.css({
                                'transition': 'all 0.4s',
                                'top': vh + '%'
                            });
                        }
                    });
                }
            }
        })


        .directive('sac2', function () {
            return {
                link: function (scope, element, attrs) {
                    // watch the degrees attribute, and update the UI when it changes
                    scope.$watch(attrs.degrees, function (vh) {


                        if (vh<(-10)  || vh>99)
                        {
                            element.css({
                                'display': 'none',
                                'top': vh + '%'
                            });
                        }
                        else
                        {
                            //transform the css to rotate based on the new rotateDegrees
                            element.css({
                                'transition': 'all 0.4s',
                                'top': vh + '%'
                            });
                        }
                    });
                }
            }
        })

        .directive('sac3', function () {
            return {
                link: function (scope, element, attrs) {
                    // watch the degrees attribute, and update the UI when it changes
                    scope.$watch(attrs.degrees, function (vh) {

                        
                        if (vh<(-10) || vh>99)
                        {
                            element.css({
                                'display': 'none',
                                'top': vh + '%'
                            });
                        }
                        else
                        {
                            //transform the css to rotate based on the new rotateDegrees
                            element.css({
                                'transition': 'all 0.4s',
                                'top': vh + '%'
                            });
                        }
                    });
                }
            }
        })

        .controller('trashCtrl', function (HomeFactory, $state, $window, $scope, $ionicPlatform, musicController) {

            var options = {frequency: 20};  // Update every 3 seconds
            var animatorTimer;
            var compteur_animator = 0;
            var sac1_vh = 0;
            var sac2_vh = 50;
            var sac3_vh = 100;
            var add = 0;
            var comptor_sac = 0;

            $ionicPlatform.ready(function () {
                $scope.compass = {};
                $scope.animation = {};
                $scope.animation.timershow = "asd";
                $scope.animation.timershow = "asd";
                $scope.animation.numbershow = comptor_sac;





                function animator() {
                    if (paused)
                        return;
                    compteur_animator++;

                    sac1_vh += add;
                    sac2_vh += add;
                    sac3_vh += add;
                    if (sac1_vh > 100)
                    {
                        comptor_sac++;
                        sac1_vh = -50 + (sac1_vh - 100);
                    }

                    if (sac2_vh > 100)

                    {
                        comptor_sac++;
                        sac2_vh = -50 + (sac2_vh - 100);
                    }

                    if (sac3_vh > 100)
                    {
                        comptor_sac++;
                        sac3_vh = -50 + (sac3_vh - 100);
                    }
                  
                    if (add != 0)
                    {
                       
                        
                        
                        $scope.animation.sac1 = sac1_vh;
                        $scope.animation.sac2 = sac2_vh;
                        $scope.animation.sac3 = sac3_vh;
                    }
                    add = 0;
                    $scope.animation.numbershow = comptor_sac;
                    $scope.$digest();
                }


                var paused = false;
                var fondu = false;
                var compteur_start = 0;
                var string_text = ["Ready?", "3", "2", "1", "GO!"];

                var starter = setInterval(function () {
                    starterTimer()
                }, 500);

                function starterTimer() {
                    if (paused)
                        return;
                    if (fondu)
                    {
                        $scope.animation.blnfondu = true;
                        $scope.animation.blnRotationIndicator = true;
                        $scope.animation.blntextBounce = true;
                        fondu = false;
                    }
                    else
                    {
                        navigator.vibrate(500);
                        if (compteur_start == 0)
                        {
                            try
                            {
                                musicController.playCountDownMusic();
                                //areYouReady.play();
                            }
                            catch (e)
                            {

                            }
                        }
                        $scope.animation.blnfondu = false;
                        $scope.animation.blnRotationIndicator = false;
                        $scope.animation.blntextBounce = false;
                        fondu = true;
                        $scope.animation.number = string_text[compteur_start];
                        if (compteur_start == 4)
                        {

                            try {
                                musicController.stopCountDownMusic();

                            }
                            catch (e)
                            {

                            }
                            $scope.animation.blnHideIndicator = true;
                            start();

                        }
                        if (compteur_start > 4)
                        {
                            $scope.animation.number = "";
                            window.clearInterval(starter);
                        }

                        compteur_start++;
                    }
                    $scope.$digest();

                }

                var watchID;
                var time_affichage = 20;
                function start()
                {
                    //game();
                    musicController.playAmbianceMusique();
                    animatorTimer = setInterval(function () {
                        animator()


                    }, time_affichage);

                    try {
                        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
                    }
                    catch (e)
                    {

                    }
                }


                function onSuccess(acceleration) {
                    var y = acceleration.y;
//                    alert('Acceleration X: ' + acceleration.x + '\n' +
//                            'Acceleration Y: ' + acceleration.y + '\n' +
//                            'Acceleration Z: ' + acceleration.z + '\n' +
//                            'Timestamp: ' + acceleration.timestamp + '\n');
                    if (y > 10)
                    {
                        add = add + (y - 10);
                    }
                }
                ;

                function onError() {
                    alert('onError!');
                }
                ;



            });
        })