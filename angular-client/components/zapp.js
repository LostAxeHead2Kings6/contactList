angular.module('zapp', [])

.service('onLoad', function($http) {
  this.calldb = function(callback) {
    $http.get('/entries').then((results) => callback(results));
  };
})

.controller('AppCtrl', function(onLoad) {
  this.featuredEntry = {};

  this.populateList = (data) => {
    this.list = data.data;
  };

  this.updateThisEntry = (entry) => {
    this.featuredEntry = JSON.parse(JSON.stringify(entry));
  }

  onLoad.calldb(this.populateList);
})

.component('zapp', {
    templateUrl: 'angular-client/templates/zapp.html',
    controller: 'AppCtrl'
});
