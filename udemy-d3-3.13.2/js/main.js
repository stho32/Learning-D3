/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var yPrefix = "$";
var xAxisLabel = "Month";
var revenueFlag = true;

var margin = { top: 10, left: 80, bottom: 100, right: 10 };
var svgWidth  = 600;
var svgHeight = 400;

var width  = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var paddingInner = 0.2;
var paddingOuter = 0.2;

var svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

// move the visualization into the center
var graphSpace = svg.append("g")
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand()
            .range([0, width])
            .paddingInner(paddingInner)
            .paddingOuter(paddingOuter);


var y = d3.scaleLinear()
            .range([height, 0]);

// draw axis

var yAxisGroup = graphSpace.append("g")
                           .attr("class", "y-axis");

var xAxisCall = d3.axisBottom(x);
var xAxisGroup = graphSpace.append("g")
                           .attr("class", "x-axis")
                           .attr("transform", "translate(0," + height + ")");

// Label for y-Axis
var yLabelDomElement = graphSpace.append("g")
                                 .attr("transform", "translate(-60, " + height / 2 + ")")
                                 .append("text")
                                 .attr("font-family", "Arial")
                                 .attr("font-size", "14pt")
                                 .attr("font-weight", "bold")
                                 .attr("text-anchor", "middle")
                                 .attr("transform", "rotate(-90)");

// Label for x-Axis
graphSpace.append("g")
            .attr("transform", "translate(" + width / 2 + ", " + (height + 60) + ")")
            .append("text")
            .attr("font-family", "Arial")
            .attr("font-size", "14pt")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .text(xAxisLabel);


d3.json("data/revenues.json").then(
    function(data) {
        data.forEach((d) => { 
            d.revenue = +d.revenue; 
            d.profit  = +d.profit;
        });

        d3.interval(() => {
            revenueFlag = !revenueFlag;
            update(data);
        }, 1000);

        update(data);
    }
)

function update(data) {
    var value = revenueFlag ? "revenue" : "profit";

    x.domain(data.map((d) => d.month));

    /* We do not want the y Axis to change all the time */
    var revenueMax = d3.max(data, (d) => d["revenue"]);
    var profitMax = d3.max(data, (d) => d["profit"]);
    var totalMax = revenueMax;
    if ( revenueMax < profitMax )
    {
        totalMax = profitMax;
    }

    y.domain([0, totalMax]);

    xAxisGroup.call(xAxisCall)
              .selectAll("text")
              .attr("y", 10)
              .attr("x", -5)
              .attr("text-anchor", "end")
              .attr("transform", "rotate(-40)");

    var yAxisCall = d3.axisLeft(y)
                      .ticks(5)
                      .tickFormat((d) => (yPrefix + d));

    yAxisGroup.call(yAxisCall);

    // draw bars
    var bars = graphSpace.selectAll("rect")
                            .data(data);

    bars.exit().remove();

    bars.attr("x", (d) => x(d.month) )
        .attr("width", (d) => x.bandwidth())                                    
        .transition(d3.transition().duration(500)) // 500ms transition
            .attr("y", (d) => y(d[value]))
            .attr("height", (d) => height-y(d[value]));

    bars.enter()
        .append("rect")
        .attr("x", (d) => x(d.month) )
        .attr("width", (d) => x.bandwidth())                                    
        .attr("y", (d) => y(0))
        .attr("height", (d) => height-y(d[value]))
        .attr("fill-opacity", 0)
        .attr("fill", "grey")
        .transition(d3.transition().duration(500)) // 500ms transition
            .attr("y", (d) => y(d[value]))
            .attr("fill-opacity", 1);


    yLabelDomElement.text(value);
}