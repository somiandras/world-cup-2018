(function () {

	'use strict';

	angular.module('admin').controller('ParticipantsController', ParticipantsController);

	ParticipantsController.$inject = ['$window', 'userList', 'pendingList', 'userService', 'adminService', 'APP_CONFIG'];

	function ParticipantsController ($window, userList, pendingList, userService, adminService, APP_CONFIG) {

		let vm = this;
		vm.players = userList;
		vm.pending = pendingList;
		vm.leagues = APP_CONFIG.leagues;


		vm.makeUserAdmin = function (user) {

			user.admin = true;

			userService.saveUser(user)
			.then(() => {

				toastr.success(user.email + ' admin lett');
			})
			.catch((error) => {

				toastr.error(error);
			});
		};


		vm.addNewEmails = function (list, league) {

			if (list) {

				list = list.replace(/\n/g, '');
					
				let array = list.trim().split(',');

				adminService.addNewEmails(array, league)
				.then((resp) => {

					if (resp.length) {

						toastr.success(resp.length + ' új cím a várólistához adva');

						vm.form.newEmails = undefined;
						vm.showAddEmails = false;

					} else {

						toastr.warning(resp.length + ' új cím került a várólistára');
					}

				})
				.catch((error) => {

					console.error(error);
				});
			}
		};


		vm.deletePending = function (item) {

			adminService.deletePending(item)
			.then((resp) => {

				toastr.success(item.email + ' törölve');
			})
			.catch((error) => {

				console.error(error);
			});

		}


		vm.checkLeague = function (user, league) {

			if (user.league && user.league.length) {

				return user.league.find((item) => {

					return item === league;
				});

			} else {

				return false;
			}			 
		};


		vm.addLeague = function (user, league) {

			user.league = user.league || [];

			user.league.push(league);

			userService.saveUser(user)
			.then(() => {

				toastr.success(user.name + ' a ' + league +' tagja lett');
			})
			.catch((error) => {

				toastr.error(error);
			});
		};
	}

})();