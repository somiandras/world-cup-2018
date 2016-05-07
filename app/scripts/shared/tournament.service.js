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
		

		function uploadMatches (string) {

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

				matches.forEach((match) => {

					matches.$remove(match);
				});


				newList.forEach((newMatch) => {

					matches.$add(newMatch);

				});

				return matches;
			});
		}


		function checkTeamNames (match) {

			let findHome = lookUpTeamName(match.home);
			let findAway = lookUpTeamName(match.away);

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

					console.log(name);
					console.log(existingTeam.shortName);
					console.log(existingTeam.longName);

					return true;

				} else {

					return false;
				}
			})
		}




		function __uploadMatches (matchString) {

			return data.matches.$loaded()
			.then((matches) => {

				let matchList;

				try {

					matchList = parseMatchData(matchString);

				} catch (error) {

					toastr.error(error.message);
				}
				
				if (matchList) {

					//Clear the previous matchlist
					matches.forEach ((element) => {

						matches.$remove(element);
					})
					
					//Add new matchlist
					matchList.forEach((matchElement) => {

						matches.$add(matchElement);
					})
				}

				return matches;
			})
		}


		function parseMatchData (matchString) {

			let matches = matchString.split('\n');

			matches.forEach((element, index, array) => {

				let matchData = element.split(',');
				let matchObj = {};

				if (matchData.length == 4) {

					MATCH_FIELDS.forEach((field, idx) => {

						if (field == 'home' || field == 'away') {

							lookupTeam(matchData[idx])
							.then((team) => {

								if (team) {

									matchObj[field] = team;

								} else {

									throw new Error (matchData[idx] + ' nevű csapat nincs a listában');
								}
							})

						} else {

							matchObj[field] = matchData[idx];
						}
						
					})

					array[index] = matchObj;

				} else {

					throw new Error('Nem stimmel az oszlopok száma')
				}

			})

			return matches;
		}


		function lookupTeam (name) {

			return data.teams.$loaded()
			.then((teams) => {

				let teamFound = teams.find((existingTeam) => {

					return existingTeam.shortName === name || existingTeam.longName === name;
				})

				return teamFound;

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