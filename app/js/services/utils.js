angular.module('app')

.factory('Utils', function ($ionicPlatform) {
  return {
    getApiUrl: function() {
      return ionic.Platform.isWebView() ? 'http://pitch.ngrok.com/api/v1' : '/api/v1';
    },

    getServerUrl: function() {
      return ionic.Platform.isWebView() ? 'http://pitch.ngrok.com' : '/server';
    },

    hideKeyboard: function() {
      // Hide keyboard
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.close();
      }
    },
  };
});
