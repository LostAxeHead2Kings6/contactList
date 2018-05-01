angular.module('app')

  .controller('newEntry', function($http, $scope, $location) {
    $scope.firstname="";
    $scope.lastname="";
    $scope.email="";

    $scope.addNewContact = function(first, last, email) {
      $scope.firstname="";
      $scope.lastname="";
      $scope.email="";

      $http.post('/entries', {data: {first: first, last: last, email: email}})
        .then(() => $location.path('/list'));
    };

    $scope.cancelNewListing = function() {
      $location.path('/list')
    }

  })
  .config(function($routeProvider){
    $routeProvider
      .when("/newentry", {
        templateUrl: 'angular-client/templates/newContact.html',
        controller: 'newEntry'
  });
});
