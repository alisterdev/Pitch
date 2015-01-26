angular.module('app')

.factory('CategoriesResource', function ($cachedResource, UserService, Utils) {
  return $cachedResource('resource.categories', Utils.getApiUrl() + '/categories/:id', { id: '@id', access_token: UserService.user().accessToken });
});
