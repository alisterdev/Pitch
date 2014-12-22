angular.module('app')

.controller('LoginCtrl', function ($scope, $state) {

  $scope.login = function () {
    $state.go('tab.featured');
  };

});