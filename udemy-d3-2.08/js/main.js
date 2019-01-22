/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(function(data) {
    data.forEach( function (value) { value.height = parseFloat(value.height); } );
    console.log(data);

    var svg = d3.select("#chart-area")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);

    var buildingRectangles = svg.selectAll("rect")
                                .data(data);

    buildingRectangles.enter()
                      .append("rect")
                      .attr("x", function(d,i) { return i*25; })
                      .attr("y", 0)
                      .attr("height", function(d,i) { return d.height; })
                      .attr("width", 20)
                      .attr("fill", "grey");

}).catch(function(error) {
    console.log("error! " + error)
});