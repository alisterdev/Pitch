angular.module('app')

.controller('TabsCtrl', function ($scope, $state) {

  $scope.select = function (state) {
    $state.go('tab.' + state);
  };

});