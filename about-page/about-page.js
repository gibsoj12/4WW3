function objectLocation() {
    
    var my_map = L.map('object_map').setView([43.262114, -79.905834], 16);
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

}