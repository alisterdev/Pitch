angular.module('app')

.controller('JoinCtrl', function ($scope, $state, CommunitiesResource, UsersResource, UserService) {

  $scope.join = function (data) {
    var res = new UsersResource(data);
    res.$join();

    res.$promise.then(function () {
      // Store new user data
      UserService.user(res);

      // Access app
      $state.go('tab.featured');
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