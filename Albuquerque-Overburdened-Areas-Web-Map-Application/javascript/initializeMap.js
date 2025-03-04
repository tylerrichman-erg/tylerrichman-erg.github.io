// Initialize the map and set view to a given location
//var map = L.map('map').setView([35.05, -106.65], 10); // Albuquerque, NM
var map = L.map('map', {
    center: [35.05, -106.65],
    zoom: 10,
    defaultExtentControl: true,
	zoomControl: false
  });

var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

// Add a Tile Layer (OpenStreetMap)
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});
CartoDB_Positron.addTo(map);