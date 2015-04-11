/* global angular, CBuffer, io */
angular.module('rxDisplay')
  .controller('MainCtrl', function($scope) {

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

    var shift20 = function(arr, item) {
      if (arr.length > 20) {
        arr.pop();
      }
      arr.unshift(item);
    };

    var addPic = function(pic) {
      if (filter != null && filter !== pic.participant) {
        return;
      }
      console.log(pic);

      $scope.$apply(function() {
        shift20($scope.pics, pic);
        shift20($scope.markers, {
          lat: pic.location.latitude,
          lng: pic.location.longitude,
          label: {
            message: pic.participant,
            options: {
              noHide: true
            }
          }
        });
      });
    };

    io().on('in', function(data) {
      addPic(data);
    });

  });
