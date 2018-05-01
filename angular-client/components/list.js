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
    $scope.pageSize = 10;

    $scope.changeFeatured = function(object) {
      $location.path('/update/' + object._id);
    };

    this.populateList = (data) => {
      $scope.list = data.data;
      $scope.filteredList = data.data.slice(0, $scope.pageSize);
      $scope.latestEntryNumber = $scope.pageSize;
      $scope.numberOfPages = Math.ceil($scope.list.length/$scope.pageSize);
      $scope.presentPage = ($scope.latestEntryNumber/$scope.pageSize);
    };

    $scope.deleteListing = function(entry) {
      serverRequests.deleteContact(entry)
        .then(function(data){
          $scope.list = data.data;
          $scope.filteredList = data.data.slice(0, $scope.pageSize);
        });
    }

    $scope.nextPage = function() {
      if ($scope.latestEntryNumber < $scope.list.length) {
        $scope.filteredList = $scope.list.slice($scope.latestEntryNumber, $scope.latestEntryNumber + $scope.pageSize);
        $scope.latestEntryNumber += $scope.pageSize ;
        $scope.presentPage = ($scope.latestEntryNumber/$scope.pageSize);
      }
    }

    $scope.previousPage = function() {
      if ($scope.latestEntryNumber > $scope.pageSize) {
        $scope.latestEntryNumber -= $scope.pageSize ;
        $scope.filteredList = $scope.list.slice($scope.latestEntryNumber - $scope.pageSize, $scope.latestEntryNumber);
        $scope.presentPage = ($scope.latestEntryNumber/$scope.pageSize);
      }
    }

    serverRequests.calldb(this.populateList);
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
  });
