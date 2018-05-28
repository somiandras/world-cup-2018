(function() {
  'use strict';

  angular.module('user').controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$window', 'user', 'userService'];

  function ProfileController($window, user, userService) {
    let vm = this;
    vm.user = user;
    vm.form = {};

    vm.editParam = function(param) {
      vm.form[param] = user[param];
    };

    vm.saveParam = function(param, newValue) {
      if (newValue && newValue !== user[param]) {
        user[param] = newValue;

        userService.saveUser(user)
        .then(resp => {
          toastr.success('Elmentettük az új adatot');
        })
        .catch(error => {
          toastr.error(error.message);
        });
      }

      vm.form[param] = false;
    };

    vm.deleteProfile = function(password) {
      let cred = {
        email: user.email,
        password: password
      };

      userService.login(cred)
      .then(() => {
        let confirm = $window.confirm('Biztosan törölni akarod magad? Ezzel minden tipped és eredményed elvész, a Föld pedig a Napba zuhan.');

        if (confirm) {
          return userService.removeUser(cred, user);
        } else {
          profile.showPassword = false;
        }
      })
      .catch(error => {
        toastr.error(error.message);
      });
    };

    vm.changePassword = function(form) {
      let credentials = {
        email: user.email,
        newPassword: form.password,
        oldPassword: form.oldPassword
      };

      userService.changePassword(credentials)
      .then(resp => {
        toastr.success("Elmentettük az új jelszavadat");
        vm.showPasswordChange = false;
      })
      .catch(error => {
        console.error(error);
      });
    };

    vm.reset = function(form) {
      form.$setPristine();
      form.$setUntouched();
    };
  }
})();
