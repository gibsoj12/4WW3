function shopsNearMe() {
    window.location = "./results-page/results-page.html";
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
    var my_map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);
    L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
    {
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
      maxZoom: 17,
      minZoom: 9
    }).addTo(my_map);
}