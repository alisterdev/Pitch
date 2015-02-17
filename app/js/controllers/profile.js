angular.module('app')

.controller('ProfileCtrl', function ($scope, $state, $ionicModal, localStorageService, UsersResource, UserService, SentenceService) {

  $scope.user = UserService.user();

  $scope.$watch('data', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      // Compile upcoming events.
      $scope.upcoming = getUpcomingEvents(newVal.pitches);
    }
  });

  function getUpcomingEvents(pitches) {
    var today = new Date(),
      upcoming = [],
      count = 0,
      max = 3;

    pitches.created.forEach(function(p) {
      if (new Date(p.date) >= today) {
        upcoming.push(p);
        count++;
      }
    });

    pitches.funded.forEach(function(p) {
      if (new Date(p.date) >= today) {
        upcoming.push(p);
        count++;
      }
    });

    return upcoming;
  }

  function updateUser () {
    var res = UsersResource.me();

    res.$promise
      .then(function(res) {
        // Make sure has access token to not lose access to API
        if (typeof res.accessToken !== 'undefined') {
          UserService.user(res);
          $scope.user = res;

          // Get random sentence
          $scope.memberSince = SentenceService.getRandom(new Date($scope.user.created_at));
        }
      });

    res = UsersResource.profile();

    res.$promise
      .then(function(res) {
        $scope.data = res;
      });
  }

  $scope.logout = function () {
    UserService.logout();
  };

  $scope.viewPitch = function (id) {
    $state.go('tab.profile-details', { id: id });
  };

  // Update user data
  $scope.$on('$ionicView.enter', function () {
    updateUser();
  });

});
