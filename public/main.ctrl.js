/* global angular, CBuffer, io */
angular.module('rxDisplay')
  .controller('MainCtrl', function($scope, $http) {

    $scope.map = {
      minZoom: 2,
      zoomControl: false
    };
    $scope.pics = [];
    $scope.markers = [];

    var pics = new CBuffer(100);
    var addPic = function(pic) {
      pics.unshift(pic);
      $scope.pics = pics.toArray();
      $scope.markers = $scope.pics.map(function(pic) {
        return {
          lat: pic.location.latitude,
          lng: pic.location.longitude,
          label: {
            message: pic.participant,
            options: {
              noHide: true
            }
          }
        };
      });
    };

    $http.get('/in')
      .success(function(data) {
        data.forEach(addPic);
      });

    io().on('in', function(data) {
      addPic(data);
    });

  });
