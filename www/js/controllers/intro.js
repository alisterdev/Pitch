angular.module('app')

.controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate) {

  var slideBox = $ionicSlideBoxDelegate.$getByHandle('introSlideBox');
  var lastIndex = 4;

  $scope.slideChanged = function (index) {
    if (index == lastIndex) {
      $scope.isEnd = true;
    } else {
      $scope.isEnd = false;
    }
  };

  $scope.next = function () {
    slideBox.next();
  };

  $scope.viewLogin = function () {
    $state.go('login');
  };

});