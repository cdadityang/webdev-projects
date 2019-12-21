function initMap(){ // Below we have callback - this will run when it loads
  // Map options
  var options = {
    zoom: 8,
    center: { lat: 17.3850, lng: 78.4867}
  };

  // new map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map:
  google.maps.event.addListener(map, 'click', function(e){
    addMarker({ coords: e.latLng });
  });

  // Multiple markers:
  function addMarker(props){
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.iconImage,
      
    });

    // Check for custom icon
    if(props.iconImage){
      marker.setIcon(props.iconImage);
    }

    // check for content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }

  var markers = [
    {
      coords: { lat: 17.3850, lng: 78.4867 },
      iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content: '<h1>Hyderabad</h1>'
    },
    {
    coords: { lat: 12.9165, lng: 79.1325 },
    content: 'Vellore'
    }
  ];

  // Loop through markers
  for(var i = 0; i < markers.length; i++){
    addMarker(markers[i]);
  }
}

/*
  // add marker
  var marker = new google.maps.Marker({
    position: { lat: 17.3850, lng: 78.4867 },
    map: map,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });

  // Info
  var infoWindow = new google.maps.InfoWindow({
    content: '<h1>Hyd</h1>'
  });
  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  });
  */