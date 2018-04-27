angular.module('app', [])

.service('onLoad', function($http) {
  this.calldb = function(callback) {
    $http.get('/entries').then((results) => callback(results));
  };
})

.controller('AppCtrl', function(onLoad) {
  this.loadList = (data) => {
    this.list = data.data;
  }

  onLoad.calldb(this.loadList);
})

.component('app', {
    templateUrl: 'angular-client/templates/app.html',
    controller: 'AppCtrl'
});
