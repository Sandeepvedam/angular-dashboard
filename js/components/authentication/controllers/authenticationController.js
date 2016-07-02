'use strict';
var auth = angular.module('authModule',[]);
auth.controller('AuthenticationController',['$scope','$rootScope','$localStorage',function($scope,$rootScope,$localStorage){

    $rootScope.loginCredentials = {};
    $rootScope.isLoginFieldsWrong = false;
    $rootScope.wrongCredentials = '';


    checkAuthentication();

    function checkAuthentication(){
        if($localStorage.adminLogin){
            location.href="#/adminPage"
        }else if($localStorage.managerLogin){
            location.href="#/managerPage"
        }else if($localStorage.storeKeeperLogin){
            location.href="#/storeKeeperPage"
        }else{
            location.href="#/login"
        }
    }

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


    $rootScope.loadProducts = function () {
        var savedData = $localStorage.productData;
        if (savedData) {
            return savedData;
        } else {
            return [
                {
                    productId : 1,
                    productName : "product1",
                    productPrice : 300,
                    productImage : "http://image.made-in-china.com/2f1j00SOytUAsRSbov/Professional-Plastic-Products-of-Gusseted-Bags-Reels-for-Hospital-Use.jpg",
                    isApproved : true
                },{
                    productId : 2,
                    productName : "product2",
                    productPrice : 1000,
                    productImage : "http://www.electricminimassager.com/photo/pl4479678-hospital_product_nursing_care_restraint_straps_medical_wrist_restraints.jpg",
                    isApproved : true
                },{
                    productId : 3,
                    productName : "product3",
                    productPrice : 900,
                    productImage : "http://web.tradekorea.com/upload_file2/product/932/P00328932/cbe9caa6_9591e742_2864_442a_b1fa_8f9cc2594a44.jpg",
                    isApproved : false
                }
            ];
        }
    };

    $rootScope.products = $rootScope.loadProducts();
    $localStorage.productData = $rootScope.products;

    $rootScope.guestLogin = function () {
        location.href='#/guestPage';
    };

    $rootScope.registeredData = $rootScope.loadCredentials();
    $localStorage.authData = $rootScope.registeredData;

    $rootScope.doLogin = function (loginFormData) {
        if(loginFormData.$valid){
            $rootScope.checkLoginCredentials();
        }else{
            $rootScope.isLoginFieldsWrong = true;
        }
    };

    $rootScope.checkLoginCredentials = function () {
        //the array obtained from local storage
        var signUpDetails = $rootScope.registeredData;
        for(var i in signUpDetails){
            if(signUpDetails[i].username===$rootScope.loginCredentials.username && signUpDetails[i].password===$rootScope.loginCredentials.password){
                console.log("logged-in");

                if(signUpDetails[i].userType==='Admin'){
                    location.href="#/adminPage";
                    $localStorage.userType = signUpDetails[i].userType;
                    $localStorage.adminLogin = true;
                    $rootScope.wrongCredential = false;
                }
                else if(signUpDetails[i].userType==='Manager'){
                    location.href="#/managerPage";
                    $localStorage.userType = signUpDetails[i].userType;
                    $localStorage.managerLogin = true;
                    $rootScope.wrongCredential = false;
                }else{
                    location.href="#/storeKeeperPage";
                    $localStorage.userType = signUpDetails[i].userType;
                    $localStorage.storeKeeperLogin = true;
                    $rootScope.wrongCredential = false;
                }
            }else{
                console.log("Checking...");
                $rootScope.wrongCredential = true;
            }
        }

        if($rootScope.wrongCredential){
            $rootScope.loginCredentials = {};
            $rootScope.wrongCredentials = 'Wrong Credentials!!! Please enter correct credentials.'
        }
    };

    $rootScope.logout = function (userType) {
        $localStorage.userType = '';
        location.href = "#/login";
    }

}]);