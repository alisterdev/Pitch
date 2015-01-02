angular.module('app')

.controller('JoinCtrl', function ($scope, $state, $ionicPopup, CommunitiesResource, UsersResource, UserService) {

  $scope.join = function (data) {
    var res = new UsersResource(data);

    res.$join(function () {
      // Store new user data
      UserService.user(res);

      // Show confirmation
      $ionicPopup.alert({
        title: 'Confirmation Sent',
        template: 'An email has been sent with a confirmation link. Confirm your registration to gain access to Pitch.'
      });
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