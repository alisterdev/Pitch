angular.module('app')

.factory('HttpInterceptor', function($q, $rootScope, DEC) {
  return {
    responseError: function(rejection) {
      if (rejection['status'] === 401) {
        // Broadcast authentication error
        $rootScope.$broadcast(DEC.unauthorized, rejection);
      }

      return $q.reject(rejection);
    },

  };
});
