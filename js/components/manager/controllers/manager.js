
var managerController = angular.module('managerModule',[]);

managerController.controller('ManagerController',['$scope','$rootScope','$localStorage','$mdDialog','$mdMedia','$timeout','$route',function($scope,$rootScope,$localStorage,$mdDialog,$mdMedia,$timeout,$route){
    $scope.products = $localStorage.productData ;
    $scope.registeredData = $localStorage.authData;
    $scope.storeKeeperData = [];

    intializeStoreKeepers();
    checkAuthentication();

    function checkAuthentication(){
        if($localStorage.managerLogin!==true){
            location.href = '#/login';
        }
    }

    function intializeStoreKeepers(){
        for(var i in $scope.registeredData){
            if($scope.registeredData[i].userType==='StoreKeeper'){
                $scope.storeKeeperData.push($scope.registeredData[i]);
            }
        }
       $localStorage.storeKeeperData = $scope.storeKeeperData;
    }

    $scope.approveProduct = function (id) {
        $scope.approved = false;
        for(var i in $scope.products){
            if($scope.products[i].productId===id){
                $scope.products[i].isApproved = true;
                $scope.approved=true;
            }
        }

        if($scope.approved){
            $localStorage.productData = $scope.products;
            $scope.products = $localStorage.productData;
        }
    };

    $scope.addStoreKeeper = function(ev) {

        $mdDialog.show({
            controller: ManagerDialogController,
            template: '<md-dialog aria-label="Add User">' +
            ' <md-content class="md-padding"> ' +
            '<form name="userForm"> ' +
            ' <md-input-container flex> ' +
            '<label>Username</label> ' +
            '<input type="text" ng-model="storeKeeper.username">' +
            ' </md-input-container> ' +
            '<md-input-container flex>' +
            ' <label>Password</label>' +
            ' <input type="password" ng-model="storeKeeper.password">' +
            ' </md-input-container>' +
            ' <div layout="column" layout-align="center center">' +
            ' <md-select placeholder="Select userType" ng-model="storeKeeper.userType" style="min-width: 200px;">' +
            ' <md-option ng-value="StoreKeeper" >Store Keeper</md-option> ' +
            '</md-select>' +
            '</div>'+
            '<div class="md-actions" layout="row"> ' +
            '<span flex></span> ' +
            '<md-button ng-click="cancel()"> Cancel </md-button>' +
            ' <md-button ng-click="addingStoreKeeper()" class="md-primary"> Save </md-button> ' +
            '</div>'+
            '</md-dialog>',
            clickOutsideToClose:true,
            targetEvent: ev
        })
            .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.alert = 'You cancelled the dialog.';
            });
    };

    $scope.logout = function (userType) {
        $localStorage.userType = '';
        location.href = "#/login";
        $localStorage.managerLogin = false;
    }

}]);



function ManagerDialogController($scope,$mdDialog,$timeout,$rootScope,$localStorage,$route){

    $scope.storeKeeper = {};
    $scope.storeKeeperData = [];
    $scope.registeredData = $localStorage.authData ;

    $scope.addingStoreKeeper = function () {

        $scope.registeredData.push({
            username: $scope.storeKeeper.username,
            password: $scope.storeKeeper.password,
            userType: 'StoreKeeper',
            done: false
        });
        $scope.storeKeeper = ''; //clear the input after adding
        $localStorage.authData = $scope.registeredData;
        for(var i in $scope.registeredData){
            if($scope.registeredData[i].userType==='StoreKeeper'){
                $scope.storeKeeperData.push($scope.registeredData[i]);
            }
        }
        $localStorage.storeKeeperData = $scope.storeKeeperData;
        $mdDialog.cancel();
    };

    location.href="#/managerPage";

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

}