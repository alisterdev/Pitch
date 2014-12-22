angular.module('app')

.factory('CategoriesResource', function ($cachedResource, $resource, API) {
  return $cachedResource('resource.categories', API.url + '/categories/:id', { _id: '@_id' });
});