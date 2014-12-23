angular.module('app')

.controller('TabsCtrl', function ($scope, $rootScope, $state, $ionicHistory, UserService) {

  // Check once if need to show intro
  if (!UserService.hasViewedIntro()) {
    // Indicate that viewed intro
    UserService.hasViewedIntro(true);

    $state.go('intro');
  } else if (!UserService.isLoggedIn()) {
    $state.go('login');
  }

  // Useful helper function
  $rootScope.isEmpty = function (obj) {
    if (angular.isDefined(obj) && (Object.keys(obj)).length == 0) {
      return true;
    }
    return false;
  }

});