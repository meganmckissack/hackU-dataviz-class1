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

/*var dataSet = _.map(_.range(40), function(i) {
  return {
    x: Math.random() *100,
    y: Math.random() *100,
    r: Math.random() *30
  };
});*/

var dataSet = data.map(function(val){
  return {
    x: val.synonyms.length*20,
    y: val.qualities.length*25,
    r: val.nature.length*2
  }
});



var margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var height = 500 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataSet, function(data) {
    return data.y
  })])
  .range([height, 0]);

var xScale = d3.scale.linear()
  .domain([0, 100])
  .range([0, width]);

var colorScale = d3.scale.linear()
  .domain([0, d3.max(dataSet)]) //data based
  //.domain([0,newData.length]) //position based
  .range(['#55C3DC', '#73726D', '#E24B2C']);

var svg = d3.select('#chartArea').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

svg.selectAll('circle')
  .data(dataSet)
  .enter()
  .append('circle')
  .attr('class', 'scatter')
  .attr('cx', function(data) {
    return xScale(data.x)
  })
  .attr('cy', function(data) {
    return yScale(data.y)
  })
  .attr('r', function(data) {
    return data.r
  });
