function displayMyLocation() {
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
    
    var my_map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2lic29qMTIiLCJhIjoiY2t2bDM3Z2Z6MzBnaTJvbnl6YjYyYXB5NiJ9.oUYYVzj-s5a25lh415HLQQ'
}).addTo(my_map);
}