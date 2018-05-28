(function() {
  'use strict';

  angular
  .module('user')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['userService'];

  function LoginController(userService) {
    var vm = this;

    vm.user = userService;
    vm.loading = false;

    vm.login = function(data) {
      data.email = data.email.toLowerCase();

      vm.loading = true;

      userService.login(data)
      .catch(error => {
        toastr.error(error.message);
        vm.loading = false;
      });
    };
  }
})();
