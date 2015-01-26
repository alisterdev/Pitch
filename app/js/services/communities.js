angular.module('app')

.factory('CommunitiesResource', function ($cachedResource, UserService, Utils) {
  return $cachedResource('resource.communities', Utils.getApiUrl() + '/communities/:id', { id: '@id', access_token: function() { return UserService.user().accessToken; } });
});
