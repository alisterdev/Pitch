angular.module('app', ['ionic', 'ionic.contrib.icon', 'ngResource', 'LocalStorageModule', 'ngCachedResource', 'uiGmapgoogle-maps', 'ngCordova'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready( function() {
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, uiGmapGoogleMapApiProvider) {

  // Configure local storage
  localStorageServiceProvider.setPrefix('pitch');

  // Configure Google Maps
  uiGmapGoogleMapApiProvider.configure({
    key: '',
    v: '3.17',
    libraries: 'geometry,visualization'
  });

  // Configure states
  $stateProvider

  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })  

  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabsCtrl'
  })

  .state('tab.featured', {
    url: '/featured',
    views: {
      'tab-featured': {
        templateUrl: 'templates/tabs/featured.html',
        controller: 'FeaturedCtrl'
      }
    }
  })

  .state('tab.featured-details', {
    url: '/featured/:id',
    views: {
      'tab-featured': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })

  .state('tab.favorites', {
    url: '/favorites',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tabs/favorites.html',
        controller: 'FavoritesCtrl'
      }
    }
  })

  .state('tab.favorites-details', {
    url: '/favorites/:id',
    views: {
      'tab-favorites': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })

  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/tabs/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.pitch', {
    url: '/pitch',
    views: {
      'tab-pitch': {
        templateUrl: 'templates/tabs/pitch/create.html',
        controller: 'PitchCtrl'
      }
    }
  })

  .state('tab.search-details', {
    url: '/search/:id',
    views: {
      'tab-search': {
        templateUrl: 'templates/tabs/pitch/details.html',
        controller: 'DetailsCtrl'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tabs/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/featured');

});
