var data = [{
  "name": "book",
  "synonyms": ["tome", "scroll", "tablet"],
  "qualities": ["educational", "wise"],
  "nature": "neutral good ooo"
}, {
  "name": "candle",
  "synonyms": ["torch", "lamp", "flashlight", "light", "beacon"],
  "qualities": ["enlightening", "revealing", "illuminating", "opening"],
  "nature": "too too good"
}, {
  "name": "bell",
  "synonyms": ["signal", "chime", "warning"],
  "qualities": ["clear", "truthful"],
  "nature": "good-good"
}, {
  "name": "staff",
  "synonyms": ["stick", "cane", "crook", "pole"],
  "qualities": ["strong", "steady", "supporting"],
  "nature": "good-bad"
}, {
  "name": "blade",
  "synonyms": ["knife", "sword", "axe"],
  "qualities": ["damaging", "forceful"],
  "nature": "evilincarnate"
}, {
  "name": "seed",
  "synonyms": ["bean"],
  "qualities": ["growth", "renewal", "creation", "transitional"],
  "nature": "good enough"
}, {
  "name": "cloak",
  "synonyms": ["hood", "mask", "disguise", "robe"],
  "qualities": ["protective", "mysterious", "warmth"],
  "nature": "neutral"
}, {
  "name": "map",
  "synonyms": ["compass", "guide"],
  "qualities": ["helpful", "moving", "transitional"],
  "nature": "plus good plus "
}]



var newData=[];
for (i = 0; i < data.length; i++) {
  var item = data[i]["nature"].length;
  newData.push(item);
}

var height = 200;
var width = 400;

var yScale = d3.scale.linear()
  .domain([0, d3.max(newData)*1.1])
  .range([0, height]);

var xScale = d3.scale.ordinal()
    .domain(newData)
    .rangeBands([0, width], 0.25, 0.25);

var colorScale = d3.scale.linear()
    .domain([0,d3.max(newData)]) //data based
    //.domain([0,newData.length]) //position based
    .range(['#55C3DC', '#73726D', '#E24B2C']);

var svg = d3.select('#barChart').append('svg')
    .attr('width', width)
    .attr('height', height);

svg.selectAll('rect')
    .data(newData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function(data, index){
      return xScale(data)
    })
    .attr('y', function(data) {
      return height - yScale(data)
    })
    .attr('width', xScale.rangeBand)
    .style('height', function (data) {
      return yScale(data)
    })
    .attr('fill', function(data, i) {
      return colorScale(data) //data based
      //return colorScale(i) //position based
    })
