'use strict';

module.exports = {
  templateUrl: ('./app/home/home.template.html'),
  bindings: {},
  controller: HomeController
}

HomeController.$inject = [];

function HomeController() {
  var vm = angular.extend(this, {
    msg: 'this is the message'
  });

  return init();

  /**
   * This is the init method
   */
  function init() {
    // init code here
  }
}
