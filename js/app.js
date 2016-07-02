
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
        .when('/adminPage',{
            controller:'AdminController',
            templateUrl : 'js/components/admin/partials/adminView.html'
        })
        .when('/managerPage',{
            controller:'ManagerController',
            templateUrl : 'js/components/manager/partials/managerView.html'
        })
        .when('/storeKeeperPage',{
            controller:'StoreKeeperController',
            templateUrl : 'js/components/storeKeeper/partials/storeKeeperView.html'
        })
        .otherwise({ redirectTo: '/login' });
});