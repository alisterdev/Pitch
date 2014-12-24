angular.module('app')

.controller('PitchCtrl', function ($scope, CategoriesResource, UserService) {

  function getCategories () {
    var res = CategoriesResource.query();

    res.$promise.then(function () {
      $scope.categories = res;
    });
  }

  $scope.createPitch = function (pitch) {
    var user = UserService.user();

    // Add community to pitch
    pitch['community'] = user.community;

    // Add creator to pitch
    pitch['creator'] = user._id;

    console.log(pitch);
  };

  getCategories();

});