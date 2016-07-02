
var guestController = angular.module('guestModule',[]);

guestController.controller('GuestController',['$rootScope','$localStorage','$mdDialog','$mdMedia',function($rootScope,$localStorage,$mdDialog,$mdMedia){

    $rootScope.guestProducts = $localStorage.productData;
    $rootScope.guestProductCount = 0;

    for(var i in $rootScope.guestProducts){
        if($rootScope.guestProducts[i].isApproved===true){
            $rootScope.guestProductCount++;
        }
    }

}]);


