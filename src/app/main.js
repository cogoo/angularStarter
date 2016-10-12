'use strict';

// Angular dependencies
var angular = require('angular');
require('angular-animate');
require('angular-ui-router');

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
