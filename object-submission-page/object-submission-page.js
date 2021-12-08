function getValues() {
  var data = {};

  const name = document.getElementById('name').value;
  data['name'] = name;

  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;
  data['longitude'] = longitude;
  data['latitude'] = latitude;

  const url = document.getElementById('url').value;
  data['link'] = url;

  const espresso = document.getElementById('espresso').checked.toString();
  const decaf = document.getElementById('decaf').checked.toString();
  const food = document.getElementById('food').checked.toString();
  const wheelchair = document.getElementById('wheelchair').checked.toString();
  const washroom = document.getElementById('washroom').checked.toString();
  var amenities = {"espresso" : espresso, "decaf" : decaf, "food" : food, 
                  "accessible entrance" : wheelchair, "washroom" : washroom};
  data['amenities'] = JSON.stringify(amenities);

  $.ajax({
    type: "POST",
    url: 'object-submission-page.php',
    timeout: 20000,
    data: {arguments: JSON.stringify(data)},
    dataType: 'json'})
  .done(function(ret) {
    console.log('Success ', ret);
    window.location = "../index.html";
  }) 
  .fail(function(textStatus) {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Please log in to add a shop"
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
    console.log('Fail: ', textStatus['responseText']); 
  });
}

function displayMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

function displayPosition(position) {

  var x = document.getElementById("map_text");
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;

    var my_map = L.map('my_map').setView([position.coords.latitude, position.coords.longitude], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZ2lic29qMTIiLCJhIjoiY2t2bDM3Z2Z6MzBnaTJvbnl6YjYyYXB5NiJ9.oUYYVzj-s5a25lh415HLQQ'
    }).addTo(my_map);
  
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(my_map)
      .bindPopup("<br>Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude)
      .openPopup();
}