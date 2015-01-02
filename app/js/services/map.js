angular.module('app')

.factory('MapService', function () {
  var defaults = {
    tileLayer: 'http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
    tileLayerOptions: {
      id: 'examples.map-i875mjb7',
      opacity: 1,
      detectRetina: true,
      reuseTiles: true
    }
  };

  return {
    defaults: defaults
  };
});