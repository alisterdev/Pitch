angular.module('app')

.service('UserService', function (localStorageService) {
  
  this.user = function (user) {
    if (typeof user === 'object') {
      localStorageService.set('user', user);
    }

    if (angular.isDefined(localStorageService.get('user')) && (Object.keys(localStorageService.get('user'))).length == 0) {
      return { accessToken: '@accessToken' };
    }

    return localStorageService.get('user');
  };

  this.facebookAccessToken = function (accessToken) {
    if (typeof accessToken === 'string') {
      localStorageService.set('facebookAccessToken', accessToken);
    }

    return localStorageService.get('facebookAccessToken') || null;
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

})

.factory('UsersResource', function ($cachedResource, UserService, SERVER, API) {
  return $cachedResource('resource.users', API.url + '/users/:id', { id: '@id', access_token: UserService.user().accessToken }, {
    register: { method: 'POST', url: SERVER.url + '/register' },
    oauth: { method: 'POST', url: SERVER.url + '/oauth/access_token' }
  });
});