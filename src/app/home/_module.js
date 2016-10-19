'use strict';

var angular = require('angular');
var HomeComponent = require('./home.component');
var FirebaseFactory = require('../factory/firebase.factory');

angular.module('App.Home', [])
  .config(config)
  .component('home', HomeComponent)
  .factory('firebaseFactory', FirebaseFactory)

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
