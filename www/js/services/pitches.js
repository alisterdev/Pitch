angular.module('app')

.service('PitchesResource', function ($cachedResource, $resource, API) {
  // return $cachedResource('pitches', API.url + '/pitches/:community/:category/:id', { id: '@id', community: '@community', category: '@category' });
  return $resource(API.url + '/pitches/:community/:category/:id', { id: '@id', community: '@community', category: '@category'});
});