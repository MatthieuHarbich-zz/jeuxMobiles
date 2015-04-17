angular.module('aquarium.music', [])

        .factory('musicController', function () {

            function replacementForAndroid(url)
            {
                if (ionic.Platform.device().platform.toLowerCase() === "android")
                {
                    url = "/android_asset/www/" + url;
                }
                return url;
            }
            var musique;
            var areYouReady;
            var go;
            var finish;
            var gong;
            var music_sweet;
            var music_tasty;
            var music_delicious;
            var music_devine;
            var music_sugar;
            var stop = true;

            return {
                loadMusic: function loadMusic()
                {
                    if (musique == null)
                    {
                        try {
                            finish = new Media(replacementForAndroid("sound/finish.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            areYouReady = new Media(replacementForAndroid("sound/areYouReady.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            go = new Media(replacementForAndroid("sound/go.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            musique = new Media(replacementForAndroid("sound/ambiance.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            gong = new Media(replacementForAndroid("sound/washMachineBulle.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            var string_music = ["sound/sweet.mp3", "sound/tasty.mp3", "sound/delicious.mp3", "sound/divine.mp3", "sound/sugarcrush.mp3"];
                            music_tasty = new Media(replacementForAndroid(string_music[1]),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            music_sweet = new Media(replacementForAndroid(string_music[0]),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            music_devine = new Media(replacementForAndroid(string_music[3]),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            music_delicious = new Media(replacementForAndroid(string_music[2]),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            music_sugar = new Media(replacementForAndroid(string_music[4]),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                        }
                        catch (e)
                        {

                        }
                    }


                },
                playWowSound: function playWowSound(e)
                {
                    try {
                        switch (e) {
                            case 0:
                                music_sweet.stop();
                                music_sweet.play();
                                break;
                            case 1:
                                music_tasty.stop();
                                music_tasty.play();
                                break;
                            case 2:
                                music_delicious.stop();
                                music_delicious.play();
                                break;
                            case 3:
                                music_devine.stop();
                                music_devine.play();
                                break;
                            case 4:
                                music_sugar.stop();
                                music_sugar.play();
                                break;
                            default:
                                break;
                            }
                    }
                    catch (e)
                    {

                    }

                },
                playAmbianceMusique: function playAmbianceMusique()
                {
                    try {
                        musique.stop();
                        musique.play();
                        stop =false;
                    }
                    catch (e)
                    {

                    }
                },
                pauseAmbianceMusique: function pauseAmbianceMusique()
                {
                    try {
                        musique.pause();
                    }
                    catch (e)
                    {

                    }
                },
                resumeAmbianceMusique: function resumeAmbianceMusique()
                {
                    if (!stop)
                    {
                    try {
                        musique.play();
                    }
                    catch (e)
                    {

                    }
                }
                },
                 stopAmbianceMusique: function stopAmbianceMusique()
                {
                    try {
                        musique.stop();
                        stop = true;
                    }
                    catch (e)
                    {

                    }
                },
                playGongSound: function playGongSound()
                {
                    try {
                        gong.stop();
                        gong.play();
                    }
                    catch (e)
                    {

                    }
                },
                playFinishSound: function playFinishSound()
                {
                    try {
                        finish.stop();
                        finish.play();
                    }
                    catch (e)
                    {

                    }
                },
                playGoMusic: function playGoMusic()
                {
                    try {
                        go.stop();
                        go.play();
                    }
                    catch (e)
                    {

                    }
                },
                playCountDownMusic: function playCountDownMusic()
                {
                    try {
                        areYouReady.stop();
                        areYouReady.play();
                    }
                    catch (e)
                    {

                    }
                },
                stopCountDownMusic: function playCountDownMusic()
                {
                    try {
                        areYouReady.stop();
                    }
                    catch (e)
                    {

                    }
                }

            };
        });