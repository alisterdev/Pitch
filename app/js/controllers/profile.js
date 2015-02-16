angular.module('app')

.controller('ProfileCtrl', function ($scope, $state, localStorageService, UsersResource, UserService) {

  $scope.user = UserService.user();

  $scope.$watch('data', function(newVal, oldVal) {
    if (newVal !== oldVal) {
      // Compile upcoming events.
      $scope.upcoming = getUpcomingEvents(newVal.pitches);

      console.log($scope.upcoming);
    }
  });

  function getUpcomingEvents(pitches) {
    var today = new Date(),
      upcoming = [];

    pitches.created.forEach(function(p) {
      if (new Date(p.date) >= today) {
        upcoming.push(p);
      }
    });

    pitches.funded.forEach(function(p) {
      if (new Date(p.date) >= today) {
        upcoming.push(p);
      }
    });

    console.log(upcoming);

    return upcoming;
  }

  function updateUser () {
    var res = UsersResource.me();

    res.$promise
      .then(function () {
        // Make sure has access token to not lose access to API
        if (typeof res.accessToken !== 'undefined') {
          UserService.user(res);
          $scope.user = res;
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
