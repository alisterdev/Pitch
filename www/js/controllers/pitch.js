angular.module('app')

.controller('PitchCtrl', function ($scope, $ionicModal, CategoriesResource, UserService) {

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

  // Description modal
  $scope.showModalDescription = function () {
    if (typeof $scope.modalDescription === 'undefined') {
      $ionicModal.fromTemplateUrl('description.html', {
        scope: $scope,
        animation: 'slide-right-left'
      }).then(function (modal) {
        $scope.modalDescription = modal;
        $scope.modalDescription.show();
      });
    } else {
      $scope.modalDescription.show();
    }
  };

  $scope.hideModalDescription = function () {
    $scope.modalDescription.hide();
  };

  getCategories();

});