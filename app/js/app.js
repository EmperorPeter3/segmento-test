'use strict';

/* App Module */

var segmentoApp = angular.module('segmentoApp', [
  'ngRoute',
  'appControllers',
  'appDirectives',
  'angular-table'
]);

angular.module("myApp", ["ngTable"]);

segmentoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/table', {
        templateUrl: 'partials/table.html',
        controller: 'tableCRUDCtrl'
      }).
      otherwise({
        redirectTo: '/table'
      });
  }]);
