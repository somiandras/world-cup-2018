(function () {

	'use strict';

	angular.module('appCore').factory('tournamentService', tournamentService);

	tournamentService.$inject = ['$firebaseArray', '$firebaseRef', '$q'];

	function tournamentService ($firebaseArray, $firebaseRef, $q) {

		let data = {};

		data.teams = $firebaseArray($firebaseRef.teams);
		data.matches = $firebaseArray($firebaseRef.matches);
		data.players = $firebaseArray($firebaseRef.players);

		const MATCH_FIELDS = ['group', 'datetime', 'home', 'away'];


		return {
			data: data,
			addTeam: addTeam,
			getTeam: getTeam,
			saveTeam: saveTeam,
			removeTeam: removeTeam,
			addPlayers: addPlayers,
			removePlayer: removePlayer,
			uploadMatches: uploadMatches,
			saveMatch: saveMatch,
			updateResult: updateResult
		};

		// TEAM METHODS


		function addTeam (newTeam) {

			return data.teams.$loaded()
			.then((teams) => {

				return teams.$add(newTeam);
			})
			.then((ref) => {

				let id = ref.key();
				let index = data.teams.$indexFor(id);

				return data.teams[index];
			});
		}


		function getTeam (shortName) {

			return data.teams.$loaded()
			.then((teams) => {

				let found = teams.find((team) => {

					return team.shortName == shortName;
				})

				return found;
			})
		}


		function saveTeam (team) {

			return data.teams.$loaded()
			.then((teams) => {

				let index = teams.$indexFor(team.$id);

				teams[index] = team;

				return teams.$save(index);
			})
		}


		function removeTeam (team) {

			return data.teams.$loaded()
			.then((teams) => {

				return teams.$remove(team);
			});
		}


		// PLAYER METHODS
		

		function addPlayers (newPlayers, team) {

			return data.players.$loaded()
			.then((players) => {

				let promises = [];

				newPlayers.forEach((newPlayer) => {
					
					if (newPlayer.length) {

						let playerToAdd = {};
						playerToAdd.name = newPlayer;
						playerToAdd.team = team.$id;

						promises.push(players.$add(playerToAdd));
					}
				})

				return $q.all(promises);
			})
		}


		function removePlayer (playerToRemove) {

			return data.players.$loaded()
			.then((players) => {

				return players.$remove(playerToRemove);
			})
		}


		// MATCH METHODS


		function uploadMatches (string) {

			let matchlist = decomposeMatches(string);
			let newList;

			try {

				newList = matchlist.map((match) => {

					match = decomposeMatchData(match);
					match = createMatchObject(match);
					match.datetime = parseDate(match.datetime);
					checkTeamNames(match);

					return match;
				});
			
			} catch (error) {

				return $q.reject(error);
			}


			return data.matches.$loaded()
			.then((matches) => {


				newList.forEach((newMatch) => {

					matches.$add(newMatch);

				});

				return matches;
			});
		}


		function saveMatch (match) {

			return data.matches.$loaded()
			.then((matches) => {

				let index = matches.$indexFor(match.$id);

				return matches.$save(index);
			});

		}


		function updateResult (match, result) {

			let regexp = new RegExp('^[0-9].*[0-9]$');
			
			match.result = {};

			if (result) {

				result = result.trim();
			}

			if (regexp.test(result)) {

				result = result.split("");
				match.result.home = result[0];
				match.result.away = result[result.length-1];

				return saveMatch(match);

			} else if (result) {

				let error = new Error('Az eredmény első és utolsó karaktere szám kell legyen');

				return $q.reject(error);

			} else {

				return saveMatch(match);
			}
		}


		// HELPER FUNCTIONS


		function parseDate (string) {

			let date = new Date (string);

			if (date === 'Invalid Date') {

				throw new Error ('Nem jó a dátumformátum');
			}

			return date.getTime();
		}


		function checkTeamNames (match) {

			let findHome = lookUpTeamName(match.home.trim());
			let findAway = lookUpTeamName(match.away.trim());

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

			if (matchArray.length === MATCH_FIELDS.length) {

				matchArray.forEach((currentData, index) => {

					let currentField = MATCH_FIELDS[index];

					matchObj[currentField] = currentData;

				});

				return matchObj;
					
			} else {

				throw new Error ('Nem megfelelő az oszlopok száma');
			}
		}

		function decomposeMatches (string) {

			return string.split('\n');
		}

		function decomposeMatchData (string) {

			return string.split(';');
		}

		function lookUpTeamName (name) {

			return data.teams.find((existingTeam) => {

				if (existingTeam.shortName === name || existingTeam.longName === name) {

					return true;

				} else {

					return false;
				}
			});
		}
	}

})();