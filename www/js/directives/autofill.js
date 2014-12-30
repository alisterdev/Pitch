angular.module('app')

.directive('autofill', function ($window, $ionicPosition) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      // Wait for DOM to be ready
      el.ready(function () {
        // Set new height
        el.css('height', $window.innerHeight - $ionicPosition.offset(el).top + 'px');
      });
    }
  }
});