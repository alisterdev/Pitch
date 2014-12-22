angular.module('app')

.controller('PitchCtrl', function ($scope, $stateParams, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate, PitchesResource) {
  // Test data
  $scope.rating = 5;

  // Get pitch id
  var id = $stateParams.id;

  $scope.getPitch = function (noCache) {
    var res = PitchesResource.get({ id: id });

    res.$promise.then(function () {
      $scope.pitch = res;

      // Test data
      $scope.photos = [$scope.pitch.image];
    });
  };

  // Favorite pitch
  $scope.favoritePitch = function () {
    $scope.isFavorite = !$scope.isFavorite;
    var icon = 'ion-ios-heart'
      , message = 'Favorited';

    if (!$scope.isFavorite) {
      icon = icon + '-outline';
      message = 'Unfavorited';
    }

    // Show confirmation message
    $ionicLoading.show({
      template: '<i class="icon icon-large ' + icon + ' assertive"></i> <p class="no-margin">' + message + '</p>',
      duration: 1000,
      noBackdrop: true
    });
  };

  // Add calendar event for pitch
  $scope.addCalendarEvent = function () {

  };

  // Photo functionality
  $scope.showModalPhoto = function () {
    if (typeof $scope.modalPhoto === 'undefined') {
      $ionicModal.fromTemplateUrl('templates/modals/photo.html', {
        scope: $scope,
        animation: 'fade'
      }).then(function (modal) {
        $scope.modalPhoto = modal;
        $scope.modalPhoto.show();

        // Update slide box
        $ionicSlideBoxDelegate.$getByHandle('photoViewer').update();
      });
    } else {
      $scope.modalPhoto.show();
    }
  };

  $scope.hideModalPhoto = function () {
    $scope.modalPhoto.hide();
  };

  // Pitch functionality
  $scope.showModalPitch = function () {
    $ionicModal.fromTemplateUrl('templates/modals/pitch.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalPitch = modal;
      $scope.modalPitch.show();
    });
  };

  $scope.hideModalPitch = function () {
    $scope.modalPitch.remove();
  };

  // Get pitch
  $scope.getPitch();
});