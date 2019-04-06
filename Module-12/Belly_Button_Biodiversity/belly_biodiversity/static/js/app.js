function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    var metadataSelector = d3.select('#sample-metadata');

    d3.json(`/metadata/${sample}`).then( data =>{
      metadataSelector.html("");
      // Use console.log 
      console.log(Object.entries(data));
      Object.entries(data).forEach(([key,value]) =>{
        metadataSelector
          .append('p').text(`${key} : ${value}`)
          .append('hr')
      });
    })
}

function pieChart(data) {
    console.log(data);
    let labels = data.otu_ids.slice(0,10);
    let values = data.sample_values.slice(0,10);
    let hovertext = data.otu_labels.slice(0,10);

    let trace = [{
      values : values,
      labels : labels,
      type : "pie",
      textposition: "inside",
      hovertext : hovertext
    }];

    let layout = {
//        title: '<b> Belly Button Pie Chart </b>' //,
//        plot_bgcolor: 'rgba(0, 0, 0, 0)',
//        paper_bgcolor: 'rgba(0, 0, 0, 0)',
    };

    Plotly.newPlot('pie', trace , layout, {responsive: true});
}

function bubbleChart(data) {
  let x = data.otu_ids;
  let y = data.sample_values;
  let markersize = data.sample_values;
  let markercolors = data.otu_ids;
  let textvalues = data.otu_labels;

  let trace =[{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: markersize,
      color: markercolors //,
//      colorscale: 'Jet'
    },
    text: textvalues
  }];

  let layout ={
//    title:"<b>Belly Button Bubble Chart</b>",
    xaxis: {
      title: 'Valores OTU_ID',
    },
    yaxis: {
      title: ''
    },
    width:1300,
    height:550,
    plot_bgcolor: 'rgba(200,255,0,0.1)',
    //paper_bgcolor: 'rgba(0, 0, 0, 0)',
    margin: {
      pad: -50
    }
  };

  Plotly.newPlot('bubble', trace, layout, {responsive: true});
}

function gaugeChart(data) {
  // Enter a speed between 0 and 180
  let degree = parseInt(data.WFREQ) * (180/10);

  let level = degree;

  // Trig to calc meter point
  let degrees = 180 - level,
       radius = .5;
  let radians = degrees * Math.PI / 180;
  let x = radius * Math.cos(radians);
  let y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  let path = mainPath.concat(pathX,space,pathY,pathEnd);

  let trace = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'WASH FREQ',
      text: data.WFREQ,
      hoverinfo: 'text+name'},
    { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
    textinfo: 'text',
    textposition:'inside',
    textfont:{
      size : 16,
      },
    marker: {colors:['rgba(6, 51, 0, .5)', 'rgba(9, 77, 0, .5)', 
                           'rgba(12, 102, 0 ,.5)', 'rgba(14, 127, 0, .5)',
                           'rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)', 
                           'rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)', 
                           'rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)'
                    ]},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '2-1', '0-1',''],
    hoverinfo: 'text',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  let layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],

    title: '<b> Belly Button Washing Frequency</b> <br> Scrub Per Week',
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]} //,
//    plot_bgcolor: 'rgba(0, 0, 0, 0)',
//    paper_bgcolor: 'rgba(0, 0, 0, 0)',
  };

  Plotly.newPlot('gauge', trace, layout, {responsive: true});
}


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(`/samples/${sample}`).then( data =>{
      // ## Pie Chart ##
      pieChart(data);
      // ## Bubble Chart ##
      bubbleChart(data);
    //  gaugeChart(data);
    });

    d3.json(`/wfreq/${sample}`).then ( wdata =>{
      // ## Gauge Chart ##
      gaugeChart(wdata);
    });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();