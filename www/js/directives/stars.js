angular.module('app')

.directive('stars', function () {
  return {
    restrict: 'E',
    scope: {
      repeat: '='
    },
    link: function (scope, el, attrs) {
      var star = '<i class="icon ion-ios-star"></i>'
        , halfStar = '<i class="icon ion-ios-star-half"></i>'
        , countStar = parseInt(scope.repeat)
        , countHalfStar = scope.repeat % 2;

      for (var i = 0; i < countStar; i++) {
        el.append(star);
      }

      if (countHalfStar !== 0) {
        el.append(halfStar);
      }
    }
  };
});