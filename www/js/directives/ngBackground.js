angular.module('app')

.directive('ngBackground', function () {
  return {
    restrict: 'A',
    scope: {
      ngBackground: '='
    },
    link: function (scope, el, attrs) {
      scope.$watch('ngBackground', function (oldVal, newVal) {
        if (typeof newVal !== 'undefined' || newVal !== oldVal) {
          el[0].style.backgroundImage = "url('" + scope.ngBackground + "')";
        }
      });
    }
  }
});