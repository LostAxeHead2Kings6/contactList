angular.module('app')
  .component('list', {
    bindings: {
      names: '<',
      service: '<'
    },
  templateUrl: 'angular-client/templates/list.html'
});
