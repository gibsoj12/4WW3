function displayResults() {

  var id = getID();

  $.ajax({
    type: "POST",
    url: 'about-page.php',
    timeout: 20000,
    data: {arguments: [id]},
  
    success: function (obj) {
      var data = JSON.parse(obj);
        if (!obj.error) {
          shop_data = JSON.parse(data["response_shop_data"]);
          review_data = JSON.parse(data["response_review_data"]);
          displayAbout(JSON.parse(shop_data));
          displayReviews(review_data);
          objectLocation(JSON.parse(shop_data));

          console.log("Success " + shop_data);
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

function displayAbout(shop_data) {
  document.getElementById("shop-info-header").innerText = "About \n\n";
  
  for (val in shop_data) {
    if (val === "name") {
      document.getElementById("shop-info").innerText += "Name: " + shop_data[val] + "\n\n";
    }
    else if (val === "link") {
      document.getElementById("shop-info").innerText += "Link: " + shop_data[val] + "\n\n";
    }
    else if (val === "amenities") {
      text = ""
      amenities = JSON.parse(shop_data[val])
      for (amenity in amenities) {
        if (amenities[amenity] === "true") {
          text += amenity + ", ";
        }
      }
      document.getElementById("shop-info").innerText += "Amenities: " + text + "\n\n";
    }
  }
}

function submitReview() {
  var data = {};

  data['shop_id'] = getID();

  const stars = document.getElementById('stars').value;
  data['stars'] = stars;

  const review = document.getElementById('about').value;
  data['review'] = review;

  $.ajax({
    type: "POST",
    url: 'about-page-review.php',
    timeout: 20000,
    data: {arguments: JSON.stringify(data)},
    dataType: 'json'})
  .done(function(ret) {
    console.log('Success ', ret);
  }) 
  .fail(function(textStatus) {
    let alert_div = document.getElementById("alert-div");
    alert_div.style.display = "block";
    alert_div.innerHTML = "Please log in to add a shop"
    setTimeout(() => { alert_div.style.display = "none" }, 3000);
    console.log('Fail: ', textStatus['responseText']); 
  });
}

function displayReviews(review_data) {
  document.getElementById("shop-reviews-header").innerText = "Reviews \n\n";

  for (review in review_data) {
    rev = JSON.parse(review_data[review]);
    for (val in rev) {
      if (val === "review") {
        document.getElementById("shop-reviews").innerText += rev[val] + "\n\n";
      }
    }
  }
}

function getID() {
  let params = new URLSearchParams(location.search);
  return params.get('id');
}

function objectLocation(shop_data) {    
    var my_map = L.map('object_map').setView([shop_data["latitude"], shop_data["longitude"]], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZ2lic29qMTIiLCJhIjoiY2t2bDM3Z2Z6MzBnaTJvbnl6YjYyYXB5NiJ9.oUYYVzj-s5a25lh415HLQQ'
    }).addTo(my_map);
  
    L.marker([shop_data["latitude"], shop_data["longitude"]]).addTo(my_map)
      .bindPopup('<a href=" ' + shop_data["link"] + '">' + shop_data["name"] + '</a>')
      .openPopup();

}