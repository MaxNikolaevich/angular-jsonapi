(function() {
  'use strict';

  angular.module('angularJsonapi').config(['$provide', function($provide) {
    $provide.decorator('$q', ['$delegate', function($delegate) {
      var $q = $delegate;

      $q.allSettled = $q.allSettled || function allSettled(promises) {
        // Implementation of allSettled function from Kris Kowal's Q:
        // https://github.com/kriskowal/q/wiki/API-Reference#promiseallsettled
        // by Michael Kropat from http://stackoverflow.com/a/27114615/1400432 slightly modified

        var wrapped = angular.isArray(promises) ? [] : {};

        angular.forEach(promises, function(promise, key) {
          if (!wrapped.hasOwnProperty(key)) {
            wrapped[key] = wrap(promise);
          }
        });

        return $q.all(wrapped);

        function wrap(promise) {
          return $q.when(promise)
            .then(function(value) {
              return { success: true, value: value };
            },

            function(reason) {
              return { success: false, reason: reason };
            });
        }
      };

      return $q;
    }]);
  }]);

})();
