angular.module('app')

.service('PitchesResource', function ($cachedResource, UserService, Utils) {
  return $cachedResource('resource.pitches', Utils.getApiUrl() + '/pitches/:category/:id', { id: '@id', category: '@category', access_token: function() { return UserService.user().accessToken; } }, {
    save: { method: 'POST', url: Utils.getApiUrl() + '/pitches', cache: false },
    contribute: { method: 'PUT', url: Utils.getApiUrl() + '/pitches/:id/contribute', params: { id: '@id' }, cache: false },
    search: { method: 'GET', url: Utils.getApiUrl() + '/pitches/search', isArray: true, cache: false },
    trending: { method: 'GET', url: Utils.getApiUrl() + '/pitches/search/trending', params: { id: '@id' }, isArray: true }
  });
});
