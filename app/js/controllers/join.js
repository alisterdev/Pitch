angular.module('app')

.controller('JoinCtrl', function ($scope, $state, $cordovaDialogs, CommunitiesResource, UsersResource, UserService) {

  $scope.join = function (data) {
    var res = new UsersResource(data);

    res.$join(function (data) {
      // Store new user data
      UserService.user(data);

      // Show confirmation
      $cordovaDialogs.alert('An email has been sent with a confirmation link. Confirm your registration to gain access to Pitch.', 'Confirmation Sent');
    }, function (err) {

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