(function () {

	'use strict';

	angular.module('appCore').factory('tournamentService', tournamentService);

	tournamentService.$inject = ['$firebaseArray', '$firebaseRef', '$q'];

	function tournamentService ($firebaseArray, $firebaseRef, $q) {

		let data = {};

		data.teams = $firebaseArray($firebaseRef.teams);
		data.matches = $firebaseArray($firebaseRef.matches);

		const MATCH_FIELDS = ['group', 'datetime', 'home', 'away'];


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


		// receive string --> decompose string to matches --> decompose matches to data
		// --> check team names --> compose match object --> add to match list
		

		function uploadMatches (string, replace) {

			let matchlist = decomposeMatches(string);
			let newList;

			try {

				newList = matchlist.map((match) => {

					match = decomposeMatchData(match);
					match = createMatchObject(match);
					checkTeamNames(match);
					return match;
				});
			
			} catch (error) {

				return $q.reject(error);
			}


			return data.matches.$loaded()
			.then((matches) => {

				if (replace) {

					matches.forEach((match) => {

						matches.$remove(match);
					});
				}

				newList.forEach((newMatch) => {

					matches.$add(newMatch);

				});

				return matches;
			});
		}


		function checkTeamNames (match) {

			let findHome = lookUpTeamName(match.home.trim());
			let findAway = lookUpTeamName(match.away.trim());

			console.log(findHome, findAway);

			if (findHome && findAway) {

				match.home = findHome;
				match.away = findAway;

			} else if (!find.home) {

				throw new Error (match.home + ' nevű csapat nincs a listában');
			
			} else {

				throw new Error (match.away + ' nevű csapat nincs a listában');
			}
		}

		function createMatchObject (matchArray) {

			let matchObj = {};

			if (matchArray.length == MATCH_FIELDS.length) {

				matchArray.forEach((currentData, index) => {

					let currentField = MATCH_FIELDS[index];

					matchObj[currentField] = currentData;

				})

				return matchObj;
					
			} else {

				throw new Error ('Nem megfelelő az oszlopok száma')
			}
		}

		function decomposeMatches (string) {

			return string.split('\n');
		}

		function decomposeMatchData (string) {

			return string.split(',');
		}

		function lookUpTeamName (name) {

			return data.teams.find((existingTeam) => {

				if (existingTeam.shortName === name || existingTeam.longName === name) {

					return true;

				} else {

					return false;
				}
			})
		}



		return {
			data: data,
			addTeam: addTeam,
			removeTeam: removeTeam,
			uploadMatches: uploadMatches
		};
	}

})();