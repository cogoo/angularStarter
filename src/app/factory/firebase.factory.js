'use strict';

var firebase = require('firebase');

FirebaseService.$inject = [
  '$firebaseArray'
];

function FirebaseService($firebaseArray) {
  var ref = firebase.database().ref();
  var service = {
    getData: getData
  };

  return service;

  function getData() {
    return $firebaseArray(ref.child('mockData'));
  }


}

module.exports = FirebaseService;
