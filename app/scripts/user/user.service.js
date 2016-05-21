(function () {

	'use strict';


	angular.module('user').factory('userService', userService);

	
	userService.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuthService', '$firebaseRef', '$state'];

	
	function userService ($firebaseObject, $firebaseArray, $firebaseAuthService, $firebaseRef, $state) {

		const auth = $firebaseAuthService;

		auth.$onAuth((newData) => {

			if (newData) {

				$state.go('app.dashboard');
				
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


		function getUserList () {

			let users = $firebaseArray($firebaseRef.users);

			return users.$loaded();
		}


		function login (credentials) {

			auth.$authWithPassword(credentials)
			.catch((error) => {

				toastr.error(error);
			});
		}


		function logout () {

			auth.$unauth();
		}


		function register (credentials) {

			let users, uid;

			auth.$createUser(credentials)
			.then((data) => {

				uid = data.uid;

				return auth.$authWithPassword(credentials);
			})
			.then(() => {

				users = $firebaseObject($firebaseRef.users);
				return users.$loaded();
			})
			.then((users) => {

				let date = new Date();

				users[uid] = {
					email: credentials.email,
					createdAt: date.getTime(),
					admin: false,
					uid: uid,
				};

				return users.$save();
			})
			.catch((error) => {

				console.error(error);
			});
		}


		function saveUser (user) {

			let users = $firebaseObject($firebaseRef.users);

			return users.$loaded()
			.then((userRef) => {

				userRef[user.uid] = user;

				return users.$save();
			})
		}


		return {
			login: login,
			logout: logout,
			register: register,
			getUser: getUser,
			saveUser: saveUser,
			getUserList: getUserList
		};
	}

})();