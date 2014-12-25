angular.module('app')

.controller('LoginCtrl', function ($scope, $state, UserService) {

  $scope.goToIntro = function () {
    $state.go('intro');
  };

  $scope.login = function () {
    // Indicate that user is logged in
    

    $state.go('tab.featured');
  };

});