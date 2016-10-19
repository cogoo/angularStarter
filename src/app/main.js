'use strict';

// Angular dependencies
var angular = require('angular');
require('angular-animate');
require('angular-ui-router');

// AngularFire
var firebase = require('firebase');
require('angularfire');

var config = {
  apiKey: "AIzaSyD9xxPdUQaAyzdlzoafnNam4zlpnVppGc0",
  authDomain: "angularstarter-6c5e2.firebaseapp.com",
  databaseURL: "https://angularstarter-6c5e2.firebaseio.com",
  storageBucket: "angularstarter-6c5e2.appspot.com",
  messagingSenderId: "5289947821"
};
firebase.initializeApp(config);


// Restangular expects underscore or lodash
window._ = require('lodash');


// Load config
var generalConfig = require('./config/config');
var routeConfig = require('./config/route.config');
// var apiConfig = require('./config/api.config');

// Load modules
require('./home/_module');
require('./templates/_module');

// Run Block
Run.$inject = [];

function Run() {}


// App
angular
  .module('App', [
    // Angular Dependencies
    'ui.router',
    'ngAnimate',
    // AngularFire
    'firebase',
    // App Modules
    'App.Home',
    'templates',

  ])
  // configs
  .config(generalConfig)
  .config(routeConfig)
  // .constant('apiConfig', apiConfig)

// run
.run(Run);
