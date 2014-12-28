angular.module('app')

.factory('CommunitiesResource', function ($cachedResource, UserService, API) {
  return $cachedResource('resource.communities', API.url + '/communities/:id', { id: '@id', access_token: UserService.user().accessToken });
});