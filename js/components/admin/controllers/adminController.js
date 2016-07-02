
var adminController = angular.module('adminModule',[]);

adminController.controller('AdminController',['$scope','$rootScope','$localStorage','$mdDialog','$mdMedia','$timeout',function($scope,$rootScope,$localStorage,$mdDialog,$mdMedia,$timeout){
   $scope.registeredData = $localStorage.authData ;

    $scope.inventoryProductData = $localStorage.productData;

    checkAuthentication();

    function checkAuthentication(){
        if($localStorage.adminLogin!==true){
            location.href = '#/login';
        }
    }

    $scope.deleteUser = function (user) {
        $scope.registeredData.splice($scope.registeredData.indexOf(user), 1);
        $scope.usersCount = $scope.registeredData.length;
        $localStorage.authData = $scope.registeredData;
    };

    $scope.deleteInventoryProducts = function (product) {
        $scope.inventoryProductData.splice($scope.inventoryProductData.indexOf(product), 1);
        $scope.productCount = $scope.inventoryProductData.length;
        $localStorage.productData = $scope.inventoryProductData;
    };

    $scope.addUser = function(ev) {

        $mdDialog.show({
            controller: AdminDialogController,
            template: '<md-dialog aria-label="Add User">' +
            ' <md-content class="md-padding"> ' +
            '<form name="userForm"> ' +
            ' <md-input-container flex> ' +
            '<label>Username</label> ' +
            '<input type="text" ng-model="newUser.username">' +
            ' </md-input-container> ' +
            '<md-input-container flex>' +
            ' <label>Password</label>' +
            ' <input type="password" ng-model="newUser.password">' +
            ' </md-input-container>' +
            ' <div layout="column" layout-align="center center">' +
            ' <md-select placeholder="Select userType" ng-model="newUser.userType" md-on-open="loadUserTypes()" style="min-width: 200px;">' +
            ' <md-option ng-value="user" ng-repeat="user in userTypes">{{user.userType}}</md-option> ' +
            '</md-select>' +
            '</div>'+
            '<div class="md-actions" layout="row"> ' +
            '<span flex></span> ' +
            '<md-button ng-click="cancel()"> Cancel </md-button>' +
            ' <md-button ng-click="addingUser()" class="md-primary"> Save </md-button> ' +
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
        $localStorage.adminLogin = false;
    }


}]);


function AdminDialogController($scope,$mdDialog,$timeout,$rootScope,$localStorage){

    $scope.newUser = {};
    $scope.registeredData = $localStorage.authData ;

    $scope.addingUser = function () {
        $scope.registeredData.push({
            username: $scope.newUser.username,
            password: $scope.newUser.password,
            userType: $scope.newUser.userType.userType,
            done: false
        });
        $scope.newUser = ''; //clear the input after adding
        $localStorage.authData = $scope.registeredData;
        $mdDialog.cancel();
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
    $scope.loadUserTypes = function () {
        // Use timeout to simulate a 650ms request.
        return $timeout(function() {
            $scope.userTypes =  $scope.userTypes  || [
                    { id: 1, userType: 'Admin' },
                    { id: 2, userType: 'Manager' },
                    { id: 3, userType: 'StoreKeeper' }
                ];
        }, 650);
    };

}