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
    pitch['creator'] = user.id;

    // Post to API
    var res = new PitchesResource(pitch);
    res.$save();

    res.$promise.then(function () {
      // Update user
      UserService.user(res);
      deferred.resolve();
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

});