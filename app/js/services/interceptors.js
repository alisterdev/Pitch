angular.module('app')

.factory('HttpInterceptor', function($injector, $q, $rootScope, DEC) {
  var hideLoading = function() {
    $injector.get('$ionicLoading').hide();
  };

  return {
    request: function(config) {
      // Show loading if takes too long
      $injector.get('$ionicLoading').show({
        hideOnStateChange: true,
        noBackdrop: true,
        delay: 500
      });

      return config;
    },

    requestError: function(rejection) {
      hideLoading();
      return response;
    },

    response: function(response) {
      hideLoading();
      return response;
    },

    responseError: function(rejection) {
      hideLoading();

      if (rejection['status'] === 401) {
        // Broadcast authentication error
        $rootScope.$broadcast(DEC.unauthorized, rejection);
      }

      return $q.reject(rejection);
    },

  };
});
