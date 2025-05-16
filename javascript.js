// Initialize the map and set view over Africa
var map = L.map('map').setView([0, 20], 3);

// Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

  fetch('countries_count.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: 'blue',
                    weight: 2,
                    fillOpacity: 0.3
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading GeoJSON:', error));