(function() {
  'use strict';

  angular.module('myBets').directive('listToValidate', listDirective);

  function listDirective() {
    return {
      require: 'ngModel',
      link: link
    };
  }

  function link(scope, element, attr, controller) {
    controller.$validators.listToValidate = function(modelValue, viewValue) {
      let list = attr.listToValidate;
      let data = scope.bets.data;

      if (controller.$isEmpty(modelValue)) {
        return true;
      }

      let check = data[list].find(elem => {
        return (elem.longName === viewValue || elem.name === viewValue);
      });

      if (check) {
        return true;
      }
      return false;
    };
  }
})();
