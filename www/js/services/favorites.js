angular.module('app')

.service('FavoritesResource', function ($cachedResource, $resource, API) {
  return $cachedResource('resource.favorites', API.url + '/favorites/:user', { user: '@user' });
});