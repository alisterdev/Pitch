angular.module('app')

.controller('TabsCtrl', function ($scope, $state, localStorageService) {

  // Check once if need to show intro
  if (!localStorageService.get('skipIntro')) {
    $state.go('intro');
  }

  $scope.select = function (state) {
    $state.go('tab.' + state);
  };

});