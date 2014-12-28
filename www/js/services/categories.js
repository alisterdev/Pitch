angular.module('app')

.factory('CategoriesResource', function ($cachedResource, UserService, API) {
  return $cachedResource('resource.categories', API.url + '/categories/:id', { id: '@id', access_token: UserService.user.access_token });
});