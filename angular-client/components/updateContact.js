angular.module('app')

  .controller('FormCtrl2', function($http) {
    this.firstname = 'asdfadf';
    this.lastname = 'asdfdsaf';
    this.email = 'asdfdsf';

    this.updateContact = function(id, first, last, email) {
      console.log(id, first, last, email);
      $http.put('/entries', {id: id, firstname: first, lastname: last, email: email})
        .then((data) => this.service(data));
    };
  })

  .component('updateForm', {
    bindings: {
      featured: '<',
      service: '<'
    },
    templateUrl: 'angular-client/templates/updateContact.html',
    controller: 'FormCtrl2'
});
