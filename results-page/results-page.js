/*var x = document.getElementById("map");
function displayMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
} */

function displayMyLocation() {
    
    /* x.innerHTML = "Latitude: " + "43.262114" +
    "<br>Longitude: " + "-79.905834"; */

    var my_map = L.map('map').setView([43.262114, -79.905834], 14);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2lic29qMTIiLCJhIjoiY2t2bGVyZ3E1NmRmMjJ1cTFkMDg3NXM4MyJ9.qwcU5DNE5EX6jzAZk5I_qA'
}).addTo(my_map);
}