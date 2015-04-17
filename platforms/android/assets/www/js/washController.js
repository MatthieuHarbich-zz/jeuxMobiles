angular.module('aquarium.wash', [])

        .directive('rotate', function () {
            return {
                link: function (scope, element, attrs) {
                    // watch the degrees attribute, and update the UI when it changes
                    scope.$watch(attrs.degrees, function (rotateDegrees) {

                        rotateDegrees = (rotateDegrees) * (-1);

                        //transform the css to rotate based on the new rotateDegrees
                        element.css({
                            'transition': 'all 0.4s',
                            '-moz-transform': 'rotate(' + rotateDegrees + 'deg)',
                            '-webkit-transform': 'rotate(' + rotateDegrees + 'deg)',
                            '-o-transform': 'rotate(' + rotateDegrees + 'deg)',
                            '-ms-transform': 'rotate(' + rotateDegrees + 'deg)'
                        });
                    });
                }
            }
        })
        .controller('washCtrl', function ($ionicHistory, $sce, $state, $window, $scope, $ionicPopup, $ionicPlatform, musicController) {


            function replacementForAndroid(url)
            {
                if (ionic.Platform.device().platform.toLowerCase() === "android")
                {
                    url = "/android_asset/www/" + url;
                }
                return url;
            }


            function specialText(star)
            {
                descending = true;

                var string_rate = ["Sweet", "Tasty", "Delicious", "Divine", "SugarCrush"];

                var toAdd = '<img class="starImg" src="./img/star.png" alt="">';
                var string = '';
                for (var i = 0; i < star; i++)
                {
                    string += toAdd;
                }
                $scope.animation.starsystem = $sce.trustAsHtml(string);
                $scope.animation.godlike = string_rate[star - 1];
                $scope.animation.stardescending = true;
                musicController.playWowSound(star - 1);

            }




            $ionicPlatform.ready(function () {

                musicController.loadMusic();
                try {
                    loadSpecial();
                }
                catch (e)
                {

                }

                $scope.compass = {};
                $scope.animation = {};



                var first = true;
                var original = 0;
                var ancient = 0;

                var total = 360;
                var nb_tour = 0;
                var compteur = 0;
                var test = false;
                var mid = 0;


                var time_affichage = 200;
                var time_capteur = 20;

                var compteur = 0;
                var actual_ori = 0;

                var i = true;





                var time_mousse_top_or = 2000;
                var time_mousse_top = time_mousse_top_or;

                var time_vibration_or = 150;
                var time_vibration = time_vibration_or;

                
                var myVar;
                var time_game = 20;
                var timer_game;
                var timer_annouce_or = 5000;
                var numb_tour_during_time = 0;
                var timer_annouce = timer_annouce_or;
                var options = {
                    frequency: time_capteur
                }; // Update every 3 seconds
                var watchID;
                var string_text = ["Ready?", "3", "2", "1", "GO!"];





                var starter = setInterval(function () {
                    starterTimer()

                }, 500);



                var paused = false;
                var compteur_start = -1;
                var fondu = false;

                function starterTimer() {
                    if (paused)
                        return;
                    if (compteur_start == -1)
                    {
                        $scope.animation.port2out = true;
                            $scope.animation.port1out = true;
                            compteur_start++
                    }
                    else
                    {
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
                }
                    $scope.$digest();

                }

                function start()
                {
                    game();
                    musicController.playAmbianceMusique();
                    myVar = setInterval(function () {
                        animator()


                    }, time_affichage);

                    try {
                        watchID = navigator.compass.watchHeading(onSuccess, onError, options);
                    }
                    catch (e)
                    {

                    }
                }


                var descending = false;
                function animator() {
                    if (paused)
                        return;
                    time_mousse_top = time_mousse_top - time_affichage;
                    time_vibration = time_vibration - time_affichage;
                    timer_annouce = timer_annouce - time_affichage;

                    if (timer_annouce < 100 && descending)
                    {
                        $scope.animation.stardescending = false;
                        descending = false;
                    }

                    if (timer_annouce < 0)
                    {


                        if (numb_tour_during_time == 2)
                        {
                            specialText(1);

                        }
                        else
                        {
                            if (numb_tour_during_time == 3)
                            {
                                specialText(2);
                            }
                            else
                            {
                                if (numb_tour_during_time == 4)
                                {
                                    specialText(3);
                                }
                                else
                                {
                                    if (numb_tour_during_time == 5)
                                    {
                                        specialText(4);
                                    }
                                    else
                                    {
                                        if (numb_tour_during_time > 5)
                                        {
                                            specialText(5);
                                        }
                                    }
                                }
                            }
                        }
                        numb_tour_during_time = 0;
                        timer_annouce = timer_annouce_or;

                    }

                    if (time_mousse_top < 0)
                    {
                        if (i)
                        {
                            i = false;
                            $scope.animation.moussetop = true;
                        }
                        else
                        {
                            i = true;
                            $scope.animation.moussetop = false;

                        }
                        time_mousse_top = time_mousse_top_or;
                    }

                    if (time_vibration < 0)
                    {
                        if (test)
                        {
                            test = false;
                            $scope.compass.timeStamp = "false";
                            $scope.animation.blnwashMachineRight = false;

                        }
                        else
                        {
                            test = true;
                            $scope.compass.timeStamp = "true";
                            $scope.animation.blnwashMachineRight = true;


                        }
                        time_vibration = time_vibration_or;
                    }

                    
                        $scope.animation.rotation = parseInt(actual_ori);
                        
                    
                    $scope.animation.timershow = time_game + " s";
                    $scope.animation.numbershow = nb_tour + " t";





                    $scope.$digest();
                }

              var to_make = 360;
              var difference;
              
                function onSuccess(heading) {

                    actual_ori = heading.trueHeading;
                    if (first)
                    {
                        ancient = actual_ori;
                        first = false;
                    }
                    
                    difference = Math.abs(actual_ori - ancient);
                    
                    
                    if (actual_ori > 270 && ancient < 90)
                    {
                        difference = 360-actual_ori + ancient;
                    }
                    
                    if (actual_ori < 90 && ancient > 270)
                    {
                        difference = 360-ancient + actual_ori;
                    }
                    
                    to_make = to_make - difference;
                    
                    
                    if (to_make < 1)
                    {
                        to_make = 360 + to_make;                   
                        musicController.playGongSound();
                        numb_tour_during_time++;
                        nb_tour++;
                    }
                    ancient = actual_ori;



                    //$scope.user.orientation = $compteur;

                    
                }
                ;

                function onError(compassError) {
                    alert('Compass error: ' + compassError.code);
                }
                ;



                function game()
                {
                    timer_game = setInterval(function () {
                        gamer_time()


                    }, 1000);
                }

                var indication_special = true;
                function gamer_time()
                {
                    if (paused)
                        return;
                    time_game--;

                    if (nb_tour == 0 && time_game < 18)
                    {
                        if (indication_special)
                        {
                            indication_special = false;
                            $scope.animation.blnHideIndicator = false;
                            $scope.animation.blnRotationIndicator = true;
                            $scope.animation.blntextBounce = true;
                        }
                        else
                        {
                            indication_special = true;
                            $scope.animation.blnRotationIndicator = false;
                            $scope.animation.blntextBounce = false;

                        }
                    }
                    else
                    {
                        $scope.animation.blnHideIndicator = true;
                    }
                    if (time_game < 0)
                    {

                        if (count_finish == 0)
                        {
                            navigator.vibrate(0);
                            window.clearInterval(myVar);
                            window.clearInterval(starter);
                            window.clearInterval(timer_game);
                            musicController.stopAmbianceMusique();
                            try {

                                navigator.compass.clearWatch(watchID);
                            } catch (e)
                            {

                            }
                            $state.go('app.games');

                        }
                        if (count_finish == 5)
                        {
                            $scope.animation.blnfondu = false;

                            $scope.animation.port2out = false;
                            $scope.animation.port1out = false;
                            $scope.animation.port1in = true;
                            $scope.animation.port2in = true;
                            $scope.animation.number = "FINISH!";
                             $scope.animation.showscore = true;
                             $scope.animation.score = nb_tour;
                            $scope.$digest();
                            navigator.vibrate(2000);

                            window.clearInterval(myVar);
                            musicController.playFinishSound();
                            try {
                                navigator.compass.clearWatch(watchID);
                            } catch (e)
                            {

                            }
                        }
                        count_finish--;

                    }
                }

                var count_finish = 5;

                $ionicPlatform.on('pause', function () {
                    navigator.vibrate(0);
                    paused = true;
                    musicController.pauseAmbianceMusique();
                    try {

                        navigator.compass.clearWatch(watchID);
                    } catch (e)
                    {

                    }
                });
                

                $ionicPlatform.on('resume', function () {
                    paused = false;
                    navigator.vibrate(0);
                    musicController.resumeAmbianceMusique();
                    try {

                        watchID = navigator.compass.watchHeading(onSuccess, onError, options);
                    } catch (e)
                    {

                    }
                });

                $scope.$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            navigator.vibrate(0);
                            window.clearInterval(myVar);
                            window.clearInterval(starter);
                            window.clearInterval(timer_game);
                            musicController.stopAmbianceMusique();
                            try {

                                navigator.compass.clearWatch(watchID);
                            } catch (e)
                            {

                            }

                        });
                /**
                 ClockSrv.startClock(function () {
                 $compteur++;
                 $scope.user.orientation = $compteur;
                 console.log($compteur);
                 });**/

            });






        })

        ;
