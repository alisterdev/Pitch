angular.module('app')

.controller('LoginCtrl', function ($scope, $state, UserService) {

  $scope.login = function () {
    // Indicate that user is logged in
    UserService.isLoggedIn(true);

    $state.go('tab.featured');
  };

});