angular.module('app')

  .controller('updateCtrl', function($scope, $http, $routeParams, $location) {
    $scope.populateForm = function(id) {
      $http.get('/id', {params: {id: id}})
        .then(function(data) {
          console.log(data);
          $scope.firstname = data.data[0].firstname;
          $scope.lastname = data.data[0].lastname;
          $scope.email = data.data[0].email;
        });
    }

    $scope.updateContact = function(first, last, email) {
      $http.put('/entries', {id: $routeParams.entryId, firstname: first, lastname: last, email: email})
        .then(() => $location.path('/list'));
    };

    $scope.populateForm($routeParams.entryId);
  })
  .config(function($routeProvider){
    $routeProvider
      .when("/update/:entryId", {
        templateUrl: 'angular-client/templates/updateContact.html',
        controller: 'updateCtrl',
  });
});
