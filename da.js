var size = 600;
var planetSize = size/6;
var stroke = planetSize / 4;


var width = size,
    height = size,
    radius = (Math.min(width, height) - 2*planetSize) / 2;


var color = function(value)
{

  var c = 120 * value;
  return 'hsl('+ c +',100%,60%)';
};


var arc = d3.svg.arc()
    .outerRadius(radius - stroke*2)
    .innerRadius(radius * 0.3);

var labelArc = d3.svg.arc()
    .outerRadius(radius - stroke*2)
    .innerRadius(radius - stroke*3);

var labelBorder = d3.svg.arc()
    .outerRadius(planetSize)
    //.innerRadius(planetSize - stroke)
    .startAngle(0)
    .endAngle(Math.PI * 2);

var labelBackground = d3.svg.arc()
    .outerRadius(planetSize - stroke)
    .innerRadius(0)
    .startAngle(0)
    .endAngle(Math.PI * 2);



var pie = d3.layout.pie()
    .value(function(d) { return 1; });

var data = [
  {
    "symbol": "🔑",
    "value": 0.33
  },
  {
    "symbol": "🔒",
    "value": 0.66
  },
  {
    "symbol": "💡", 
    "value": 0.0
  }
];


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .data([data])  
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var g = svg.selectAll(".arc")
  .data(pie)
  .enter().append("g")
  .attr("class", "arc");
/*
g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.value); });
*/
g.append("path")
    .attr("d", labelArc)
    .style("fill", "black")
    .style("stroke", "black");

  
/*g.append("path")
    .attr("d", labelBackground)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .style("fill", "white");*/

g.append("path")
    .attr("d", labelBorder)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .style("fill", "black");
g.append("text")
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .attr("dy", (planetSize * 0.3) + "px")
    .style("fill","white")
    .style("font", planetSize + "px sans-serif")
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.symbol; });


