
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

/* var color = d3.scale.ord inal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
*/

var color = function(value)
{

  var c = 120 * value;
  return 'hsl('+ c +',100%,50%)';
};


var arc = function(d) {
  return d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius * 0.3);
};
var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .value(function(d) { return 1; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var data = [
  {
    "symbol": "💡", 
    "value": 0.0
  },
  {
    "symbol": "🔑",
    "value": 0.33
  },
  {
    "symbol": "🔒",
    "value": 0.66
  }];

var g = svg.selectAll(".arc")
    .data(pie(data))
  .enter().append("g")
    .attr("class", "arc");

  /*g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.value); });
  */
g.append("text")
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .attr("style", "font-size:4em")
    .text(function(d) { return d.data.symbol; });


