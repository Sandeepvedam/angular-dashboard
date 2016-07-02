
var guestController = angular.module('guestModule',[]);

guestController.controller('GuestController',['$rootScope','$localStorage','$mdDialog','$mdMedia',function($rootScope,$localStorage,$mdDialog,$mdMedia){

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
                    productImage : "http://image.made-in-china.com/2f1j00SOytUAsRSbov/Professional-Plastic-Products-of-Gusseted-Bags-Reels-for-Hospital-Use.jpg"
                },{
                    productId : 2,
                    productName : "product2",
                    productPrice : 1000,
                    productImage : "http://www.electricminimassager.com/photo/pl4479678-hospital_product_nursing_care_restraint_straps_medical_wrist_restraints.jpg"
                },{
                    productId : 3,
                    productName : "product3",
                    productPrice : 900,
                    productImage : "http://web.tradekorea.com/upload_file2/product/932/P00328932/cbe9caa6_9591e742_2864_442a_b1fa_8f9cc2594a44.jpg"
                }
            ];
        }
    };


    $rootScope.showProductDescription = function (product) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $rootScope.customFullscreen;
        $mdDialog.show({
            controller: function () {
                this.parent = $rootScope;
                $rootScope.productDescImage = product.productImage;
                $rootScope.productDescPrice = product.productPrice;
                $rootScope.productDescName = product.productName;

                $rootScope.closeDialog = function () {
                    $mdDialog.cancel();
                };
            },
            controllerAs: 'productDescCtrl',
            templateUrl: 'js/components/guest/partials/productDescription.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
            .then(function(answer) {
                $rootScope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $rootScope.status = 'You cancelled the dialog.';
            });
    };


    $rootScope.products = $rootScope.loadProducts();

}]);


