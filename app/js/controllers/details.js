angular.module('app')

.controller('DetailsCtrl', function ($scope, $stateParams, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory, $ionicPlatform, $cordovaCalendar, leafletData, MapService, PitchesResource, UserService) {
  // Get pitch id
  var id = $stateParams.id;

  // Default data
  $scope.map = {
    defaults: angular.extend(MapService.defaults, { dragging: false, scrollWheelZoom: 'center', doubleClickZoom: 'center' }),
    markers: {},
    center: {
      lat: 0,
      lng: 0,
      zoom: 17
    }
  };
  $scope.rating = 0;

  function updateFavorite (id) {
    if (typeof UserService.favorites()[$scope.pitch.id] !== 'undefined') {
      $scope.isFavorite = true;
    } else {
      $scope.isFavorite = false;
    }
  }

  function updatePitch(pitch) {
    $scope.pitch = pitch;

    // Update rating
    $scope.rating = $scope.pitch.creator.rating.value;

    // Determine if can pitch in
    var userID = UserService.user().id
      , hasContributed = false
      , contributors = $scope.pitch.pitchers.contributed;

    for (var i = 0; i < contributors.length; i++) {
      if (contributors[i] === userID) {
        hasContributed = true;
        break;
      }
    }

    if (hasContributed) {
      $scope.canContribute = 1;
    } else if ($scope.pitch.creator.id === userID) {
      $scope.canContribute = 2;
    } else if (contributors.length === $scope.pitch.pitchers.required) {
      $scope.canContribute = 3;
    }

    // Set center for map
    $scope.map.center.lat = $scope.pitch.location.latitude;
    $scope.map.center.lng = $scope.pitch.location.longitude;

    // Add marker to map
    $scope.map.markers['origin'] = {
      lat: $scope.map.center.lat,
      lng: $scope.map.center.lng
    };

    // Set data for photo viewer
    $scope.photos = [$scope.pitch.image];

    // Determine if favorite
    updateFavorite($scope.pitch.id);

    // Resize map
    leafletData.getMap().then(function(map) {
      map._onResize();
    });

    // Hide loading
    $ionicLoading.hide();
  }

  $scope.getPitch = function () {
    var res = PitchesResource.get({ id: id });

    res.$httpPromise.then(function (res) {
      updatePitch(res);
    }, function (err) {
      // If error, remove from favorites and go back a view
      var favorites = UserService.favorites();
      delete favorites[id];
      UserService.favorites(favorites);

      $ionicHistory.goBack();
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
      delete favorites[$scope.pitch.id];
    } else {
      // Store only necessary data in favorite
      favorites[$scope.pitch.id] = {
        title: $scope.pitch.title,
        creator: $scope.pitch.creator.name.first + ' ' + $scope.pitch.creator.name.last
      };
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
    // Disable if no image
    if (!$scope.pitch['image']) {
      return false;
    }

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
    $ionicModal.fromTemplateUrl('templates/modals/contribute.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modalPitch = modal;
      $scope.modalPitch.show();
    });
  };

  $scope.contribute = function () {
    // Start loading
    $ionicLoading.show();

    var res = new PitchesResource({ id: $scope.pitch.id });
    res.$contribute(function(res) {
      // Update pitch
      updatePitch(res);

      // Hide modal
      $scope.hideModalPitch();
    }, function(err) {
      // Hide modal and loading
      $scope.hideModalPitch();
      $ionicLoading.hide();
    });
  };

  $scope.hideModalPitch = function () {
    $scope.modalPitch.remove();
  };

  // Update favorite status when view enter
  $scope.$on('$ionicView.enter', function () {
    if (typeof $scope.pitch !== 'undefined') {
      updateFavorite($scope.pitch.id);
    }
  });

  // Get pitch
  $scope.getPitch();
});
