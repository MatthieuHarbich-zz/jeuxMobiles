angular.module('aquarium.users', [])

	.factory('UserFactory', function($http, $stateParams, apiUrl){
		return{
			getUsers: function(callback){
				$http({
					method: 'GET',
					url: apiUrl + '/users'
				}).success(function(users){
					callback(null, users);
				}).error(function(err){
					callback(err);
				});
			},

			getUserById: function(id, callback){
				$http({
					method: 'GET',
					url: apiUrl + '/users/' + id

				}).success(function(user){
					callback(null, user);
				}).error(function(err){
					callback(err);
				});
			}
		};
	})

	.controller('listUsersCtrl', function(apiUrl, UserFactory, $scope){

		UserFactory.getUsers(function(err, data){
			if(err){
				$scope.error = err;
			}else{
				$scope.users = data;
			}
		});

		$scope.toggleUser = function(user) {
      if ($scope.isUserShown(user)) {
        $scope.shownUser = null;
      } else {
        $scope.shownUser = user;
      }
    };

	  $scope.isUserShown = function(user) {
	    return $scope.shownUser === user;
	  };

		
})

	



