window.onload = function () {
    var url = 'https://restcountries.eu/rest/v1'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            main(countries);
        }
    }
    request.send();
}
​
var Map = function( latLng, zoom ) {
  this.googleMap = new google.maps.Map( document.getElementById( 'map' ), {
    center: latLng,
    zoom: zoom
  })
}
​
var main = function (countries) {
    populateSelect(countries);
    var cached = localStorage.getItem("selectedCountry");
    var selectedCountry = countries[0];
    if(cached){
        selectedCountry = JSON.parse(cached);
        document.querySelector('#countries').selectedIndex = selectedCountry.index;
    }
    updateDisplay(selectedCountry, {lat: selectedCountry.latlng[0], lng: selectedCountry.latlng[1]});
    document.querySelector('#info').style.display = 'block';
}
​
var populateSelect = function (countries) {
    var parent = document.querySelector('#countries');
    countries.forEach(function (item, index) {
        item.index = index;
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (e) {
        var index = this.value;
        var country = countries[index];
        console.log(country)
        var center = {lat: country.latlng[0], lng: country.latlng[1]}
        console.log(center)
        updateDisplay(country, center);
        localStorage.setItem("selectedCountry", JSON.stringify(country));
    });
}
​
var updateDisplay = function (lala, center) {
    var tags = document.querySelectorAll('#info p');
    tags[0].innerText = lala.name;
    tags[1].innerText = lala.population;
    tags[2].innerText = lala.capital;
    var map = new Map(center, 5);
}