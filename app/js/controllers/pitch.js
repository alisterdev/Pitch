angular.module('app')

.controller('PitchCtrl', function ($scope, $q, PitchesResource, UserService) {

  $scope.createPitch = function (pitch) {
    var deferred = $q.defer();
    var user = UserService.user();

    // Combine date and time
    var d = new Date(pitch['date']);
    var t = new Date(pitch['time']);
    pitch['date'] = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());

    // Add additional pitch data
    pitch['community'] = user.community.id;

    // Post to API
    var res = new PitchesResource(pitch);
    res.$save(function() {
      // Update user
      UserService.user(res);
      deferred.resolve();
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };

});