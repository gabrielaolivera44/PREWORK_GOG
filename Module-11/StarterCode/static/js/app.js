// from data.js
var tableData = data;

// YOUR CODE HERE!
// Obtiene los datos de entrada
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var inputElement = d3.select("#datetime");
var inputValue = inputElement.property("value");
//let $dateInput = inputValue;
console.log(inputValue);
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchButton = document.querySelector("#filter-btn");


// Crea listenr para el botón 
$searchButton.addEventListener("click", handleSearchClick);


// consultaTabla renders the tableData to the tbody
function consultaTabla() {
    $tbody.innerHTML = "";
    for (var i = 0; i < tableData.length; i++) {
        // Get current ufo info object and its fields
        var info = tableData[i];
        var fields = Object.keys(info);
        // Create a new row in the tbody
        var $row = $tbody.insertRow(i);
        for (let j = 0; j < fields.length; j++) {
            // For every field in info object, create new cell and set its inner
            // text to be the current value at the current info field
            let field = fields[j];
            let $cell = $row.insertCell(j);
            $cell.innerText = info[field];
        }
    }
}

function handleSearchClick() {
    // Define criterios de búsqueda
    var filterDate = $dateInput.value.trim();
    //let filterDate = "1/9/2010";
    //let filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();
    // Actualiza tableData de acuerdo los criterios de búsqueda
    tableData = data.filter(function(ufoSighting) {
        var searchDate = ufoSighting.datetime;
        var searchCity = ufoSighting.city.toLowerCase();
        var searchState = ufoSighting.state.toLowerCase();
        var searchCountry = ufoSighting.country.toLowerCase();
        var searchShape = ufoSighting.shape.toLowerCase();
        // If statements to match search criteria with filtered criteria
        if (
            (searchDate === filterDate || filterDate === "") &&
            (searchCity === filterCity || filterCity === "") &&
            (searchState === filterState || filterState === "") &&
            (searchCountry === filterCountry || filterCountry === "") &&
            (searchShape === filterShape || filterShape === "")
        ) {
            return true;
        }
        return false;
    });
    consultaTabla();

    // Limpia variable con los criterios de búaqueda
    $dateInput.value = "";
    $cityInput.value = "";
    $stateInput.value = "";
    $countryInput.value = "";
    $shapeInput.value = "";
}

// Presenta los datos sin filtro para la primera vez
consultaTabla();
