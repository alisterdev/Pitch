angular.module('app')

.service('PitchesResource', function ($cachedResource, UserService, Utils) {
  return $cachedResource('resource.pitches', Utils.getApiUrl() + '/pitches/:id', { id: '@id', access_token: function() { return UserService.user().accessToken; } }, {
    save: { method: 'POST', url: Utils.getApiUrl() + '/pitches', cache: false },
    queryCategory: { method: 'GET', url: Utils.getApiUrl() + '/pitches/category/:category', params: { id: '@id', category: '@category' }, isArray: true },
    contribute: { method: 'PUT', url: Utils.getApiUrl() + '/pitches/:id/contribute', params: { id: '@id' }, cache: false },
    search: { method: 'GET', url: Utils.getApiUrl() + '/pitches/search', params: { id: '@id' }, isArray: true },
    trending: { method: 'GET', url: Utils.getApiUrl() + '/pitches/search/trending', params: { data: '@data' } }
  });
});
