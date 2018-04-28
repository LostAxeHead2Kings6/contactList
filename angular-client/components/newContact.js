angular.module('app')

  .controller('FormCtrl', function($http) {
    this.firstname="";
    this.lastname="";
    this.email="";

    this.addNewContact = function(first, last, email) {
      this.firstname="";
      this.lastname="";
      this.email="";

    $http.post('/entries', {data: {first: first, last: last, email: email}})
      .then((data) => this.service(data));
    };
  })

  .component('addContactForm', {
    bindings: {
      service: '<'
    },
    templateUrl: 'angular-client/templates/newContact.html',
    controller: 'FormCtrl'
});
