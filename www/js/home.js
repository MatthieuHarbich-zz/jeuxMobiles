angular.module('aquarium.home', [])

  .factory('HomeFactory', function($http, store, apiUrl) {


      return{
        
        

            getUserById: function(id,callback){
              $http({
                method: 'GET',
                url: apiUrl + '/users/' + id + '/scores',
                headers:{
                  "Content-type":"application/json",
                  "x-user-id":id,
                  "salt": store.get('currentUserSalt')
                }

              }).success(function(user){
                callback(null, user);
              }).error(function(err){
                callback(err);
              });
            }
   
        

    };   

  })

  .controller('homeCtrl', function(HomeFactory, AuthService, $rootScope, $scope, $state){

    $scope.$on('$ionicView.beforeEnter', function() {

      HomeFactory.getUserById( AuthService.currentUserId, function(err, data, header){
        var userId = AuthService.currentUserId;
        console.log("User id : " + userId);

      if(err){
        console.log(err);
        $scope.error = err;
      }else{
         console.log("data");
         console.log(data);
        $rootScope.user = data.user;
        $rootScope.userScore = data.scores;

        
      };

      
    });

      
      
    });

    $scope.moveToGames = function(){
      
      $state.go('app.games');
    }

    
       $scope.timerRunning = true;

            
        $scope.$broadcast('timer-start');
                
            

           

            $scope.$on('timer-stopped', function (event, data){
                console.log('Timer Stopped - data = ', data);
            });

    

  })

  .controller('appCtrl', function(HomeFactory, $scope, $state){

    $scope.isGame = function(){
      
      console.log($state.current.name);
      if($state.current.name == 'app.flash' || $state.current.name == 'app.trash' || $state.current.name == 'app.wash'){
      	return false;
      }else{
      	return true;
      }
    }

    
      

    

  })
  
;