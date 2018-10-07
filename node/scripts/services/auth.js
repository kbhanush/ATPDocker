'use strict';

app.factory('Auth', ['$resource',
    function($resource) {

        return {
            newUser: $resource('/user', {}, {
                method: 'POST'
            }),

            login: $resource('/login/:email/:pw', {}, {
                method: 'GET',
                isArray: false
            }),


        };
    }
]);


app.factory('User', function($http) {

    var currentUser = {};


    var User = {

        getCurrentUser: function() {

            return currentUser;
        },

        registerUser: function(user) {

            return $http.post('/user', user)

        },


        setCurrentUser: function(user) {


            currentUser.name = user.name;
            currentUser.gravatar = user.gravatar
            currentUser.uid = user.uid
            currentUser.email = user.email
            currentUser.signedIn = user.signedIn



        },

        isSignedIn: function() {
            if (currentUser.signedIn) {
                return true
            }
            return false;
        },

        changePassword: function(payload) {
            return $http.post('/userpass', payload)
        }




    }

    return User;
});
