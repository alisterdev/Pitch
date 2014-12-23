angular.module('app')

.controller('TabsCtrl', function ($scope, $state, $ionicHistory, UserService) {

  // Check once if need to show intro
  if (!UserService.hasViewedIntro()) {
    // Indicate that viewed intro
    UserService.hasViewedIntro(true);

    $state.go('intro');
  } else if (!UserService.isLoggedIn()) {
    $state.go('login');
  }

  $scope.select = function (state) {
    var backView = $ionicHistory.backView()
      , state = 'tab.' + state;

    if (backView !== null && backView.stateName == state) {
      $ionicHistory.goBack();
    } else {
      $state.go(state);
    }
  };

});