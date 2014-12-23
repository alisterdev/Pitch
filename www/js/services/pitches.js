angular.module('app')

.service('PitchesResource', function ($cachedResource, $resource, API) {
  return $cachedResource('resource.pitches', API.url + '/pitches/:community/:category/:id', { _id: '@_id', community: '@community', category: '@category' }, {
    search: { method: 'GET', url: API.url + '/pitches/search', isArray: true }
  });
});