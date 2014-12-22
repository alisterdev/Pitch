angular.module('app')

.controller('TabsCtrl', function ($scope, $state, UserService) {

  // Check once if need to show intro
  if (!UserService.hasViewedIntro()) {
    // Indicate that viewed intro
    UserService.hasViewedIntro(true);

    $state.go('intro');
  } else if (!UserService.isLoggedIn()) {
    $state.go('login');
  }

  $scope.select = function (state) {
    $state.go('tab.' + state);
  };

});