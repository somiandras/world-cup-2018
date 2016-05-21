(function () {

	'use strict';


	angular.module('user').factory('userService', userService);

	
	userService.$inject = ['$firebaseObject', '$firebaseArray', '$firebaseAuthService', '$firebaseRef', '$state'];

	
	function userService ($firebaseObject, $firebaseArray, $firebaseAuthService, $firebaseRef, $state) {

		const auth = $firebaseAuthService;
		let users;

		auth.$onAuth((newData) => {

			if (newData) {

				$state.go('app.dashboard');
				
			} else {
				
				if (users) {

					users.$destroy();
				} 

				$state.go('login');
			}		
		});


		function getUser (uid) {

			let user;

			users = $firebaseArray($firebaseRef.users);

			return users.$loaded()
			.then((ref) => {
				
				return ref.$getRecord(uid);
			})
			.catch((error) => {

				console.error(error);
			});
		}


		function getUserList () {

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

			let newUid;

			auth.$createUser(credentials)
			.then((data) => {

				newUid = data.uid;

				return auth.$authWithPassword(credentials);
			})
			.then((user) => {

				let userObject = $firebaseObject($firebaseRef.users)

				return userObject.$loaded();
			})
			.then((userObj) => {

				let date = new Date();

				let newUser = {
					email: credentials.email,
					createdAt: date.getTime(),
					admin: false,
					uid: newUid,
				}

				userObj[newUid] = newUser;

				return userObj.$save()
				.then((ref) => {

					return userObj.$destroy();
				})
			})
			.catch((error) => {

				console.error(error);
			});
		}


		function saveUser (user) {

			return users.$save(user);
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