angular.module('aquarium.trash', [])

        .directive('sac1', function () {
            return {
                link: function (scope, element, attrs) {
                    // watch the degrees attribute, and update the UI when it changes
                    scope.$watch(attrs.degrees, function (vh) {

                        if (vh < (-30) || vh > 99)
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
                                'transition': 'all 0.8s',
                                'display': 'block',
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


                        if (vh < (-30) || vh > 99)
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
                                'transition': 'all 0.8s',
                                'display': 'block',
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


                        if (vh < (-30) || vh > 99)
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
                                'transition': 'all 0.8s',
                                'display': 'block',
                                'top': vh + '%'
                            });
                        }
                    });
                }
            }
        })

        .controller('trashCtrl', function (store,$rootScope, apiUrl, $http, $sce, HomeFactory, $state, $window, $scope, $ionicPlatform, musicController) {


            function send_score(score_to_send)
            {

                store.set('lastTrash', score_to_send);
                $http({
                    method: "POST",
                    url: apiUrl + "/scores",
                    headers: {
                        'Content-Type': 'application/json',
                        
                        salt:store.get('currentUserSalt')
                    },
                    data:
                            {
                                user:store.get('currentUserId'),
                                pts: score_to_send.toString(),
                                gameName: "trash"
                            }

                }).success(function (data) {

                    console.log("Ok!");


                }).error(function (data) {

                    console.log(data);
                    console.log(score_to_send);
                    //attention au callback
                });
            }

            function specialText(star)
            {
                descending = true;

                var string_rate = ["Grouille", "Plus vite", "Joli", "Top", "TopScorer"];

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
            var options = {frequency: 20};  // Update every 3 seconds
            var animatorTimer;
            var compteur_animator = 0;
            var sac1_vh = 0;
            var sac2_vh = 50;
            var sac3_vh = 100;
            var add = 0;
            var comptor_sac = 0;
            var timer_annouce_or = 5000;
            var numb_tour_during_time = 0;
            var timer_annouce = timer_annouce_or;
            var descending;

            $ionicPlatform.ready(function () {
                musicController.loadMusic();
                $scope.animation = {};


                function animator() {
                    if (paused)
                        return;
                    compteur_animator++;
                    timer_annouce = timer_annouce - time_affichage;


                    if (timer_annouce < 100 && descending)
                    {
                        $scope.animation.stardescending = false;
                        descending = false;
                    }

                    if (timer_annouce < 0)
                    {


                        if (numb_tour_during_time < 5)
                        {
                            specialText(1);

                        }
                        else
                        {
                            if (numb_tour_during_time < 8)
                            {
                                specialText(2);
                            }
                            else
                            {
                                if (numb_tour_during_time < 13)
                                {
                                    specialText(3);
                                }
                                else
                                {
                                    if (numb_tour_during_time < 18)
                                    {
                                        specialText(4);
                                    }
                                    else
                                    {
                                        if (numb_tour_during_time >= 18)
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

                    sac1_vh += add;
                    sac2_vh += add;
                    sac3_vh += add;
                    if (sac1_vh > 100)
                    {
                        navigator.vibrate(200);
                        musicController.playGongSound();
                        comptor_sac++;
                        numb_tour_during_time++;
                        sac1_vh = -50 + (sac1_vh - 100);
                    }

                    if (sac2_vh > 100)

                    {
                        navigator.vibrate(200);
                        musicController.playGongSound();
                        comptor_sac++;
                        numb_tour_during_time++;
                        sac2_vh = -50 + (sac2_vh - 100);
                    }

                    if (sac3_vh > 100)
                    {
                        navigator.vibrate(200);
                        musicController.playGongSound();
                        comptor_sac++;
                        numb_tour_during_time++;
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
                    $scope.animation.timershow = time_game + " s";
                    $scope.$digest();
                }


                var paused = false;
                var fondu = false;
                var compteur_start = -1;
                var string_text = ["Ready?", "3", "2", "1", "GO!"];

                var starter = setInterval(function () {
                    starterTimer()
                }, 500);

                function starterTimer() {
                    if (paused)
                        return;
                    if (compteur_start == -1)
                    {
                        compteur_start++;
                        $scope.animation.port1out = true;
                        $scope.animation.port2out = true;
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
                            if (compteur_start == 1)
                            {

                                musicController.playCountDownMusic();

                            }
                            $scope.animation.blnfondu = false;
                            $scope.animation.blnRotationIndicator = false;
                            $scope.animation.blntextBounce = false;
                            fondu = true;
                            $scope.animation.number = string_text[compteur_start];
                            if (compteur_start == 4)
                            {


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

                var watchID;
                var time_affichage = 200;
                function start()
                {
                    game();
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

                function game()
                {
                    timer_game = setInterval(function () {
                        gamer_time()


                    }, 1000);
                }
                var indication_special = true;
                var time_game = 20;
                var timer_game;
                function gamer_time()
                {
                    if (paused)
                        return;
                    time_game--;

                    if (comptor_sac == 0 && time_game < 18)
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
                    if (time_game == 3)
                    {

                        musicController.playFinishSound();
                    }
                    if (time_game < 0)
                    {

                        if (count_finish == 0)
                        {
                            navigator.vibrate(0);
                            window.clearInterval(animatorTimer);
                            window.clearInterval(starter);
                            window.clearInterval(timer_game);
                            musicController.stopAmbianceMusique();
                            try {

                                navigator.accelerometer.clearWatch(watchID);
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
                            $scope.animation.number = "";
                            $scope.animation.showscore = true;
                            $scope.animation.score = comptor_sac;
                            send_score(comptor_sac);
                            $scope.$digest();
                            navigator.vibrate(2000);

                            window.clearInterval(animatorTimer);
                            try {
                                navigator.accelerometer.clearWatch(watchID);

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

                        navigator.accelerometer.clearWatch(watchID);
                    } catch (e)
                    {

                    }
                });


                $ionicPlatform.on('resume', function () {
                    paused = false;
                    navigator.vibrate(0);
                    musicController.resumeAmbianceMusique();
                    try {

                        watchID = navigator.accelerometer.watchHeading(onSuccess, onError, options);
                    } catch (e)
                    {

                    }
                });

                $scope.$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            navigator.vibrate(0);
                            window.clearInterval(animatorTimer);
                            window.clearInterval(starter);
                            window.clearInterval(timer_game);
                            musicController.stopAmbianceMusique();
                            try {

                                navigator.accelerometer.clearWatch(watchID);
                            } catch (e)
                            {

                            }

                        });



            });
        })