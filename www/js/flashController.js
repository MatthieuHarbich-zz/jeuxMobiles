angular.module('aquarium.flash', [])
        .directive('detectGestures', function ($ionicGesture) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    var gestureType = attrs.gestureType;

                    switch (gestureType) {
                        case 'swipe':
                            $ionicGesture.on('swipe', scope.reportEvent, elem);
                            break;
                        case 'swiperight':
                            $ionicGesture.on('swiperight', scope.reportEvent, elem);
                            break;
                        case 'swipeleft':
                            $ionicGesture.on('swipeleft', scope.reportEvent, elem);
                            break;
                        case 'doubletap':
                            $ionicGesture.on('doubletap', scope.reportEvent, elem);
                            break;
                        case 'tap':
                            $ionicGesture.on('tap', scope.reportEvent, elem);
                            break;
                        case 'scroll':
                            $ionicGesture.on('scroll', scope.reportEvent, elem);
                            break;
                    }

                }
            }
        })
        .controller('flashCtrl', function ($rootScope, $http, store, apiUrl, $sce, HomeFactory, $state, $window, $scope, $ionicPlatform, musicController) {
            $scope.compass = {};
            $scope.animation = {};
            var count_tape = 0;
            var numb_tour_during_time = 0;

            var descending = false;


            function send_score(score_to_send)
            {
                
                 store.set('lastFlash', score_to_send);
                $http({
                    method: "POST",
                    url: apiUrl + "/scores",
                    headers: {
                        'Content-Type': 'application/json',
                        salt: store.get('currentUserSalt')
                    },
                    data:
                            {
                                user: store.get('currentUserId'),
                                pts: score_to_send.toString(),
                                gameName: "flash"
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

            $scope.onTape = function () {
                count_tape++;
                numb_tour_during_time++;
                musicController.playGongSound();
            }

            $ionicPlatform.ready(function () {

                musicController.loadMusic();
                try {
                    loadSpecial();
                }
                catch (e)
                {

                }


                var starter = setInterval(function () {
                    starterTimer()

                }, 500);
                var paused = false;
                var compteur_start = -1;
                var fondu = false;
                var string_text = ["Ready?", "3", "2", "1", "GO!"];


                function starterTimer() {
                    if (paused)
                        return;
                    if (compteur_start == -1)
                    {
                        $scope.animation.port2out = true;
                        $scope.animation.port1out = true;
                        musicController.playFlashEffect();
                        compteur_start++;
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

                                    //areYouReady.play();
                                }
                                catch (e)
                                {

                                }
                            }
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


                                $scope.animation.openingbottom = true;
                                musicController.playFlashEffect();
                                $scope.animation.blnHideIndicator = true;
                                count_tape = 0;
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

                var timer_animator;
                var time_affichage = 200;
                var time_game = 20;
                function start()
                {
                    game();
                    musicController.playAmbianceMusique();
                    timer_animator = setInterval(function () {
                        animator()


                    }, time_affichage);


                }
                var timer_annouce_or = 5000;
                var timer_annouce = timer_annouce_or;

                var time_eau_coule_or = 2000;
                var time_eau_coule = time_eau_coule_or;
                var time_eau_bouge_or = 2000;
                var time_eau_bouge = time_eau_bouge_or;


                function animator() {
                    if (paused)
                        return;

                    if (time_eau_coule < 400)
                    {
                        console.log("eau");
                        $scope.animation.eaucoule = false;
                    }
                    if (time_eau_bouge > 1000)
                    {
                        $scope.animation.eaufond = false;
                    }
                    else
                    {
                        $scope.animation.eaufond = true;

                    }

                    if (time_eau_bouge < 0)
                    {
                        time_eau_bouge = time_eau_bouge_or;
                    }

                    timer_annouce = timer_annouce - time_affichage;
                    time_eau_coule = time_eau_coule - time_affichage;
                    time_eau_bouge = time_eau_bouge - time_affichage;
                    if (time_eau_coule < 0)
                    {
                        $scope.animation.eaucoule = true;
                        time_eau_coule = time_eau_coule_or;
                        musicController.playFlashEffect();

                    }



                    if (timer_annouce < 100 && descending)
                    {
                        $scope.animation.stardescending = false;
                        descending = false;
                    }

                    if (timer_annouce < 0)
                    {


                        if (numb_tour_during_time < 20 && numb_tour_during_time > 1)
                        {
                            specialText(1);
                        }
                        else
                        {
                            if (numb_tour_during_time < 25)
                            {
                                specialText(2);
                            }
                            else
                            {
                                if (numb_tour_during_time < 30)
                                {
                                    specialText(3);
                                }
                                else
                                {
                                    if (numb_tour_during_time < 35)
                                    {
                                        specialText(4);
                                    }
                                    else
                                    {
                                        if (numb_tour_during_time >= 40)
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



                    $scope.animation.timershow = time_game + " s";
                    $scope.animation.numbershow = count_tape + " t";





                    $scope.$digest();
                }


                var timer_game;
                function game()
                {
                    timer_game = setInterval(function () {
                        gamer_time()


                    }, 1000);
                }

                var indication_special = true;
                var count_finish = 5;
                var animator_caca1 = 7;
                var animator_caca2 = 5;
                var animator_caca3 = 10;
                function gamer_time()
                {
                    if (paused)
                        return;
                    if (time_game == 20)
                    {
                        console.log("ok");
                        $scope.animation.caca1 = true;
                        $scope.animation.caca2 = true;
                        $scope.animation.caca3 = true;

                    }
                    time_game--;


                    if (count_tape == 0 && time_game < 18)
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
                        musicController.playFlashEffect();
                        $scope.animation.openingbottom = false;
                        musicController.playFinishSound();
                    }
                    if (time_game < 0)
                    {

                        if (count_finish == 0)
                        {
                            navigator.vibrate(0);
                            window.clearInterval(timer_animator);
                            window.clearInterval(starter);
                            window.clearInterval(timer_game);
                            musicController.stopAmbianceMusique();

                            $state.go('app.games');

                        }
                        if (count_finish == 5)
                        {
                            musicController.playFlashEffect();
                            $scope.animation.opening = false;
                            $scope.animation.blnfondu = false;
                            $scope.animation.port2out = false;
                            $scope.animation.port1out = false;
                            $scope.animation.port1in = true;
                            $scope.animation.port2in = true;

                            $scope.animation.number = "";
                            $scope.animation.showscore = true;
                            $scope.animation.score = count_tape;
                            send_score(count_tape);
                            $scope.$digest();
                            navigator.vibrate(2000);

                            window.clearInterval(timer_animator);


                        }
                        count_finish--;

                    }
                }


                $ionicPlatform.on('pause', function () {
                    navigator.vibrate(0);
                    paused = true;
                    musicController.pauseAmbianceMusique();


                });


                $ionicPlatform.on('resume', function () {
                    paused = false;
                    navigator.vibrate(0);
                    musicController.resumeAmbianceMusique();

                });

                $scope.$on('$stateChangeStart',
                        function (event, toState, toParams, fromState, fromParams) {
                            navigator.vibrate(0);
                            window.clearInterval(timer_animator);
                            window.clearInterval(starter);
                            window.clearInterval(timer_game);
                            musicController.stopAmbianceMusique();


                        });



            });




        })