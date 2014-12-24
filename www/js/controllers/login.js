angular.module('app')

.controller('LoginCtrl', function ($scope, $state, UserService) {

  $scope.login = function () {
    // Indicate that user is logged in
    

    $state.go('tab.featured');
  };

});