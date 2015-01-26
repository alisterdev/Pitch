angular.module('app')

.controller('TabsCtrl', function ($rootScope, UserService, DEC) {

  // Useful helper function
  $rootScope.isEmpty = function (obj) {
    if (angular.isDefined(obj) && (Object.keys(obj)).length == 0) {
      return true;
    }
    return false;
  }

  // Handle authentication errors
  $rootScope.$on(DEC.unauthorized, function(e, data) {
    UserService.logout();
  });

});
