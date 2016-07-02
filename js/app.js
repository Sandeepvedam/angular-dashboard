
'use strict';
var app = angular.module('hospitalInventoryDemoApp',['ngRoute','ngResource','ngMaterial','ngStorage','intializeComponents']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login',{
            controller:'AuthenticationController',
            templateUrl : 'js/components/authentication/partials/authenticationView.html'
        })
        .when('/guestPage',{
            controller:'GuestController',
            templateUrl : 'js/components/guest/partials/guestView.html'
        })
        .otherwise({ redirectTo: '/login' });
});