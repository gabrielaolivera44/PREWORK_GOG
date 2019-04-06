function initialize(){
var color =  d3.scale.category10();
var margin = {top: 70, right: 70, bottom: 30, left: 50},
    w = 800 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom;
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, w], .1);
var x1 = d3.scale.ordinal();
var y = d3.scale.linear()
    .range([h, 0]);
var xAxis = d3.svg.axis()
    .scale(x0)  
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
 //   .tickFormat(d3.format(".0%"));  
   
var yGrid = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-w, 0, 0)
    .tickFormat("")  
var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
d3.csv("data_tools.csv", function(error, data) {
  
  var sectorNames = d3.keys(data[0]).filter(function(key) { 
           return key !== "Tool"; });
  data.forEach(function(d) {
      d.tools = sectorNames.map(function(name) { 
            return {name: name, value: +d[name]}; });
  });  
  x0.domain(data.map(function(d) { return d.Tool; }));
  x1.domain(sectorNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { 
       return d3.max(d.tools, function(d) { return d.value; }); })]);
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "-.28em")
      .attr("dy", ".15em");
//      .attr("transform", function (d) {return "rotate(-45)";});

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      
  svg.append("g")         
      .attr("class", "grid")
      .call(yGrid);  

  var tool = svg.selectAll(".issue")
      .data(data)
      .enter().append("g")
      .attr("class", "empleador")
      .attr("transform", function(d)  { return "translate(" + x0(d.Tool) + ",0)"; }); 
  tool.selectAll("rect")
      .data(function(d) { return d.tools; })
      .enter().append("rect")
      .attr("width", x1.rangeBand()) 
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); }) 
      .attr("height", function(d) { return h - y(d.value); })
      .style("fill", function(d) { return color(d.name); });
  
var pointlabels = tool.selectAll(".pointlabels")
      .data(function(d) { return d.tools; })
      .enter().append("g")
      .attr("class", "pointlabels")
      .attr("transform", function(d) { 
              return "translate(" + x1(d.name) + "," + y(d.value) + ")"; });
      
pointlabels.append("text")
      .attr("dy", "-0.3em")
      .attr("x", x1.rangeBand()/2)
      .attr("text-anchor", "middle")
//      .attr("transform", "rotate(-45)")  
      .text(function(d) { return d.value; });
var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { 
               return "translate(0," + i * 20 + ")"; });
   
  legend.append("rect")
      .attr("x", w - 18)
      .attr("y", 4)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color);
  legend.append("text")
      .attr("x", w - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; })
});

var labels = svg.append("g")
       .attr("class","labels")
     
  labels.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Who gets hired?");
      
  var title = svg.append("g")
      .attr("class","title")
     
  title.append("text")
      .attr("x", (w / 2))             
      .attr("y", -30 )
      .attr("text-anchor", "left")  
      .style("font-size", "22px") 
      .text("A Grouped Bar Chart");

}
