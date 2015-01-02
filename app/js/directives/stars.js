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
        , emptyStar = '<i class="icon ion-ios-star-outline"></i>'
        , countStar = parseInt(scope.repeat)
        , countHalfStar = scope.repeat - countStar
        , countEmptyStar = parseInt(5 - scope.repeat);

      for (var i = 0; i < countStar; i++) {
        el.append(star);
      }

      if (countHalfStar !== 0) {
        el.append(halfStar);
      }

      for (var i = 0; i < countEmptyStar; i++) {
        el.append(emptyStar);
      }

    }
  };
});