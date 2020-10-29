'use strict';

angular.module('agenda', [
  'ngRoute',
  'agenda.listContact',
  'agenda.newContact',
  'agenda.editContact'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/listContact'});
}]);
