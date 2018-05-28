(function() {
  'use strict';

  angular.module('admin').factory('adminService', adminService);

  adminService.$inject = [
    '$q',
    '$firebaseArray',
    '$firebaseObject',
    '$firebaseRef'
  ];

  function adminService($q, $firebaseArray, $firebaseObject, $firebaseRef) {
    let pendingList = $firebaseArray($firebaseRef.pending);
    let promo = $firebaseObject($firebaseRef.promo);

    return {
      addNewEmails: addNewEmails,
      getPendingList: getPendingList,
      deletePending: deletePending,
      promo: promo,
      addPromoReply: addPromoReply
    };

    function addNewEmails(array, league) {
      let promises = [];

      return pendingList.$loaded()
      .then(list => {
        array.forEach(email => {
          email = email.trim();

          let regexp = /^.*@.*\..*$/;

          let found = list.find(elem => {
            return elem.email === email;
          });

          if (regexp.test(email) && !found) {
            promises.push(list.$add({email: email, league: league}));
          }
        });

        return $q.all(promises);
      });
    }

    function getPendingList() {
      return pendingList.$loaded();
    }

    function deletePending(item) {
      return pendingList.$remove(item);
    }

    function addPromoReply(promotion, user, answer) {
      return promo.$loaded()
      .then(promoObj => {
        promoObj.users = promoObj.users || {};

        promoObj.users[user.uid] = promoObj.users[user.uid] || {};

        promoObj.users[user.uid][promotion.id] = answer;

        return promoObj.$save();
      });
    }
  }
})();
