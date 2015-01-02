angular.module('app')

.controller('TabsCtrl', function ($scope, $rootScope, $state, $ionicHistory, UserService) {

  // Useful helper function
  $rootScope.isEmpty = function (obj) {
    if (angular.isDefined(obj) && (Object.keys(obj)).length == 0) {
      return true;
    }
    return false;
  }

});