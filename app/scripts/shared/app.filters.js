(function () {

	'use strict';

	angular.module('appCore')
	.filter('team', teamFilter)
	.filter('open', openFilter)
	.filter('result', resultFilter);

	function teamFilter () {

		return function (list, team) {

			let filteredData = [];
			list = list || [];

			list.forEach((elem) => {

				if (elem.team === team) {

					filteredData.push(elem);
				}
			});

			return filteredData;
		};
	}


	openFilter.$inject = ['APP_CONFIG']

	function openFilter (APP_CONFIG) {

		return function (matchList, trigger, time) {

			let filteredData = [];
			matchList = matchList || [];
			time = time || new Date().getTime();

			if (trigger) {

				matchList.forEach((match) => {

					if (time < match.datetime - APP_CONFIG.timeLimit && !match.result) {

						filteredData.push(match)
					}
				});

				return filteredData;

			} else {

				return matchList;
			}
		}	
	}


	resultFilter.$inject = ['APP_CONFIG']

	function resultFilter (APP_CONFIG) {

		return function (matchList) {

			let filteredData = [];
			matchList = matchList || [];

			matchList.forEach((match) => {

				if (match.result) {

					filteredData.push(match)
				}
			});

			return filteredData;
		}	
	}


})();