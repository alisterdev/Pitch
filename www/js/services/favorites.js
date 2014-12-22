angular.module('app')

.service('FavoritesResource', function ($cachedResource, $resource, API) {
  // return $cachedResource('favorites', API.url + '/favorites/:user', { user: '@user' });
  return $resource(API.url + '/favorites/:user', { user: '@user' });
});