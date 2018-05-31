(function() {
  'use strict';

  angular.module('admin').controller('TeamsController', TeamsController);

  TeamsController.$inject = ['tournamentService'];

  function TeamsController(tournamentService) {
    let vm = this;
    let tour = tournamentService;

    vm.data = tour.data;
    vm.disableUpload = false;

    vm.reset = function(form) {
      vm.form = {};

      form.$setPristine();
      form.$setUntouched();
    };

    vm.upload = function(string, form) {
      tour.addTeams(string)
      .then(resp => {
        if (resp) {
          toastr.success('Csapatok sikeresen feltöltve');
          vm.uploadForm = false;
          vm.reset(form);
        }
      })
      .catch(error => {
        toastr.error(error);
      });
    };
  }
})();
