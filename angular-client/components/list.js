angular.module('app')
  .service('onLoad', function($http) {
    this.calldb = function(callback) {
      $http.get('/entries').then((results) => callback(results));
    };
  })
  .controller('ListCtrl', function(onLoad, $scope, $location) {
    $scope.changeFeatured = function(object) {
      $location.path('/update/' + object._id);
    };

    $scope.populateList = (data) => {
      console.log(data);
      $scope.list = data.data;
    };

    onLoad.calldb($scope.populateList);
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
