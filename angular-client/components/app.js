angular.module('app', ["ngRoute"])

  .controller('navCtrl', function($scope, $location) {
    $scope.toList = function() {
      $location.path('/list');
    };

    $scope.addNew = function() {
      $location.path('/newentry');
    };

});
