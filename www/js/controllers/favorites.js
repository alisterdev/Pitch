angular.module('app')

.controller('FavoritesCtrl', function ($scope, UserService) {

  $scope.getFavorites = function () {
    console.log(UserService.favorites());

    $scope.favorites = UserService.favorites();
  };

  $scope.removeFavorite = function (id) {
    delete $scope.favorites[id];
    UserService.favorites($scope.favorites);
  };

  // Get favorites when view is active
  $scope.$on('$ionicView.enter', function () {
    $scope.getFavorites();
  });

});