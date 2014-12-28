angular.module('app')

.controller('ProfileCtrl', function ($scope, $state, localStorageService, UsersResource, UserService) {

  $scope.user = UserService.user();

  function updateUser () {
    var res = UsersResource.me();

    res.$promise.then(function () {
      // Make sure has access token to not lose access to API
      if (typeof res.accessToken !== 'undefined') {
        UserService.user(res);
        $scope.user = res;
      }
    });
  }

  $scope.logout = function () {
    UserService.user({});
    $state.go('login');
  };

  $scope.clearCache = function () {
    localStorageService.clearAll();
  };

  // Update user data
  $scope.$on('$ionicView.enter', function () {
    updateUser();
  });

});