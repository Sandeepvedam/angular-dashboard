
var storeKeeperController = angular.module('storeKeeperModule',[]);

storeKeeperController.controller('StoreKeeperController',['$scope','$rootScope','$localStorage','$mdDialog','$mdMedia',function($scope,$rootScope,$localStorage,$mdDialog,$mdMedia){

    $scope.products = $localStorage.productData ;

    checkAuthentication();

    function checkAuthentication(){
        if($localStorage.storeKeeperLogin!==true){
            location.href = '#/login';
        }
    }

    $scope.addProducts = function(ev) {

        $mdDialog.show({
            controller: StoreKeeperDialogController,
            template: '<md-dialog aria-label="Add User" style="width:50%">' +
            ' <md-content class="md-padding"> ' +
            '<form name="productForm" > ' +
            '<div layout="column"> ' +
            '<md-input-container flex>' +
            ' <label>Product Name</label>' +
            ' <input type="text" ng-model="product.productName">' +
            ' </md-input-container>' +
            '<md-input-container flex> ' +
            '<label>Image Url</label> ' +
            '<input type="text" ng-model="product.productImage"> ' +
            '</md-input-container>'+
            '<md-input-container flex> ' +
            '<label>Price</label> ' +
            '<input type="number" ng-model="product.productPrice"> ' +
            '</md-input-container>' +
            '</div>' +
            '</form>'+
            '<div class="md-actions" layout="row"> ' +
            '<span flex></span> ' +
            '<md-button ng-click="cancel()"> Cancel </md-button>' +
            ' <md-button ng-click="addProduct()" class="md-primary"> Save </md-button> ' +
            '</div>' +
            '</md-content>'+
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
        $localStorage.storeKeeperLogin = false;
    }


}]);


function StoreKeeperDialogController($scope,$mdDialog,$timeout,$rootScope,$localStorage){

    $scope.product = {};
    $scope.products = $localStorage.productData ;

    $scope.addProduct = function () {
        $scope.products.push({
            productName: $scope.product.productName,
            productImage: $scope.product.productImage,
            productPrice: $scope.product.productPrice,
            isApproved: false,
            done: false
        });
        $scope.product = ''; //clear the input after adding
        $localStorage.productData = $scope.products;
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