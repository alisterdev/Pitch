angular.module('app')

.factory('CategoriesResource', function ($cachedResource, $resource, API) {
  // return $cachedResource('categories', API.url + '/categories/:id', { id: '@id' });
  return $resource(API.url + '/categories/:id', { id: '@id'});
});