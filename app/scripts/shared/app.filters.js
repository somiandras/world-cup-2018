(function() {
  'use strict';

  angular.module('appCore')
  .filter('team', teamFilter)
  .filter('open', openFilter)
  .filter('noResult', noResultFilter)
  .filter('result', resultFilter)
  .filter('league', leagueFilter);

  function teamFilter() {
    return function(list, team) {
      let filteredData = [];
      list = list || [];

      list.forEach(elem => {
        if (elem.team === team) {
          filteredData.push(elem);
        }
      });

      return filteredData;
    };
  }

  openFilter.$inject = ['APP_CONFIG'];

  function openFilter(APP_CONFIG) {
    return function(matchList, open, time) {
      let filteredData = [];
      matchList = matchList || [];
      time = time || new Date().getTime();

      if (open) {
        matchList.forEach(match => {
          if (time < match.datetime - APP_CONFIG.timeLimit && !match.result) {
            filteredData.push(match);
          }
        });

        return filteredData;
      } else {
        matchList.forEach(match => {
          if (time > match.datetime - APP_CONFIG.timeLimit || match.result) {
            filteredData.push(match);
          }
        });

        return filteredData;
      }
    };
  }

  function noResultFilter() {
    return function(matchList) {
      let filteredData = [];

      matchList = matchList || [];

      matchList.forEach(match => {
        if (!match.result) {
          filteredData.push(match);
        }
      });

      return filteredData;
    };
  }

  resultFilter.$inject = ['APP_CONFIG'];

  function resultFilter(APP_CONFIG) {
    return function(matchList) {
      let filteredData = [];
      matchList = matchList || [];

      matchList.forEach(match => {
        if (match.result) {
          filteredData.push(match);
        }
      });

      return filteredData;
    };
  }

  function leagueFilter() {
    return function(array, league) {
      let filtered = [];

      if (league) {
        array.forEach(item => {
          if (typeof item.league === 'object') {
            let found = item.league.find(x => {
              return x === league;
            });

            if (found) {
              filtered.push(item);
            }
          } else if (typeof item.league === 'string') {
            if (item.league === league) {
              filtered.push(item);
            }
          }
        });

        return filtered;
      } else {
        return array;
      }
    };
  }
})();
