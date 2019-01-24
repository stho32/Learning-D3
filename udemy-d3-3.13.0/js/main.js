/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

function barChart(namesAndValues, yPrefix, yAxisLabel, xAxisLabel)
{
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
    
    var names = namesAndValues.map((d) => d.name);

    var x = d3.scaleBand()
              .domain(names)
              .range([0, width])
              .paddingInner(paddingInner)
              .paddingOuter(paddingOuter);
    
    var maxValue = d3.max(namesAndValues, (d) => d.value);
    
    var y = d3.scaleLinear()
              .domain([0, maxValue])
              .range([height, 0]);

    // draw axis
    var yAxisCall = d3.axisLeft(y)
                      .ticks(5)
                      .tickFormat((d) => (yPrefix + d));

    graphSpace.append("g")
            .attr("class", "y-axis")
            .call(yAxisCall);

    var xAxisCall = d3.axisBottom(x);
    graphSpace.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisCall)
            .selectAll("text")
                .attr("y", 10)
                .attr("x", -5)
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-40)");


    // Label for y-Axis
    graphSpace.append("g")
              .attr("transform", "translate(-60, " + height / 2 + ")")
              .append("text")
              .text(yAxisLabel)
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

                
    // draw bars
    var bars = graphSpace.selectAll("rect")
                         .data(namesAndValues);

    bars.enter()
        .append("rect")
        .attr("x", (d) => x(d.name) )
        .attr("width", (d) => x.bandwidth())                                    
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => height-y(d.value))
        .attr("fill", "grey");
}



d3.json("data/revenues.json").then(
    function(data) {
        data.forEach((d) => { 
            d.revenue = +d.revenue; 
            d.profit  = +d.profit;
        });

        var namesAndValues = data.map( (d) => { return { name : d.month, value : d.revenue }; });

        barChart(namesAndValues, "$", "Revenue", "Month");
    }
)

