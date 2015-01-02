angular.module('app')

.controller('LoginCtrl', function ($scope, $state, $cordovaFacebook, UsersResource, UserService, DEC) {

  // Check once if need to show intro
  if (!UserService.hasViewedIntro()) {
    // Indicate that viewed intro
    UserService.hasViewedIntro(true);

    $state.go('intro');
  } else if (typeof UserService.user().community === 'object') {
    $state.go('tab.featured');
  } else if (typeof UserService.user().accessToken !== 'undefined' && UserService.user().accessToken !== '@accessToken') {
    $state.go('join');
  }

  $scope.goToIntro = function () {
    $state.go('intro');
  };

  function accessApp(user, facebookAccessToken) {
    // Store user data
    UserService.user(user);
    UserService.facebookAccessToken(facebookAccessToken);

    $state.go('tab.featured');
  }

  function login (data) {
    var userID = data.authResponse.userID
      , facebookAccessToken = data.authResponse.accessToken;

    // Get access token to access API
    var res = new UsersResource({ userID: userID });
    res.$oauth();

    res.$promise
      .then(function () {
        accessApp(res, facebookAccessToken);
      })
      .catch(function (err) {
        // Check if must register user
        if (err.data.code === DEC.user.none) {
          // Get user's name
          $cordovaFacebook.api('/me')
            .then(function (res) {
              // Register new user
              var res = new UsersResource({
                name: {
                  first: res.first_name,
                  last: res.last_name
                },
                facebook: userID
              });
              res.$register();

              res.$promise
                .then(function () {
                  accessApp(res, facebookAccessToken);
                })
                .catch(function (err) {

                });
            }, function (err) {

            });
        } else {
          
        }
      });
  }

  $scope.login = function () {
    // Login with Facebook
    $cordovaFacebook.getLoginStatus()
      .then(function (res) {
        if (res.status !== 'connected') {
          $cordovaFacebook.login(["public_profile"])
            .then(function (res) {
              login(res);
            }, function (err) {

            });
        } else {
          login(res);
        }
      }, function (err) {

      });
  };

});