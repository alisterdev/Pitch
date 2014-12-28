angular.module('app')

.controller('JoinCtrl', function ($scope, CommunitiesResource, UserService) {

  $scope.join = function (data) {
    var res = new UserService(data);
    res.$join();

    res.$promise.then(function () {
      
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