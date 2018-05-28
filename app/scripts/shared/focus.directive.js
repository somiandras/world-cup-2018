(function() {
  'use strict';

  angular
    .module('appCore')
    .directive('ebFocus', ebFocus);

  ebFocus.$inject = ['$timeout'];

  function ebFocus($timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attr) {
      scope.$watch(attr.ebFocus, value => {
        if (value) {
          // Wait for DOM to be ready
          $timeout(() => {
            element[0].focus();
            element[0].selectionStart = 0;
            element[0].selectionEnd = element[0].value.length;
          }, 0);
        } else {
          element[0].blur();
        }
      });
    }
  }
})();
