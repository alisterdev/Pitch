angular.module('app')

.controller('LoginCtrl', function ($scope, $state, $cordovaFacebook, $cordovaDialogs, UsersResource, UserService, DEC) {

  var user = UserService.user();

  // Check once if need to show intro
  if (!UserService.hasViewedIntro()) {
    // Indicate that viewed intro
    UserService.hasViewedIntro(true);

    $state.go('intro');
  } else if (typeof user.verified !== 'undefined') {
    if (user.verified.status) {
      $state.go('tab.featured');
    } else if (user.verified.slug) {
      // Show message
      $cordovaDialogs.alert('A confirmation email has already been sent to you. Please confirm your registration to the community to gain access to Pitch.', 'Confirm Community Registration');
    } else {
      $state.go('join');
    }
  } else if (typeof user.community === 'object') {
    $state.go('tab.featured');
  } else if (user.accessToken !== '@accessToken') {
    $state.go('join');
  }

  $scope.goToIntro = function () {
    $state.go('intro');
  };

  function accessApp(user, facebookAccessToken) {
    // Store user data
    UserService.user(user);
    UserService.facebookAccessToken(facebookAccessToken);

    if (typeof user.verified !== 'undefined') {
      if (user.verified.status) {
        $state.go('tab.featured');
      } else if (user.verified.slug) {
        // Show message
        $cordovaDialogs.alert('A confirmation email has already been sent to you. Please confirm your registration to the community to gain access to Pitch.', 'Confirm Community Registration');
      } else {
        $state.go('join');
      }
    } else if (!user.community) {
      $state.go('join');
    } else {
      $state.go('tab.featured');
    }
  }

  function login (data) {
    var userID = data.authResponse.userID
      , facebookAccessToken = data.authResponse.accessToken;

    // Get access token to access API
    var res = new UsersResource({ userID: userID });

    res.$oauth(function (data) {
      accessApp(data, facebookAccessToken);
    }, function (err) {
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
            res.$register(function (data) {
              accessApp(data, facebookAccessToken);
            }, function (err) {

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