angular.module('app')

.controller('LoginCtrl', function ($scope, $state, $cordovaFacebook, UsersResource, UserService, DEC) {

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

    res.$promise.then(function () {
      accessApp(res, facebookAccessToken);
    }, function (err) {
      // Check if must register user
      if (err.data.code === DEC.user.none) {
        // Get user's name
        $cordovaFacebook.api('/me').then(function (res) {
          // Register new user
          var res = new UsersResource({
            name: {
              first: res.first_name,
              last: res.last_name
            },
            facebook: userID
          });
          res.$register();

          res.$promise.then(function () {
            accessApp(res, facebookAccessToken);
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
    $cordovaFacebook.getLoginStatus().then(function (res) {
      if (res.status !== 'connected') {
        $cordovaFacebook.login(["public_profile"]).then(function (res) {
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