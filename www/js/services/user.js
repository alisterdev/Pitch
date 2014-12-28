angular.module('app')

.factory('UsersResource', function ($cachedResource, API) {
  return $cachedResource('resource.users', API.url + '/users/:id', { id: '@id' }, {
    register: { method: 'POST', url: '/register' },
    oauth: { method: 'POST', url: '/oauth/access_token' }
  });
})

.service('UserService', function (localStorageService) {
  
  this.user = function (user) {
    if (typeof user === 'object') {
      localStorageService.set('user', user);
    }

    return localStorageService.get('user') || {};
  };

  this.favorites = function (favorites) {
    if (typeof favorites === 'object') {
      localStorageService.set('favorites', favorites);
    }

    return localStorageService.get('favorites') || {};
  };

  this.isLoggedIn = function () {
    if (Object.keys(this.user()).length) {
      return true;
    }
    
    return false;
  };

  this.hasViewedIntro = function (value) {
    if (typeof value === 'boolean') {
      localStorageService.set('skipIntro', value);
    }

    return Boolean(localStorageService.get('skipIntro'));
  };

});