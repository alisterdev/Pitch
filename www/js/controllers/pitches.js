angular.module('app')

.controller('PitchCtrl', function ($scope, $stateParams, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate, $ionicPlatform, $cordovaCalendar, uiGmapGoogleMapApi, PitchesResource, UserService) {
  // Get pitch id
  var id = $stateParams.id;

  // Default data
  $scope.map = {
    markers: [],
    control: {},
    center: {
      latitude: 0,
      longitude: 0
    },
    zoom: 15,
    options: {
      draggable: false,
      disableDefaultUI: true
    }
  };
  $scope.rating = 0;

  function updateFavorite (id) {
    if (typeof UserService.favorites()[$scope.pitch._id] !== 'undefined') {
      $scope.isFavorite = true;
    } else {
      $scope.isFavorite = false;
    }
  }

  $scope.getPitch = function (noCache) {
    var res = PitchesResource.get({ id: id });

    res.$promise.then(function () {
      $scope.pitch = res;

      // Determine rating
      $scope.rating = $scope.pitch.creator.rating.likes / $scope.pitch.creator.rating.dislikes;

      // Set center for map
      $scope.map.center = $scope.pitch.location;

      // Add marker to map
      $scope.map.markers.push({
        id: 'origin',
        latitude: $scope.map.center.latitude,
        longitude: $scope.map.center.longitude
      });

      // Set data for photo viewer
      $scope.photos = [$scope.pitch.image];

      // Determine if favorite
      updateFavorite($scope.pitch._id);
    });
  };

  // Favorite pitch
  $scope.favoritePitch = function () {
    $scope.isFavorite = !$scope.isFavorite;
    var icon = 'ion-ios-heart'
      , message = 'Favorited'
      , favorites = UserService.favorites();

    if (!$scope.isFavorite) {
      icon = icon + '-outline';
      message = 'Unfavorited';

      // Remove stored favorite
      delete favorites[$scope.pitch._id];
    } else {
      // Store favorite
      favorites[$scope.pitch._id] = $scope.pitch;
    }

    // Store new favorites
    UserService.favorites(favorites);

    // Show confirmation message
    $ionicLoading.show({
      template: '<i class="icon icon-large ' + icon + ' assertive"></i> <p class="no-margin">' + message + '</p>',
      duration: 1000,
      noBackdrop: true
    });
  };

  // Add calendar event for pitch
  $scope.addCalendarEvent = function () {
    // Check if ready to safely run Cordova plugin
    $ionicPlatform.ready(function () {
      $cordovaCalendar.createEvent({
        title: $scope.pitch.title,
        notes: $scope.pitch.description,
        startDate: $scope.pitch.date
      }).then(function (result) {
        $ionicLoading.show({
          template: '<i class="icon ion-ios-calendar"></i> <p class="no-margin">Added to Calendar</p>',
          duration: 1000,
          noBackdrop: true
        });
      }).error(function (err) {
        $ionicLoading.show({
          template: 'There was a problem adding to calendar.',
          duration: 1000,
          noBackdrop: true
        });
      });
    });
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

  // Update favorite status when view enter
  $scope.$on('$ionicView.enter', function () {
    if (typeof $scope.pitch !== 'undefined') {
      updateFavorite($scope.pitch._id);
    }
  });

  // Get pitch
  $scope.getPitch();
});