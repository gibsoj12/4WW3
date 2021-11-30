function shopsNearMe() {
    window.location = "./results-page/results-page.html";
}

function searchName() {
    const shopName = document.getElementById('name-search').value;
    sessionStorage.setItem("shopName", shopName);
    window.location = "./results-page/results-page.html";
}