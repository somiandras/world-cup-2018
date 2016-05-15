(function () {

	'use strict';

	angular.module('appCore')
	.filter('team', teamFilter);

	function teamFilter () {

		return function (list, team) {

			let filteredData = [];
			list = list || [];

			list.forEach((elem) => {

				if (elem.team === team) {

					filteredData.push(elem);
				}
			})

			return filteredData;
		}
	}

})();