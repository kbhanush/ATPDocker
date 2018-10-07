'use strict';

app.controller('NavController', function($rootScope, $scope, $location, toaster, Auth) {


    $scope.$on('userEvent', function(_, user) {

        $scope.name = user.name
        $scope.gravatar = user.gravatar
        $scope.signedIn = user.signedIn
        console.log('logged in user is ', $scope.name, $scope.gravatar, $scope.signedIn)

    });

    $scope.logout = function() {
        var user = {}
        user.name = ''
        user.gravatar = ''
        user.email = ''
        user.signedIn = 0
        $rootScope.$broadcast('userEvent', user)
        toaster.pop('success', "Logged out successfully");
    }



});
