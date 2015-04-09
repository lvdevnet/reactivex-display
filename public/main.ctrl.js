angular.module('rxDisplay')
    .controller('MainCtrl', function($scope) {

        $scope.map = {
            minZoom: 2,
            zoomControl: false
        };

        $scope.markers = [{
            lat: 51.504976275,
            lng: -0.087847965,
            label: {
                message: 'arkadijs',
                options: {
                    noHide: true
                }
            }
        }];
        
        $scope.photos = [{
            url: 'https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/10852816_867450063277168_105277875_n.jpg',
            pushedBy: 'arkadijs'
        }, {
            url: 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/10860080_604009073076321_740245334_n.jpg',
            pushedBy: 'arkadijs'
        }];

    });
