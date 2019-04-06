function initialize(){
var margin = {top: 70, right: 20, bottom: 30, left: 40},
    w = 800 - margin.left - margin.right,
    h = 700 - margin.top - margin.bottom;

var color = d3.scale.ordinal()
      .range(["#6699ff", "#003399", "#ff3300", "#bec0c0", "#ff9900", "#99cc00", "#001a4d"]);
//    .range(["#ffc87c", "#ffeba8", "#f3b080", "#916800", "#dda66b"]);

var radius = Math.min(w, h) / 2;

var arc1 = d3.svg.arc()
    .outerRadius(0.3 * radius)
    .innerRadius(0.1 * radius); 
var arc2 = d3.svg.arc()
    .outerRadius(0.6 * radius )
    .innerRadius(0.4 * radius );
var arc3 = d3.svg.arc()
    .outerRadius(0.9 * radius )
    .innerRadius(0.7 * radius );  
var arc4 = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(1.0 * radius);
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.analyst; });
var pie2 = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.expense; });
var pie3 = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.ciencia; });

var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" +(w/2+margin.left)+
                   "," +(h/2+margin.top)+ ")");

d3.csv("data_06.csv", function(data) {
  
  data.forEach(function(d) {
    d.analyst = +d.analyst;
    d.expense = +d.expense;
  });

var g = svg.selectAll(".arc1")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc1");

  g.append("path")
      .attr("d", arc1)
      .style("fill", function(d) { return color(d.data.skill); });
  
  g.append("text")
      .attr("transform", function(d) { 
              return "translate(" + arc1.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.analyst; });

var g = svg.selectAll(".arc2")
      .data(pie2(data))
      .enter().append("g")
      .attr("class", "arc2");
  
  g.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return color(d.data.skill); });
  
  g.append("text")
      .attr("transform", function(d) { 
               return "translate(" + arc2.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.expense; });

var g = svg.selectAll(".arc3")
      .data(pie2(data))
      .enter().append("g")
      .attr("class", "arc3");
  
  g.append("path")
      .attr("d", arc3)
      .style("fill", function(d) { return color(d.data.skill); });
  
  g.append("text")
      .attr("transform", function(d) { 
               return "translate(" + arc3.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.ciencia; });


g.append("text")
      .attr("transform", function(d) { 
               return "translate(" + arc4.centroid(d) + ")"; })
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.skill; });      



var legend = legendTable.selectAll(".legend")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { 
               return "translate(0," + i * 20 + ")"; });

legend.append("rect")
      .attr("x", w - 18)
      .attr("y", 4)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d) { return color(d.data.skill); });

  legend.append("text")
      .attr("x", w - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d.data.skill; });

});


var title = d3.select("svg").append("g")
      .attr("transform", "translate(" +margin.left+ "," +margin.top+ ")")
      .attr("class","title")
     
title.append("text")
      .attr("x", (w / 2))             
      .attr("y", -30 )
      .attr("text-anchor", "middle")  
      .style("font-size", "22px") 
      .text("A donut chart");


}
