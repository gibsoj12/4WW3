function shopsNearMe() {
    window.location = "./results-page/results-page.html";
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
    var my_map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);
}