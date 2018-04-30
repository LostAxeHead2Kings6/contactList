angular.module('app', ["ngRoute", "ui.bootstrap"])

  .controller('navCtrl', function($scope, $location) {
    $scope.toList = function() {
      console.log('called');
      $location.path('/list');
    };

    $scope.addNew = function() {
      console.log('called');
      $location.path('/newentry');
    };

});
