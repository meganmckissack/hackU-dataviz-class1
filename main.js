$( document ).ready(function() {
    console.log( "ready!" );
});

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

/*var changeData = _.map(_.range(40), function(i) {
  return {
    x: Math.random() *100,
    y: Math.random() *100,
    r: Math.random() *30
  };
});*/

var dataSet = data.map(function(val){
  return {
    x: Math.random() *100,
    y: Math.random() *100,
    r: val.nature.length*2
  }
});

//transition function example, tied to click button
function update () {
  _.each(dataSet, function (datum){
    datum.x = Math.round(Math.random()*100);
    datum.y = Math.round(Math.random() *100);
    datum.r = Math.round(5 + Math.random() * 10);
  })
  svg.selectAll('circle')  //rendering chart for transition function
    .transition()
    .duration(1000)
    .ease('elastic')
    .attr('cx', function (d){
      return xScale(d.x);
    })
    .attr('cy', function (d) {
      return yScale(d.y);
    })
    .attr('r', function (d) {
      return d.r;
    })
}


var margin = {
  top: 20,
  right: 20,
  bottom: 60,
  left: 40
};
var height = 400 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataSet, function(data) {
    return data.y
  })])
  .range([height, 0]);

var xScale = d3.scale.linear()
  .domain([0, 100])
  .range([0, width]);

/*var colorScale = d3.scale.linear()
  .domain([0, d3.max(dataSet)]) //data based
  //.domain([0,newData.length]) //position based
  .range(['#55C3DC', '#73726D', '#E24B2C']);*/

var svg = d3.select('#chartArea').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(10)
    .innerTickSize(10)
    .outerTickSize(10)
    .tickPadding(10);

svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0, '+ (height + 10) + ')')
  .call(xAxis);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient('left')
  .ticks(5)
  .innerTickSize(10)
  .outerTickSize(2)
  .tickPadding(10);

svg.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(0, '+ 10 + ')')
  .call(yAxis);

//$('#change').on('click', dataSet);

/*var changeData = data.forEach(function (d) {
    return {
    x: Math.random()*50,
    y: Math.random()*50,
    r: Math.random()*50
    }
  });*/


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
  })
  .on('mouseover', function(data){
    d3.select(this).classed('highlight', true);
})
  .on('mouseout', function(d){
  d3.select(this).classed('highlight', false);
});




  /*.attr('width', xScale.range)
  .style('height', function(data) {
    return yScale(data)
  })*/
  //.attr('fill', function(data, i) {
  //  return colorScale(data) //data based
      //return colorScale(i) //position based
 //
