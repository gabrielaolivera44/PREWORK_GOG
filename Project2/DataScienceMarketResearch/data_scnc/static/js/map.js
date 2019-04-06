function initialize(){

    var worldMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
        // id: 'mapbox.mapbox-streets-v7',
        // id: 'mapbox.mapbox-traffic-v1',
        // id: 'mapbox.terrain-rgb',
        // id: 'mapbox.mapbox-terrain-v2',
        // id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiYnVpdHJvbiIsImEiOiJjamVscGdqMGMxbDM4MndtZWkyNzlya3k3In0.pKbQxM0ARbeBunYG4UBZ-Q',
        maxZoom: 16,
        minZoom: 2
    });


    var layers = {
        GREAT_LOC: new L.LayerGroup(),
        GOOD_LOC: new L.LayerGroup(),
        OK_LOC: new L.LayerGroup()
    };

    var map = L.map('map', {
        center: [37.8, -96],
        zoom: 5,
        layers: [
        layers.GREAT_LOC,
        layers.GOOD_LOC,
        layers.OK_LOC
        ]
    });

    worldMap.addTo(map);

    var overlays = {
        "Data Scientist": layers.GREAT_LOC,
        "Data Analyst": layers.GOOD_LOC,
        "Data Engineer": layers.OK_LOC
    };

    L.control.layers(null, overlays, {collapsed: false}).addTo(map);

    var info = L.control({
        position: "topright"
    });

    info.onAdd = function(){
        var div = L.DomUtil.create("div", "legend");
        return div
    };

    info.addTo(map);

    var icons = {
        GREAT_LOC: L.ExtraMarkers.icon({
            icon: "ion-android-person",
            iconColor: "white",
            markerColor: "yellow",
            shape: "star",
            iconSize: [38,46],
            iconAnchor: [14,45],
            shadowSize: [35, 16],
            shadowAnchor: [5, 15]
        }),
        GOOD_LOC: L.ExtraMarkers.icon({
            icon: "ion-android-person",
            iconColor: "white",
            markerColor: "blue-dark",
            shape: "circle",
            iconSize: [38,46],
            iconAnchor: [14,45],
            shadowSize: [35, 16],
            shadowAnchor: [5, 15]
        }),
        OK_LOC: L.ExtraMarkers.icon({
            icon: "ion-android-person",
            iconColor: "white",
            markerColor: "red",
            shape: "penta",
            iconSize: [38,46],
            iconAnchor: [14,45],
            shadowSize: [35, 16],
            shadowAnchor: [5, 15]
        })
    };


//    d3.json('./sb_grape_2016_.json', (d) => {
    d3.json('./data_locations.json', (d) => {
// "category":"Data Engineer","employer":"Amazon.com Services, Inc.","jobtitle"
        var rated;

        d.forEach((element) => {

            try {

                if (element.category == 'Data Engineer'){
                    rated = 'OK_LOC';
                } else if (element.category == 'Data Analyst'){
                    rated = 'GOOD_LOC';
                } else {
                    rated = 'GREAT_LOC';
                }

                var newMarker = L.marker([element.latitude, element.longitude], {
                    icon: icons[rated],
                    riseOnHover: true
                });

                newMarker.addTo(layers[rated]);

                newMarker.on('click', (selected) => {
                    updateLegend(element.latitude, element.longitude, element.category, element.employer, element.jobtitle);
                        //, element.price, element.rating, element.pH, element.Carbon, element.Water_at_WiltingPoint);
                })

                //updateLegend("0", "0", "earth", "world", "", "", "", "", "", "");
                updateLegend("0", "0", "", "", "");
            }
            catch(err){
                console.log("nope");
            }
        });
    });
}

//function updateLegend(lat, lon, region, country, wine, price, rating, ph, carbon, wwp){
//    document.querySelector('.legend').innerHTML =
//        "<strong>Geo-Coordinates:</strong> " + lat + ", " + lon + "<br>" +
//        "<strong>Region, Country:</strong> " + region + ", " + country + "<br>" +
//        "<strong>Wine Produced:</strong> " + wine + "<br>" +
//        "<strong>Price:</strong> $" + price + "<br>" +
//        "<strong>Wine Enthusiast Rating:</strong> " + rating + "<br></hr>" +
//        "<strong>Soil pH Levels:</strong> " + ph + "<br>" +
//        "<strong>Soil Carbon Levels:</strong> " + carbon + "<br>" +
//        "<strong>Soil Water Wilting Point Content:</strong> " + wwp + "%"
//        ;
//}

function updateLegend(lat, lon, category, employer, jobtitle){
    document.querySelector('.legend').innerHTML =
        "<strong>Geo-Coordinates:</strong> " + lat + ", " + lon + "<br>" +
        "<strong>Category:</strong> " + category + "<br>" +
        "<strong>Employer:</strong> " + employer + "<br>" +
        "<strong>Job title:</strong> " + jobtitle + "<br></hr>"
        ;
}