(function () {

	'use strict';


	angular.module('user').factory('userService', userService);

	
	userService.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuthService', '$firebaseRef', '$state'];

	
	function userService ($firebaseObject, $firebaseArray, $firebaseAuthService, $firebaseRef, $state) {

		const auth = $firebaseAuthService;


		auth.$onAuth((newData) => {

			console.log(newData);

			$state.go('app.dashboard');
		
		});


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

			auth.$createUser(credentials)
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
			register: register
		};
	}

})();