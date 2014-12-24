angular.module('app')

.factory('UsersResource', function ($cachedResource, API) {
  return $cachedResource('resource.users', API.url + '/users/:id', { _id: '@_id' });
})

.factory('UserService', function (localStorageService) {
  return {
    user: function (user) {
      if (typeof user === 'object') {
        localStorageService.set('user', user);
      }

      return localStorageService.get('user') || {};
    },

    favorites: function (favorites) {
      if (typeof favorites === 'object') {
        localStorageService.set('favorites', favorites);
      }

      return localStorageService.get('favorites') || {};
    },

    isLoggedIn: function (value) {
      if (typeof value === 'boolean') {
        localStorageService.set('skipLogin', value)
      }

      return localStorageService.get('skipLogin');
    },

    hasViewedIntro: function (value) {
      if (typeof value === 'boolean') {
        localStorageService.set('skipIntro', value);
      }

      return localStorageService.get('skipIntro');
    }
  };
});