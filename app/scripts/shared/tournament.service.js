(function () {

	'use strict';

	angular.module('appCore').factory('tournamentService', tournamentService);

	tournamentService.$inject = ['$firebaseArray', '$firebaseRef'];

	function tournamentService ($firebaseArray, $firebaseRef) {

		let data = {};

		data.teams = $firebaseArray($firebaseRef.teams);


		function addTeam (newTeam) {

			return data.teams.$loaded()
			.then((teams) => {

				return teams.$add(newTeam);
			})
			.then((ref) => {

				let id = ref.key();
				let index = data.teams.$indexFor(id);

				return data.teams[index];
			})
		}


		function removeTeam (team) {

			return data.teams.$loaded()
			.then((teams) => {

				return teams.$remove(team);
			})
		}

		return {
			data: data,
			addTeam: addTeam,
			removeTeam: removeTeam
		};
	}

})();