function success(position) {
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcontainer';
  mapcanvas.style.height = '400px';
  mapcanvas.style.width = '100%';

  document.getElementById('map').appendChild(mapcanvas);

  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  var options = {
    zoom: 15,
    center: coords,
   scrollwheel: false,
   navigationControl: false,
   mapTypeControl: false,
   scaleControl: false,
   draggable: false,
   disableDefaultUI: true,
   mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

  var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title:"You are here!"
  });
}

function geo() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(success);
   } else {
     error('Geo Location is not supported');
   }
}

var animationHelper = AniJS.getHelper();
animationHelper.geo = function(e, animationContext){
   setTimeout(function() {
         geo();
         animationContext.run()
      }, 0)
}
