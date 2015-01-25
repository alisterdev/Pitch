angular.module('app')

.factory('Utils', function () {
  return {
    hideKeyboard: function() {
      // Hide keyboard
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.close();
      }
    },
  };
});
