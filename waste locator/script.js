let map;

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 28.6139, lng: 77.2090 } // Default: Delhi
  });

  const response = await fetch("./data/ewaste-locations.json");
  const locations = await response.json();

  locations.forEach(loc => {
    new google.maps.Marker({
      position: loc,
      map: map
    });
  });
}

document.getElementById("locateBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      let userLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      map.setCenter(userLocation);

      new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "You are here",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
    });
  } else {
    alert("Geolocation not supported.");
  }
});
