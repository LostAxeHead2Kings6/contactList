angular.module('app')
  .service('serverRequests', function($http) {
    this.calldb = function(callback) {
      $http.get('/entries').then((results) => callback(results));
    }

    this.deleteContact = function(entry) {
      return $http.delete('/entries', {params: entry});
    }
  })
  .controller('ListCtrl', function(serverRequests, $scope, $location) {

    $scope.changeFeatured = function(object) {
      console.log(object);
      $location.path('/update/' + object._id);
    };

    this.populateList = (data) => {
      $scope.list = data.data;
    };

    $scope.deleteListing = function(entry) {
      serverRequests.deleteContact(entry)
        .then((data) => $scope.list = data.data);
    }
    $scope.list = [];
    serverRequests.calldb(this.populateList);

    $scope.filteredList = [],
    $scope.currentPage = 1,
    $scope.numPerPage = 4,
    $scope.maxSize = 5;

    $scope.$watch('currentPage + numPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage),
      end = begin + $scope.numPerPage;

      $scope.filteredList = $scope.list.slice(begin, end);
    });
  })
  .config(function($routeProvider){
    $routeProvider
      .when("/list", {
        templateUrl: 'angular-client/templates/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        templateUrl: 'angular-client/templates/list.html',
        controller: 'ListCtrl'
      })
  })
  .component('list', {
    bindings: {
      featuredItem: '<',
    }
});
