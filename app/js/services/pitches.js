angular.module('app')

.service('PitchesResource', function ($cachedResource, UserService, Utils) {
  return $cachedResource('resource.pitches', Utils.getApiUrl() + '/pitches/:community/:category/:id', { id: '@id', community: '@community', category: '@category', access_token: function() { return UserService.user().accessToken; } }, {
    save: { method: 'POST', url: Utils.getApiUrl() + '/pitches' },
    contribute: { method: 'PUT', url: Utils.getApiUrl() + '/pitches/:id/contribute', params: { id: '@id' } },
    search: { method: 'GET', url: Utils.getApiUrl() + '/pitches/search', isArray: true }
  });
});
