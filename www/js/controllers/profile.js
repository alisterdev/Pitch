angular.module('app')

.controller('ProfileCtrl', function ($scope, UserService) {

  $scope.user = UserService.get();

});