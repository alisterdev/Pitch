angular.module('app')

.factory('CommunitiesResource', function ($cachedResource, API) {
  return $cachedResource('resource.communities', API.url + '/communities/:id', { _id: '@_id' });
});