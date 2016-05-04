(function () {

	'use strict';


	angular.module('user').factory('userService', userService);

	
	userService.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuthService', '$firebaseRef', '$state'];

	
	function userService ($firebaseObject, $firebaseArray, $firebaseAuthService, $firebaseRef, $state) {

		const auth = $firebaseAuthService;

		let user;

		auth.$onAuth((newData) => {

			if (newData) {

				let users = $firebaseObject($firebaseRef.users);

				users.$loaded()
				.then(() => {

					user = users[newData.uid];
					$state.go('app.dashboard');
				})
				.catch((error) => {

					console.error(error);
				});


			} else {

				$state.go('login');
			}		
		});


		function getUser (uid) {

			let user;
			let users = $firebaseObject($firebaseRef.users);
			
			return users.$loaded()
			.then((ref) => {
				
				return ref[uid];
			})
			.catch((error) => {

				console.error(error);
			});
		}


		function login (credentials) {

			auth.$authWithPassword(credentials)
			.catch((error) => {

				console.error(error);
			});
		}


		function logout () {

			auth.$unauth();
		}


		function register (credentials) {

			let users = $firebaseObject($firebaseRef.users);

			users.$loaded()
			.then(() => {

				return auth.$createUser(credentials);
			})
			.then((data) => {

				let date = new Date();

				users[data.uid] = {
					email: credentials.email,
					createdAt: date.getTime(),
					admin: false
				};

				return users.$save();
			})
			.then(() => {

				login(credentials);
			})
			.catch((error) => {

				console.error(error);
			});
		}


		return {
			login: login,
			logout: logout,
			register: register,
			getUser: getUser
		};
	}

})();