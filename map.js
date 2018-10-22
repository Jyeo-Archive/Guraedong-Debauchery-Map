var infowindow = new daum.maps.InfoWindow({zIndex:1});
var container = document.getElementById('map');
var options = {
    center: new daum.maps.LatLng(37.6442673, 126.6260626),
    level: 2
};
var map = new daum.maps.Map(container, options);
map.setDraggable(false);
var positions = [];
d3.json('./places.json', function(error, places) {
    if (error)
        throw error;
    for (var k in places){
        displayMarker({ 
            'x' : places[k]['location']['lng'], 
            'y' : places[k]['location']['lat'],
            'place_name' : places[k]['name']
        });
    }
}); 

d3.json('./config.json', function(error, data) {
    var ps = new daum.maps.services.Places(); 
    let keywords = data['keywords'];
    for (var i in keywords){
        ps.keywordSearch('구래동 ' + keywords[i], placesSearchCB); 
    }
});

function placesSearchCB (data, status, pagination) {
    if (status === daum.maps.services.Status.OK) {
        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);
        }
    } 
}

function displayMarker(place) {
    var marker = new daum.maps.Marker({
        map: map,
        position: new daum.maps.LatLng(place.y, place.x) 
    });
    marker.setOpacity(0.7);
    daum.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}
