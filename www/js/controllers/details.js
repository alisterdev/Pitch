angular.module('app')

.controller('DetailsCtrl', function ($scope, $timeout, $stateParams, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory, $ionicPlatform, $cordovaCalendar, MapService, PitchesResource, UserService) {
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

  $scope.getPitch = function (noCache) {
    var res = PitchesResource.get({ id: id });

    res.$promise.then(function () {
      $scope.pitch = res;

      // Update rating
      $scope.rating = $scope.pitch.creator.rating.value;

      $timeout(function () {
        // Set center for map
        $scope.map.center.lat = $scope.pitch.location.latitude;
        $scope.map.center.lng = $scope.pitch.location.longitude;

        // Add marker to map
        $scope.map.markers['origin'] = {
          lat: $scope.map.center.lat,
          lng: $scope.map.center.lng
        };
      }, 100);

      // Set data for photo viewer
      $scope.photos = [$scope.pitch.image];

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
        $scope.hasPitchedIn = 1;
      } else if ($scope.pitch.creator.id === userID) {
        $scope.hasPitchedIn = 2;
      }

      // Determine if favorite
      updateFavorite($scope.pitch.id);
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
    var loading = $ionicLoading.show();

    var res = new PitchesResource({ id: $scope.pitch.id });
    res.$contribute();

    res.$promise.then(function () {
      // Update pitch
      $scope.pitch = res;

      // Set contributed state
      $scope.hasPitchedIn = 1;

      // Hide modal and loading
      $scope.hideModalPitch();
      loading.hide();
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