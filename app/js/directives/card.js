angular.module('app')

.directive('card', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/card.html'
  };
});