/* global angular, io */
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

    var pic2marker = function(pic) {
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
    };

    var addPic = function(pic) {
      if (filter != null && filter !== pic.participant) {
        return;
      }
      console.log(pic);

      $scope.$apply(function() {
        shift20($scope.pics, pic);
        if (pic.location != null &&
          pic.location.latitude != null &&
          pic.location.longitude != null) {
          shift20($scope.markers, pic2marker(pic));
        }
      });
    };

    io().on('in', function(data) {
      addPic(data);
    });

  });
