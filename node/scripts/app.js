'use strict';

var app = angular
  .module('aOne', [
    'ngAnimate',    
    'ngResource',
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment',
    'toaster'
  ])

  .config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'     
      })
      .when('/browse/:itemId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      
      
      .otherwise({
        redirectTo: '/'
      });
  });
