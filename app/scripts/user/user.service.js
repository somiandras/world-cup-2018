(function () {

	'use strict';


	angular.module('user').factory('userService', userService);

	
	userService.$inject = ['$q', '$firebaseObject', '$firebaseArray', '$firebaseAuthService', '$firebaseRef', '$state', 'APP_CONFIG'];

	
	function userService ($q, $firebaseObject, $firebaseArray, $firebaseAuthService, $firebaseRef, $state, APP_CONFIG) {

		const auth = $firebaseAuthService;
		let users, currentUid;

		auth.$onAuth((newData) => {

			if (newData) {

				currentUid = newData.uid;

				if ($state.current.name === 'login') {

					$state.go('app.dashboard');
				}
				
			} else {
				
				if (users) {

					users.$destroy();
				} 

				currentUid = undefined;

				$state.go('login');
			}		
		});


		function getCurrentUser () {

			return currentUid;
		}


		function getUser (uid) {

			users = $firebaseArray($firebaseRef.users);

			return users.$loaded()
			.then((ref) => {
				
				return ref.$getRecord(uid);
			})
		}


		function getUserMatchBets (uid) {

			let matchesRef = new Firebase(APP_CONFIG.fbUrl + 'users/' + uid + '/bets/matches')

			let matches = $firebaseArray(matchesRef);

			if (matches) {

				return matches.$loaded();

			} else {

				let error = ("Nem sikerült betölteni a meccseket");

				return $q.reject(error);
			}
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
			.then(() => {

				let userObject = $firebaseObject($firebaseRef.users);

				return userObject.$loaded();
			})
			.then((userObj) => {

				let date = new Date();

				let newUser = {
					email: credentials.email,
					createdAt: date.getTime(),
					admin: false,
					uid: newUid,
				};

				userObj[newUid] = newUser;

				return userObj.$save()
				.then(() => {

					return userObj.$destroy();
				});
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
			getCurrentUser: getCurrentUser,
			getUserMatchBets: getUserMatchBets,
			saveUser: saveUser,
			getUserList: getUserList
		};
	}

})();