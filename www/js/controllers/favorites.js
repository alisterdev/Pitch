angular.module('app')

.controller('FavoritesCtrl', function ($scope, UserService) {

  $scope.getFavorites = function () {
    $scope.favorites = UserService.favorites();
  };

  $scope.removeFavorite = function (id) {
    delete $scope.favorites[id];
    UserService.favorites($scope.favorites);
  };

  // Get favorites
  $scope.getFavorites();

});