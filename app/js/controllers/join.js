angular.module('app')

.controller('JoinCtrl', function ($scope, $cordovaDialogs, CommunitiesResource, UsersResource, UserService) {

  $scope.goToLogin = function() {
    // Logout
    UserService.logout();
  };

  $scope.join = function (data) {
    var res = new UsersResource(data);

    res.$join(function (data) {
      // Store new user data
      UserService.user(data);

      // Go back to login
      $scope.goToLogin();

      // Show confirmation
      $cordovaDialogs.alert('An email has been sent with a confirmation link. Confirm your registration to gain access to Pitch.', 'Confirmation Sent');
    }, function (err) {
      $cordovaDialogs.alert(err.data.message || 'There was an error.');
    });
  };

  function getCommunities () {
    var res = CommunitiesResource.query();

    res.$promise.then(function () {
      $scope.communities = res;
    });
  }

  // Get communities
  getCommunities();

});