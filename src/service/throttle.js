/**
 * @ngdoc service
 * @name ngTasty.service.throttle
 * @description
 * # throttle
 * Factory in ngTasty.
 */
angular.module('ngTasty.service.throttle', [])
.factory('throttle', function ($timeout) {
  return function (fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, promise;
    return function () {
      var context = scope || this;
      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        $timeout.cancel(promise);
        promise = $timeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  };
});
