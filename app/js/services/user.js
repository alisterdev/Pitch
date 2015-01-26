angular.module('app')

.service('UserService', function ($state, localStorageService) {

  this.user = function (user) {
    if (typeof user === 'object') {
      localStorageService.set('user', user);
    }

    var user = Object(localStorageService.get('user'));
    if (angular.isDefined(user) && (Object.keys(user)).length == 0) {
      return { accessToken: '@accessToken' };
    }

    return user;
  };

  this.logout = function() {
    this.user({});
    $state.go('login');
  },

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

.factory('UsersResource', function ($cachedResource, UserService, Utils) {
  return $cachedResource('resource.users', Utils.getApiUrl() + '/users/:id', { id: '@id', access_token: UserService.user().accessToken }, {
    register: { method: 'POST', url: Utils.getServerUrl() + '/register', cache: false },
    oauth: { method: 'POST', url: Utils.getServerUrl() + '/oauth/access_token', cache: false },
    me: { method: 'GET', url: Utils.getApiUrl() + '/me', params: { access_token: UserService.user().accessToken }, cache: false },
    join: { method: 'POST', url:  Utils.getApiUrl() + '/me/join', params: { access_token: UserService.user().accessToken }, cache: false }
  });
});
