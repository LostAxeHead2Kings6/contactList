angular.module('app', ["ngRoute"])

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
