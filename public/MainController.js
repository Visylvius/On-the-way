angular.module('bae-synchronous.MainController', [])


.controller('MainController', function ($scope, Map, Marker) {
    $scope.submitted = false;
    $scope.listings = {};
    $scope.categoryListings = {};
    $scope.markers = [];
    $scope.hasRating = false;
    $scope.places = Marker.places;
    $scope.validListings = null;
    $scope.open_map = 'no';
    $scope.splash = 'yes';
    $scope.failure = 'no';

    $scope.hasFailed = function() {
      if (!$scope.validListings) {
        $scope.failure = 'yes' ;
      }
    };

    $scope.splash_submit = function() { $scope.splash = 'no'; };
    $scope.expand_map = function() { $scope.open_map = 'yes'; };

    $scope.postData = function() {
      //pass in the model data into the Map factory
      $scope.submitted = true;
      console.log('listings ' + $scope.validListings);
      Map.postData($scope.homeAddress, $scope.workAddress, $scope.selectedPlace, $scope.time)
      .then(function(data, err) {
        if (err) {
          $scope.hasFailed();
          console.log('error message', err);
        } else {
          if (!$scope.validListings) {
            $scope.failure = 'yes';
          }
          $scope.splash_submit();
          $scope.listings = data;
          $scope.categoryListings = data.categoryListings;
            if($scope.categoryListings.length > 0) {
              $scope.validListings = true;
              if ($scope.validListings) {
                $scope.failure = 'no';
              }
              var marker3 = Marker.makeMarker($scope.listings.address1.coordinates, map);
              var marker4 = Marker.makeMarker($scope.listings.address2.coordinates, map);

              for (var i = 0; i < data.categoryListings.length; i++) {
                $scope.markers[i] = Marker.makeMarker(data.categoryListings[i].coordinates, map);
                var content = '<div>' + name + $scope.categoryListings[i].name + '</div>' + '<div>' + name + $scope.categoryListings[i].address + '</div>';
                var firstCoords = $scope.categoryListings[0].coordinates;
                var bounds = {
                  north: firstCoords.lat,
                  south: firstCoords.lat,
                  east: firstCoords.lng,
                  west: firstCoords.lng
                };
                var addressCords = [$scope.listings.address1.coordinates, $scope.listings.address2.coordinates];
                var categoryCoords = $scope.categoryListings.map(function(listing) {
                  return listing.coordinates;
                });

                Marker.expandBounds(bounds, addressCords.concat(categoryCoords));
                map.fitBounds(bounds);
                $scope.markers[i].infowindow = new google.maps.InfoWindow({
                    content: content
                });

                $scope.markers[i].addListener('click', function() {
                  this.infowindow.open(map, this);
                });
            }
            google.maps.event.addListener(map, 'click', function(event) {
              this.setOptions({scrollwheel: true});
            });
            google.maps.event.addListener(map, 'mouseout', function(event){
              this.setOptions({scrollwheel: false});
            });
            console.log('were here');
            $scope.open_map = 'yes';
            google.maps.event.trigger(map, "resize");
          }
          else {
            $scope.validListings = false;
          }
      }
    });
  };
});
