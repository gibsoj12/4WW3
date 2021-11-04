function shopsNearMe() {
    navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
    window.location = "./results-page/results-page.html";

    var my_map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 14);
}