angular.module('app')

.controller('PitchCtrl', function ($scope, $ionicModal, MapService, CategoriesResource, UserService) {

  // Default data
  $scope.map = {
    defaults: MapService.defaults,
    center: {
      lat: 43.64515935672089,
      lng: -79.3793910741806,
      zoom: 17
    },
    markers: {
      origin: {
        lat: 43.64515935672089,
        lng: -79.3793910741806,
        message: 'Meeting Location'
      }
    },
    events: {
      map: {
        enable: ['click'],
        logic: 'emit'
      }
    }
  };

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

  // Set location on map
  $scope.$on('leafletDirectiveMap.click', function (e) {
    console.log(e);
  });

  $scope.hideModalLocation = function () {
    $scope.modalLocation.hide();
  };

  getCategories();

});