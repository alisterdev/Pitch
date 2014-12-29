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

    // Add community and creator to pitch
    pitch['community'] = user.community.id;
    pitch['creator'] = user.id;

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

  // Location modal
  $scope.showModalLocation = function () {
    if (typeof $scope.modalLocation === 'undefined') {
      $ionicModal.fromTemplateUrl('location.html', {
        scope: $scope,
        animation: 'slide-right-left'
      }).then(function (modal) {
        $scope.modalLocation = modal;
        $scope.modalLocation.show();
      });
    } else {
      $scope.modalLocation.show();
    }
  };

  $scope.hideModalLocation = function () {
    $scope.modalLocation.hide();
  };

  getCategories();

});