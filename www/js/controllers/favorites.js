angular.module('app')

.controller('FavoritesCtrl', function ($scope, FavoritesResource, UserService) {

  // Test data
  $scope.favorites = [];
  var user = UserService.get();

  $scope.getFavorites = function (noCache) {
    var res = FavoritesResource.query({ user: user.id });

    if (noCache) {
      res.$httpPromise.then(function () {
        $scope.favorites = res;
        $scope.$broadcast('scroll.refreshComplete');
      });
    } else {
      res.$promise.then(function () {
        $scope.favorites = res;
      });
    }
  };

  // Get favorites
  $scope.getFavorites();

});