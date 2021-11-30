function shopsNearMe() {
    window.location = "./results-page/results-page.html";
}

function searchName() {
    const shopName = new FormData(document.querySelector('query'));
    sessionStorage.setItem("shopName", shopName);
    window.location = "./results-page/results-page.html";
}