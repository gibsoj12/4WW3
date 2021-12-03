var meta;
var result;
var myLong;
var myLat;

function displayMyLocation() {

  var shopName = sessionStorage.getItem("shopName");
  if (shopName != null) {
    // Check database for the shop and then display that place etc.
    displayResults(shopName);
  }
  else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getMyPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
}

function displayResults(shopName) {
  $.ajax({
    type: "POST",
    url: 'results-page.php',
    timeout: 20000,
    data: {arguments: [shopName, myLong, myLat]},
  
    success: function (obj) {
      var data = JSON.parse(obj);
        if (!obj.error) {
          result = JSON.parse(data["response_data"]);
          meta = JSON.parse(data["response_metadata"]);
          createTable();

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayPosition);
          } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
          }
          console.log("Success: " + result);
        }
        else {
          console.log(obj.error);
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log('Error: ' + errorThrown);
    }    
  }).fail(function(jqXHR, textStatus){
    console.log('Fail: ' + textStatus); });
}

function createTable() {
  const tbl = document.querySelector("table");
  let headers = Object.keys(JSON.parse(result["0"]));
  generateTableHead(tbl, headers);
  generateTable(tbl);
}

function generateTableHead(tbl, headers) {
  let thead = tbl.createTHead();
  let row = thead.insertRow();
  for(let key of headers) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(tbl) {
  for (let i = 0; i < result.length; i++) {
    element = JSON.parse(result[i]);
    metadata = JSON.parse(meta[i]);
    let row = tbl.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      var text;
      if (key === "Name") {
        text = document.createElement("a");
        text.setAttribute("href", "../about-page/about-page.html?id=" + metadata["id"]);

        let linkText = document.createTextNode(element[key]);
        text.appendChild(linkText);
      } 
      else {  
        text = document.createTextNode(element[key]);
      }
      cell.appendChild(text);
    }
  }
}

function getMyPosition(position) {
  myLong = position.coords.longitude;
  myLat = position.coords.latitude;
  displayResults("");
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

  for (let i = 0; i < result.length; i++) {
    element = JSON.parse(result[i]);
    metadata = JSON.parse(meta[i]);
    L.marker([metadata["latitude"], metadata["longitude"]]).addTo(my_map)
    .bindPopup(element["Name"] + '<br><a href="../about-page/about-page.html?id="' + metadata["id"] + '>' + element["Name"] + '</a>')
    .openPopup();
  }
}