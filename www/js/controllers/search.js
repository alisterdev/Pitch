angular.module('app')

.controller('SearchCtrl', function ($scope, PitchesResource) {

  // Test data
  $scope.trending = [
    'hello world',
    'shopping marathon',
    '3 bananas for you'
  ];

  $scope.search = function (s) {
    var res = PitchesResource.query({ title: s, tags: s });

    res.$httpPromise.then(function () {
      $scope.results = res;
    });
  };

});