(function() {
  'use strict';

  angular.module('admin').directive('duplicate', duplicate);

  function duplicate() {
    return {
      require: 'ngModel',
      link: link
    };
  }

  function link(scope, element, attrs, controller) {
    controller.$validators.duplicate = function(modelValue, viewValue) {
      let prop = element.context.name;
      let teams = scope.teams.data.teams;

      if (controller.$isEmpty(modelValue)) {
        return true;
      }

      let check = teams.find(element => {
        return element[prop] === viewValue;
      });

      if (check) {
        return false;
      }
      return true;
    };
  }
})();
