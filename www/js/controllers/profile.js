angular.module('app')

.controller('ProfileCtrl', function ($scope, $state, localStorageService, UserService) {

  $scope.user = UserService.user();

  $scope.logout = function () {
    UserService.user({});
    $state.go('login');
  };

  $scope.clearCache = function () {
    localStorageService.clearAll();
  };

});