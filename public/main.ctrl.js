/* global angular, CBuffer, io */
angular.module('rxDisplay')
  .controller('MainCtrl', function($scope, $http) {

    $scope.map = {
      minZoom: 2,
      zoomControl: false,
      worldCopyJump: true
    };
    $scope.pics = [];
    $scope.markers = [];

    var filter;
    var filterMatch = location.search.match(/^\?participant=(.*)/);
    if (filterMatch != null) {
      filter = filterMatch[1];
    }

    var pics = new CBuffer(20);
    var addPic = function(pic) {
      if (filter != null && filter !== pic.participant) {
        return;
      }
      console.log(pic);
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
