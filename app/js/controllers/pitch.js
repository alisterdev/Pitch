angular.module('app')

.controller('PitchCtrl', function ($scope, $ionicModal, MapService, CategoriesResource, PitchesResource, UserService) {

  // Default data
  $scope.map = {
    defaults: MapService.defaults,
    center: {
      lat: 43.64515935672089,
      lng: -79.3793910741806,
      zoom: 17
    },
    markers: {},
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

    // Combine date and time
    var d = new Date(pitch['date']);
    var t = new Date(pitch['time']);
    pitch['date'] = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());

    // Add additional pitch data
    pitch['community'] = user.community.id;
    pitch['creator'] = user.id;
    pitch['location']['latitude'] = $scope.map.markers.origin.lat;
    pitch['location']['longitude'] = $scope.map.markers.origin.lng;

    // Post to API
    var res = new PitchesResource(pitch);
    res.$save();

    res.$promise.then(function () {
      // Update user
      UserService.user(res);
    });
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
  $scope.$on('leafletDirectiveMap.click', function (event, args) {
    var coords = args.leafletEvent.latlng;
    $scope.map.markers['origin'] = {
      lat: coords.lat,
      lng: coords.lng,
      message: 'Meet Here'
    };
  });

  $scope.hideModalLocation = function () {
    $scope.modalLocation.hide();
  };

  getCategories();

});