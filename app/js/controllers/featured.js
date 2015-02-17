angular.module('app')

.controller('FeaturedCtrl', function ($scope, $state, $ionicModal, $ionicSlideBoxDelegate, PitchesResource, CategoriesResource, UserService) {
  var user = UserService.user();

  function getCategories () {
    var res = CategoriesResource.query();

    res.$promise.then(function () {
      // Default category
      $scope.categories = [{ id: 0, title: "All Categories" }];

      $scope.categories = $scope.categories.concat(res);
      $scope.selectedCategory = $scope.categories[1];

      // Get initial featured pitches
      getPitches();
    });
  }

  function getPitches () {
    var res = PitchesResource.query({ category: $scope.selectedCategory.id });

    res.$promise.then(function () {
      $scope.featured = res;

      // Update slide box
      $ionicSlideBoxDelegate.update();
    });
  }

  // Categories
  $scope.showCategories = function () {
    if (typeof $scope.modalCategories === 'undefined') {
      $ionicModal.fromTemplateUrl('templates/modals/categories.html', { scope: $scope }).then(function (modal) {
        $scope.modalCategories = modal;
        $scope.modalCategories.show();
      });
    } else {
      $scope.modalCategories.show();
    }
  };

  $scope.hideCategories = function () {
    $scope.modalCategories.hide();
  };

  $scope.selectCategory = function (category) {
    $scope.selectedCategory = category;
    getPitches();
    $scope.hideCategories();
  };

  $scope.viewPitch = function (id) {
    $state.go('tab.featured-details', { id: id });
  };

  // Get pitches when view is active
  $scope.$on('$ionicView.enter', function () {
    if (typeof $scope.categories === 'undefined') {
      // Get initial categories once
      getCategories();
    } else {
      getPitches();
    }
  });

});
