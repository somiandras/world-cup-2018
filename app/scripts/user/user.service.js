(function () {

  'use strict';


  angular.module('user').factory('userService', userService);

  
  userService.$inject = ['$q', '$firebaseObject', '$firebaseArray', '$firebaseAuthService', '$firebaseRef', '$state', 'APP_CONFIG', 'adminService'];

  
  function userService ($q, $firebaseObject, $firebaseArray, $firebaseAuthService, $firebaseRef, $state, APP_CONFIG, adminService) {

    const auth = $firebaseAuthService;
    let users = $firebaseArray($firebaseRef.users);
    let usersPublic = $firebaseArray($firebaseRef.public);

    auth.$onAuthStateChanged((newData) => {

      if (newData) {

        if ($state.current.name === 'login' || $state.current.name === 'register') {

          $state.go('app.dashboard', {temporary: newData.password.isTemporaryPassword});
        }
        
      } else {
        
        $state.go('login');
      }   
    });


    function getUser (uid) {

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

      let date = new Date().getTime();

      return auth.$signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {

        return getUser(data.uid);
      })
      .then((user) => {

        user.lastLogin = date;

        return saveUser(user);
      });
    }


    function logout () {

      auth.$signOut();
    }


    function register (credentials) {

      let newUid, pending, pendingList;

      return adminService.getPendingList()
      .then((list) => {

        pendingList = list;

        pending = list.find((item) => {

          let lower = item.email.toLowerCase();

          return  lower === credentials.email;
        });

        if (!pending) {

          let error = new Error ('Ezzel az emailcímmel nem regisztrálhatsz. Írj a szervezőknek!')

          return $q.reject(error);
        
        } else {

          return auth.$createUserWithEmailAndPassword(credentials.email, credentials.password)
        }
      })
      .then((data) => {

        newUid = data.uid;

        return auth.$signInWithEmailAndPassword(credentials.email, credentials.password);
      })
      .then(() => {

        pendingList.$remove(pending);

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
          league: [pending.league]
        };

        userObj[newUid] = newUser;

        return userObj.$save();
      })
      .then((resp) => {

        return usersPublic.$loaded();
      })
      .then((publicData) => {

        return publicData.$add({
          uid: newUid,
          league: [pending.league],
          score: 0
        });
      })
    }


    function saveUser (user) {

      return users.$save(user)
      .then((ref) => {

        return usersPublic.$loaded();
      })
      .then((publicData) => {

        let found = publicData.find((item) => {

          return item.uid === user.uid;
        });

        if (!found) {

          return publicData.$add({
            name: user.name || null, 
            uid: user.uid,
            score: user.totalScore || 0,
            league: user.league,
            bets: user.bets || null,
            company: user.company || null
          });
        
        } else {

          found.name = user.name || null;
          found.score = user.totalScore || 0;
          found.league = user.league;
          found.bets = user.bets || null;
          found.company = user.company || null;

          return publicData.$save(found);
        } 

      });
    }


    function removeUser (cred, user) {

      return users.$remove(user)
      .then(() => {

        return usersPublic.$loaded();
      })
      .then((publicArray) => {

        let found = publicArray.find((item) => {

          return item.uid === user.uid;
        })

        return publicArray.$remove(found);
      })
      .then(() => {

        return auth.$deleteUser();
      });
    }


    function resetPassword (credentials) {

      return auth.$sendPasswordResetEmail(credentials.email);
    }


    function changePassword (credentials) {

      return auth.$updatePassword(credentials.password);
    }


    return {
      public: usersPublic,
      login: login,
      logout: logout,
      register: register,
      getUser: getUser,
      getUserMatchBets: getUserMatchBets,
      saveUser: saveUser,
      removeUser: removeUser,
      getUserList: getUserList,
      resetPassword: resetPassword,
      changePassword: changePassword
    };
  }

})();