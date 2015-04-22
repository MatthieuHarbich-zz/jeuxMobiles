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
            var trash_effect;
            var flash_effect;
            var stop = true;

            return {
                loadMusic: function loadMusic()
                {
                    if (musique == null)
                    {
                        try {
                            flash_effect = new Media(replacementForAndroid("sound/chasse.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            trash_effect  = new Media(replacementForAndroid("sound/swoosh.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            finish = new Media(replacementForAndroid("sound/beep_fin.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            areYouReady = new Media(replacementForAndroid("sound/321.mp3"),
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
                            gong = new Media(replacementForAndroid("sound/effect.mp3"),
                                    function () {
                                        console.log("playAudio():Audio Success");
                                    },
                                    function (err) {
                                        console.log("playAudio():Audio Error: " + err);
                                    }
                            );
                            var string_music = ["sound/voix_jeux_grouille.mp3", "sound/voix_jeux_plus_vite.mp3", "sound/voix_jeux_joli_thierry_2.mp3", "sound/voix_jeux_test_au_top.mp3", "sound/voix_jeux_top_scorer_2.mp3"];
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
                        musique.setVolume(0.2);
                        stop =false;
                    }
                    catch (e)
                    {

                    }
                },
                playTrashEffect: function playTrashEffect()
                {
                    try {
                        trash_effect.stop();
                        trash_effect.play();
                        trash_effect.setVolume(0.1);
                    }
                    catch (e)
                    {

                    }
                },
                playFlashEffect: function playFlashEffect()
                {
                    try {
                        flash_effect.stop();
                        flash_effect.play();
                        flash_effect.setVolume(0.2);
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
                        musique.setVolume(0.2);
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
                        gong.setVolume(0.1);
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
                         finish.setVolume(1.0);
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
                        areYouReady.setVolume(1.0);
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