angular.module('app')

.directive('formPitch', function ($ionicModal, $ionicLoading, $ionicScrollDelegate, MapService, CategoriesResource) {
  return {
    restrict: 'E',
    scope: {
      'onSubmit': '&'
    },
    controller: function($scope) {
      $scope.pitch = {};

      $scope.submit = function(pitch) {
        // Add location to pitch
        pitch['location']['latitude'] = $scope.map.markers.origin.lat;
        pitch['location']['longitude'] = $scope.map.markers.origin.lng;

        $scope.onSubmit({ pitch: pitch })
          .then(function() {
            // Reset form data
            $scope.pitch = {};
            $scope.formCreatePitch.$setPristine();

            // Scroll top
            $ionicScrollDelegate.scrollTop();

            // Show confirmation message
            $ionicLoading.show({
              template: '<i class="icon icon-large ion-happy-outline balanced"></i> <p class="no-margin">Pitch created!</p>',
              duration: 1000,
              noBackdrop: true
            });
          }, function(error) {
            // Show error message
            $ionicLoading.show({
              template: '<i class="icon icon-large ion-sad-outline assertive"></i> <p class="no-margin">Pitch could not be created...</p>',
              duration: 1000,
              noBackdrop: true
            });
          });
      };

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

      getCategories();
    },
    link: function($scope, $element, $attrs) {
      // Description modal
      $scope.showModalDescription = function () {
        if (typeof $scope.modalDescription === 'undefined') {
          $ionicModal.fromTemplateUrl('templates/modals/description.html', {
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
          $ionicModal.fromTemplateUrl('templates/modals/location.html', {
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

      // Set location on map
      $scope.$on('leafletDirectiveMap.click', function (event, args) {
        var coords = args.leafletEvent.latlng;
        $scope.map.markers['origin'] = {
          lat: coords.lat,
          lng: coords.lng,
          message: 'Meet Here'
        };
      });
    },
    templateUrl: 'templates/directives/forms/pitch.html'
  };
});