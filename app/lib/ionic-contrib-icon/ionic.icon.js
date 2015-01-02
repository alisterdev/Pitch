(function(ionic) {

    // Define local variables
    var defaults = {
        type: 'icon',
        map: {}
    };

    /**
    * isEmpty() checks if the given
    * object is empty.
    *
    * @param {Object} obj
    *
    * @return {Boolean}
    */
    function isEmpty(obj) {
        var obj = Object(obj);

        if (Object.keys(obj).length === 0) {
            return true
        }

        return false;
    }

    /**
    * getIconHelper() gets the icon name
    * based on the device's platform and
    * given an icon map.
    *
    * @param {Object} icons
    * @param {Object} map
    *
    * @return {String} i
    */
    function getIconHelper(icons, map) {
        var i = null;

        // Check if icon is empty
        if (isEmpty(map)) {
            map = {};
        }

        // Set icon depending on device's platform
        if (ionic.Platform.isIPad()) {
            i = (icons.ipad || map.ipad);
        } else if (ionic.Platform.isIOS()) {
            i = (icons.ios || map.ios);
        } else if (ionic.Platform.isAndroid()) {
            i = (icons.android || map.android);
        } else if (ionic.Platform.isWindowsPhone()) {
            i = (icons.windows || map.windows);
        }

        // By default use the following icon (if iOS or Android not set)
        if (!i) {
            i = icons['default'];
        }

        return i;
    }

    /**
    * getIcon() gets the appropriate
    * icon name given the passed
    * options and default icon.
    *
    * @param {Object} options
    * @parma {Object} icons
    *
    * @return {String} i
    */
    function getIcon(options, icons) {
        var i = null;

        // Check if using icon mapping
        if (!isEmpty(options.map) && options.map[icons['default']]) {
            i = getIconHelper(icons, options.map[icons['default']]);
        } else {
            i = getIconHelper(icons);
        }

        return i;
    }

    angular.module('ionic.contrib.icon', ['ionic'])

    /**
    * @ngdoc object
    * @name $ionicIconConfig
    * @module ionic.contrib.icon
    * @description
    * Sets default behavior of the icon directive.
    *
    * @param {String} type
    * @param {Object} map
    *
    * @usage
    * ```js
    * var app = angular.module('app', ['ionic', 'ionic.contrib.icon'])
    * app.constant('$ionicIconConfig', {
    *   type: 'icon',
    *   map: {
    *       'ion-heart': {
    *           ios: 'ion-ios7-heart',
    *           android: 'ion-android-heart'
    *       }
    *   }
    * });
    * ```
    */
    .constant('$ionicIconConfig', defaults)

    /**
    * @ngdoc directive
    * @name icon
    * @module ionic.contrib.icon
    * @restrict E
    *
    * @description
    * The icon directive automatically displays platform-specific icons based on passed options
    * defined by the $ionicIconConfig constant.
    *
    * @param {String} ios
    * @param {String} ipad
    * @param {String} android
    * @param {String} windows
    * @param {String} default Required default icon to use.
    */
    .directive('icon', function($ionicIconConfig) {

        return {
            restrict: 'E',
            scope: {
                ios: '@',
                ipad: '@',
                android: '@',
                windows: '@',
                'default': '@'
            },
            link: function($scope, $element, $attrs) {

                var options = $ionicIconConfig
                    , icons = $scope;

                $scope.platform = getIcon(options, icons);

                // Set icon type (library to use)
                $scope.type = $attrs['class'];

                if (!$scope.type) {
                    $scope.type = (options.type || defaults.type);
                }

            },
            template: '<i class="{{ type }} {{ platform }}"></i>'
        };

    })

    /**
    * @ngdoc directive
    * @name icon
    * @module ionic.contrib.icon
    * @restrict C
    *
    * @description
    * The icon class directive automatically displays platform-specific icons based on passed options
    * defined by the $ionicIconConfig constant.
    *
    * @param {Object} icon
    *
    * @usage
    * ```html
    * <i class="icon: ion-heart;"></i>
    * <i class="icon: { ios: 'ion-ios-heart', default: 'ion-heart' };"></i>
    * ```
    */
    .directive('icon', function($ionicIconConfig) {

        return {
            restrict: 'C',
            scope: {
                icon: '='
            },
            link: function($scope, $element, $attrs) {

                var icon = ($scope.icon || $attrs['icon'])
                    , options = $ionicIconConfig;
                
                // If object, then get appropriate icon name
                if (angular.isObject(icon)) {
                    icon = getIcon(options, icon);
                }

                // Append icon name to class
                $element.addClass(icon);

            }
        };

    });
    
})(window.ionic);