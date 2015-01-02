angular.module('app')

.directive('backgroundImage', function () {
  return {
    restrict: 'A',
    scope: {
      backgroundImage: '='
    },
    link: function (scope, el, attrs) {
      scope.$watch('backgroundImage', function (oldVal, newVal) {
        if (typeof newVal !== 'undefined' || newVal !== oldVal) {
          el[0].style.backgroundImage = "url('" + scope.backgroundImage + "')";
        }
      });
    }
  }
});