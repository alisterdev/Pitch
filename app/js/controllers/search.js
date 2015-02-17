angular.module('app')

.controller('SearchCtrl', function ($scope, $state, PitchesResource, Utils) {

  function getTrendingSearches() {
    var res = PitchesResource.trending();

    res.$httpPromise.then(function(res) {
      $scope.trending = res;
    });
  }

  $scope.search = function (query) {
    $scope.query = query;

    var res = PitchesResource.search({ title: query });

    res.$httpPromise.then(function () {
      $scope.results = res;
      $scope.hasResults = true;
    });

    // Hide keyboard
    Utils.hideKeyboard();
  };

  $scope.cancelSearch = function (e) {
    $scope.results = [];
    $scope.hasResults = false;
    $scope.query = null;

    // Prevent input to be triggered
    e.gesture.srcEvent.preventDefault();
    e.gesture.srcEvent.stopPropagation();

    // Hide keyboard
    Utils.hideKeyboard();
  };

  $scope.viewPitch = function (id) {
    $state.go('tab.search-details', { id: id });
  };

  getTrendingSearches();

});
