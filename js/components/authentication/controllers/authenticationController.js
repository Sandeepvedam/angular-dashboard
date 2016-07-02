'use strict';
var auth = angular.module('authModule',[]);
auth.controller('AuthenticationController',['$rootScope','$localStorage',function($rootScope,$localStorage){

    $rootScope.loginCredentials = {};

    $rootScope.loadCredentials = function() {
        var savedData = $localStorage.authData;
        if (savedData) {
            return savedData;
        } else {
            return [
                {
                    username : "admin",
                    password : "admin",
                    userType : "Admin"
                },{
                    username : "manager",
                    password : "manager",
                    userType : "Manager"
                },{
                    username : "storekeeper",
                    password : "storekeeper",
                    userType : "StoreKeeper"
                }
            ];
        }
    };


    $rootScope.guestLogin = function () {
        location.href='#/guestPage';
    };

    $rootScope.registeredData = $rootScope.loadCredentials();
    $localStorage.authData = $rootScope.registeredData;

    $rootScope.doLogin = function (loginFormData) {
        $rootScope.checkLoginCredentials();
    };

    $rootScope.checkLoginCredentials = function () {
        //the array obtained from local storage
        var signUpDetails = $rootScope.registeredData;
        for(var i in signUpDetails){
            if(signUpDetails[i].username===$rootScope.loginCredentials.username && signUpDetails[i].password===$rootScope.loginCredentials.password){
                console.log("logged-in");

                if(signUpDetails[i].userType==='Admin'){
                    location.href="#/adminPage";
                }
                else if(signUpDetails[i].userType==='Manager'){
                    location.href="#/managerPage";
                }else{
                    location.href="#/storeKeeperPage";
                }
            }else{
                console.log("Checking...");
            }
        }
    }

}]);