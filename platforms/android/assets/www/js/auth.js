angular.module('aquarium.auth', ['angular-storage'])

        .service('AuthService', function ($rootScope, store) {





            $rootScope.currentUserId = store.get('currentUserId');
            console.log(store.get('currentUserId')); // récupérer dans le localstorage
            console.log(store.get('currentUserSalt')); // récupérer dans le localstorage
            $rootScope.image = {};
            var service = {
                currentUserId: store.get('currentUserId'),
                currentUserSalt: store.get('currentUserSalt'),
                response: function (response) {
                    if (response.status === 401) {
                    }

                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    var reservedPaths = ['/', '/mycube', '/connect', '/event'];
                    if (rejection.status === 401 && _.contains(reservedPaths, $location.path().trim())) {
                        var stateService = $injector.get('$state');
                        var httpService = $injector.get('$http');
                        stateService.go('home');
                    }
                    return $q.reject(rejection);
                },
                setUser: function (user) {
                    service.currentUserId = user._id;
                    store.set('currentUserId', user._id);
                    $rootScope.currentUserId = store.get('currentUserId');
                },
                setSalt: function (user) {
                    service.currentUserSalt = user.salt;
                    store.set('currentUserSalt', user.salt);
                    console.log(user.salt);
                    $rootScope.currentUserSalt = store.get('currentUserSalt');
                },
                unsetUser: function () {
                    service.currentUserId = null;
                    store.remove('currentUserId');
                    $rootScope.currentUserId = store.get('currentUserId');

                }


            };

            return service;
        })

        .factory('CameraService', function ($q) {
            return{
                getPicture: function (options) {
                    var deferred = $q.defer();


                    navigator.camera.getPicture(function (result) {

                        deferred.resolve(result);
                    }, function (err) {

                        deferred.reject(err);
                    }, options);

                    return deferred.promise;
                }
            }
        })

        .controller('RegisterCtrl', function ($jrCrop, $ionicPlatform, $sce, apiUrl, CameraService, AuthService, $http, $ionicHistory, $rootScope, $ionicLoading, $scope, $state) {


            $ionicPlatform.ready(function () {
                var imageId;



                $scope.animation = {};



                $scope.takePhoto = function () {
                    try {
                        CameraService.getPicture({
                            quality: 100,
                            targetWidth: 500,
                            targetHeight: 500,
                            saveToPhotoAlbum: false,
                            destinationType: 1,
                            correctOrientation: true
                        }).then(function (imageData) {

                            $jrCrop.crop({
                                url: imageData,
                                width: 300,
                                title: 'Redimensionne',
                                height: 300
                            }).then(function (canvas) {
                                // success!                            
                                var image = canvas.toDataURL("image/png", 1.0);
                                $ionicLoading.show({
                                    template: 'Upload de votre photo...',
                                    delay: 0
                                });
                                $http({
                                    method: "post",
                                    url: apiUrl + "/images",
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    data: {
                                        imgBase64: image.replace(/^data:image\/(png|jpg);base64,/, "")
                                    }
                                }).success(function (data) {
                                    $scope.animation.dataURL = image;
                                    imageId = data;
                                    $ionicLoading.hide();
//                                    var toAdd = '<img class="toFillimg" src="http://pfouah2015.herokuapp.com/api/images/' + data + '" alt="">';
//                                    imageId = data;
//                                    $scope.animation.img = $sce.trustAsHtml(toAdd);
                                    $scope.animation.buttonphoto = true;


                                }).error(function (error) {
                                    $ionicLoading.hide();
                                    $scope.animation.error = error;

                                });

                            }, function () {
                                $scope.animation.error = "Probleme de redimensionnement";
                                $ionicLoading.hide();
                            });





                        }, function (err) {

                            $scope.animation.error = err;
                        });
                    }
                    catch (e)
                    {
                        $scope.animation.error = e;
                    }
                };



                $scope.newUser = function (pseuedo, password) {
                    $scope.animation.password = false;
                    $scope.animation.image = false;
                    $scope.animation.pseudo = false;

                    if (imageId == null)
                    {
                        $scope.animation.error = "Vous devez fournir une image !";
                        $scope.animation.image = true;
                    }
                    else
                    {
                        if (pseuedo == null)
                        {
                            $scope.animation.pseudo = true;
                            $scope.animation.error = "Indiquez un pseudo !";
                        }
                        else
                        {
                            if (password == null)
                            {
                                $scope.animation.error = "Indiquez un mot de passe !";
                                $scope.animation.password = true;
                            }
                            else
                            {
                                $ionicLoading.show({
                                    template: 'Inscription',
                                    delay: 0
                                });
                                $http({
                                    method: "POST",
                                    url: apiUrl + "/users",
                                    data:
                                            {
                                                pseudo: pseuedo,
                                                hashedPassword: password,
                                                imgId: imageId
                                            }

                                }).success(function (data) {
                                    $ionicLoading.hide();

                                    $ionicLoading.show({
                                        template: 'Connexion',
                                        delay: 0
                                    });


                                    $http({
                                        method: "POST",
                                        url: apiUrl + "/users/login",
                                        data:
                                                {
                                                    "pseudo": pseuedo,
                                                    "hashedPassword": password
                                                }

                                    }).success(function (data) {

                                        $rootScope.user = data.user;
                                        $rootScope.userScore = data.scores;
                                        AuthService.setUser(data.user);
                                        AuthService.setSalt(data.user);

                                        $ionicLoading.hide();
                                        $ionicHistory.nextViewOptions({
                                            disableBack: true,
                                            historyRoot: true
                                        });
                                        $state.go('app.home');
                                        console.log(data);



                                    }).error(function (data) {
                                        console.log(data);
                                        $ionicLoading.hide();
                                        $scope.animation.error = data.message;
                                        //attention au callback
                                    });


                                }).error(function (data) {
                                    $ionicLoading.hide();

                                    if (data.message == null)
                                    {
                                        $scope.animation.error = data;
                                    }
                                    else
                                    {
                                        $scope.animation.error = data.message;
                                    }

                                    //attention au callback
                                });
                            }
                        }
                    }





                }
            });
        })

        .controller('LoginCtrl', function (apiUrl, CameraService, AuthService, $http, $ionicHistory, $rootScope, $ionicLoading, $scope, $state) {

            // The $ionicView.beforeEnter event happens every time the screen is displayed.

            // Re-initialize the user object every time the screen is displayed.
            // The first name and last name will be automatically filled from the form thanks to AngularJS's two-way binding.
            $scope.user = {};
            $scope.users = {};
            $scope.animation = {};

            $scope.login = function (pseudo, password) {
                if (pseudo == null)
                {
                    $scope.animation.pseudo = true;
                    $scope.animation.error = "Indiquez un pseudo !";

                }
                else
                {
                    if (password == null)
                    {
                        $scope.animation.password = true;
                        $scope.animation.error = "Indiquez un mot de passe !";
                    }
                    else
                    {
                        $scope.animation.pseudo = false;
                        $scope.animation.password = false;
                        console.log('login');

                        console.log(pseudo + password);
                        $ionicLoading.show({
                            template: 'Connexion',
                            delay: 0
                        });
                        $http({
                            method: "POST",
                            url: apiUrl + "/users/login",
                            data:
                                    {
                                        "pseudo": pseudo,
                                        "hashedPassword": password
                                    }

                        }).success(function (data) {

                            $rootScope.user = data.user;
                            $rootScope.userScore = data.scores;
                            AuthService.setUser(data.user);
                            AuthService.setSalt(data.user);

                            $ionicLoading.hide();
                            $ionicHistory.nextViewOptions({
                                disableBack: true,
                                historyRoot: true
                            });
                            $state.go('app.home');
                            console.log(data);



                        }).error(function (data) {
                            console.log(data);
                            $ionicLoading.hide();
                            if (data.message == null)
                            {
                                $scope.animation.error = data;
                            }
                            else
                            {
                                $scope.animation.error = data.message;
                            }
                            //attention au callback
                        });
                    }
                }


            };


            $scope.moveToRegister = function () {
                console.log("ok");
                $state.go('register');
            };
            // Add the register function to the scope.

        })

        .controller('LogoutCtrl', function ( AuthService, $scope, $state) {

            $scope.logOut = function () {
                AuthService.unsetUser();
                console.log('logout');
                $state.go('login');
            };


        })

        .controller('rankingCtrl', function ($http, $rootScope, apiUrl, CameraService, AuthService, $scope, $state) {

            // $scope.isBetterRanking(4,9);
            $scope.isBetterRanking = function (avantDernierRank, actualRank) {
                console.log('avant dernier ' + avantDernierRank);
                console.log('actuel ' + actualRank);
                if (avantDernierRank >= actualRank) {
                    return true;
                } else {
                    return false;
                }
            }






        })


        .factory('AuthInterceptor', function (AuthService) {
            return {
                // The request function will be called before all requests.
                // In it, you can modify the request configuration object.
                request: function (config) {

                    // If the user is logged in, add the X-User-Id header.
                    if (AuthService.currentUserId) {
                        config.headers['X-User-Id'] = AuthService.currentUserId;
                    }

                    return config;
                }
            };
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        })
        ;