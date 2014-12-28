angular.module('app')

.service('PitchesResource', function ($cachedResource, UserService, API) {
  return $cachedResource('resource.pitches', API.url + '/pitches/:community/:category/:id', { id: '@id', community: '@community', category: '@category', access_token: UserService.user.access_token }, {
    search: { method: 'GET', url: API.url + '/pitches/search', isArray: true }
  });
});