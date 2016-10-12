'use strict';

var angular = require('angular');
var HomeComponent = require('./home.component');

angular.module('App.Home', [])
  .config(config)
  .component('home', HomeComponent)

config.$inject = [
  '$stateProvider'
];

function config($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    });
}
