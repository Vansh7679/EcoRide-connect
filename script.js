// Initialize the map and set its view to a specified location
const map = L.map('map').setView([51.505, -0.09], 13); // Example: London coordinates

// Add a tile layer to the map using OpenStreetMap (free and no API required)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to the map
const marker = L.marker([51.505, -0.09]).addTo(map);
marker.bindPopup('Example Marker: London').openPopup();

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7749, lng: -122.4194 }, // Example: San Francisco
    zoom: 12,
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  document.getElementById("route-btn").addEventListener("click", () => {
    const start = document.getElementById("start").value;
    const destination = document.getElementById("destination").value;

    if (start && destination) {
      calculateAndDisplayRoute(directionsService, directionsRenderer, start, destination);
    } else {
      alert("Please enter both start and destination locations.");
    }
  });
}

function calculateAndDisplayRoute(service, renderer, start, destination) {
  service.route(
    {
      origin: start,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        renderer.setDirections(result);
      } else {
        alert("Failed to display route: " + status);
      }
    }
  );
}

  