(function () {

  'use strict';

  angular.module('myBets').factory('betService', betService);

  betService.$inject = ['$q', 'userService', 'tournamentService', 'APP_CONFIG'];

  function betService ($q, userService, tournamentService, APP_CONFIG) {

    return {
      saveWinner: saveWinner,
      saveMatchBet: saveMatchBet
    };


    function saveWinner (bets, user) {

      user.bets = user.bets || {};
      user.bets.winner = bets.winner;
      user.bets.topScorer = bets.topScorer;

      return userService.saveUser(user);
    }


    function saveMatchBet (bet, matchID, user) {

      return tournamentService.getMatch(matchID)
      .then((match) => {

        let now = new Date().getTime();
        let matchTime = match.datetime;
        let timeLimit = APP_CONFIG.timeLimit;

        if (now > matchTime - timeLimit) {

          let error = new Error('Már nem lehet tippet leadni erre a meccsre');
          
          return $q.reject(error);
        }

        user.bets = user.bets || {};
        user.bets.matches = user.bets.matches || {};


        if (bet) {

          try {

            bet = parseBet(bet);
            
          } catch (error) {

            return $q.reject(error);

          }

          user.bets.matches[matchID] = bet;
        }

        return userService.saveUser(user);
      });
    }


    function parseBet (bet) {

      let regexp = new RegExp('^[0-9].*[0-9]$');
      let home, away;

      bet = bet.trim();

      if (regexp.test(bet)) {

        bet = bet.split("");

        home = bet[0];
        away = bet[bet.length-1];

      } else {

        throw new Error('Nem értelmezhető a formátum');
      }

      return {
        home: home,
        away: away
      };
    }
  }

})();