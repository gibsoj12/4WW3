// import "jquery";

function displayMyLocation() {

  var shopName = sessionStorage.getItem("shopName");
  if (shopName != null) {
    console.log(shopName);
    // Check database for the shop and then display that place etc.
    testTables();
  }
  else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
}

function testTables() {
  console.log('I hate this');
  /* let btn = document.getElementById("hello");
  let res = "";

    btn.addEventListener("click", function(){
      fetch("results-page.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
      .then((response) => response.text())
      .then((result) => (res = result));
    });

  console.log(res); */
  $.ajax({
    type: "GET",
    url: 'results-page.php',
    dataType: 'json',
    timeout: 20000,
    data: {functionname: 'search_with_name', arguments: []},
  
    success: function (obj, textstatus) {
        console.log ('in success');
        if( !('error' in obj) ) {
            console.log('success');
            yourVariable = obj.result;
            console.log(yourVariable);
        }
        else {
            console.log(obj.error);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){}    
  }).fail(function(jqXHR, textStatus){});
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

  L.marker([43.262114, -79.905834]).addTo(my_map)
    .bindPopup('Paisleys Coffeehouse and Eatery.<br><a href="../about-page/about-page.html">Paisleys review</a>')
    .openPopup();

  L.marker([43.262494, -79.905428]).addTo(my_map)
    .bindPopup('Mikel Cofee.<br><a href="https://www.mikelcoffee.com/el/home"> Mikel Coffee</a>')
    .openPopup();

  L.marker([43.262405, -79.905200]).addTo(my_map)
    .bindPopup('Second Cup.<br><a href="https://secondcup.com/">Second Cup</a>')
    .openPopup();
}