//component for material design select box
angular.module('retrieve').directive('locationPicker', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/locationPicker/locationPicker.html',
		controllerAs: 'select',
		controller: ['$scope', function($scope){
			/*  PLANS:
			 *	options:
			 *		1. ...
			*/
			

		}],
		link: function(scope, elem, attrs) {

			$(function(){

				var maps = function () {
			    var
				    autocomplete, 
				    map,
				    mapOptions = {
				        center: new google.maps.LatLng(42.9885194, -71.4695092),
				        zoom: 10,
				        mapTypeControl: false
				    },
				    initializeMap = function (opt) {
				        map = new google.maps.Map(opt.mapDiv, mapOptions);
				        map.controls[google.maps.ControlPosition.TOP_LEFT].push(opt.search);
				        autocomplete = new google.maps.places.Autocomplete(opt.search, {});
				        google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
				    },
				    onPlaceChanged = function(){
				        //to see all the functions of the place object 
				        var place = autocomplete.getPlace();
				        if (place.geometry) {
				            //to see all the properties of the place object
				            map.panTo(place.geometry.location);
				            map.setZoom(16);
				            var marker = new google.maps.Marker({
				                map: map,
				                position: place.geometry.location
				            });
				            $('#currLocation').text(place.geometry.location);
				            $('.map-label button').show();
				        } 
				        else {
				            alert("you entered an invalid location");
				            $('.map-label button').hide();
				        }
				    }
				        
				    return {
				        initializeMap: initializeMap
				    };
				}();
			$(function () {
				 $('.map-label button').hide();
			    var opt = {
			        mapDiv: $('#divMap')[0],
			        search: $("#search")[0]
			    };
			    var map = maps.initializeMap(opt);
			});

			});
		}
	};
});