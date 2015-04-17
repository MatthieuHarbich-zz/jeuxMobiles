angular.module('aquarium.games', [])

  .factory('GameFactory', function($http, apiUrl) {

      return{


        

    };   

  })

  .controller('gamesCtrl', function(HomeFactory, $window, $scope){


    	
    console.log($window.innerHeight);

    $scope.height = ($window.innerHeight + 3) / 3;

    $scope.heightStyle = ""+$scope.height+"px";
     
      console.log($scope.heightStyle);

      $scope.myStyle = {
		    "height" : $scope.heightStyle
		};
        $scope.myStyleScore = {
        "height" : $scope.heightStyle,
        "line-height": $scope.heightStyle
    };



  })

   .controller('flashCtrl', function(HomeFactory,$state, $window, $scope){
    
    $scope.moveToFlash = function(){

      $state.go('app.flash');
    }

    

  })

   .controller('trashCtrl', function(HomeFactory, $state, $window, $scope){
    
    $scope.moveToTrash = function(){
      $state.go('app.trash');
    }

    console.log("trash");   

  })

   .controller('washCtrl', function(HomeFactory, $state, $window, $scope){
    
    $scope.moveToWash = function(){
      $state.go('app.wash');
    }

    console.log("wash");   

  })
  
;