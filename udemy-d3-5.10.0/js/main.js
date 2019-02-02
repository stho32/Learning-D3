/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

d3.json("data/data.json").then(function(data){

	/* Step 1: Filter out null values */
	data.forEach(d => {
		d.countries = d.countries.filter(country => 
										 country.income   != null && 
										 country.life_exp != null);
	});

	// only 1 year in the plot
	data = data[0];

	// Log data for debugging
	console.log(data);

	// define margins and graph size
    var margin = { top: 10, left: 100, bottom: 100, right: 10 };
    var svgWidth = 600;
    var svgHeight = 400;

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

	// create svg space
	var chartArea = d3.select("#chart-area");
    var svg = chartArea.append("svg")
                	   .attr("width", svgWidth)
					   .attr("height", svgHeight);
					   
	var graph = svg.append("g")
			       .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

	// create scales
	var xScale = d3.scaleLog()
				   .domain([300, 150000])
				   .range([0,width]);

	var yScale = d3.scaleLinear()
				   .domain([0, 90])
				   .range([height, 0]);

	// derive y axis
	var yAxisCall = d3.axisLeft(yScale)
	                  .tickFormat((d) => d);
	
	graph.append("g")
		 .attr("class", "y-axis")
	     .call(yAxisCall);

	// Label for the y-axis

	graph
		.append("g")
		.attr("class", "y-axis-label")
		.attr("transform", "translate(-60, " + height / 2 + ")")
		.append("text")
		.attr("font-family", "Arial")
		.attr("font-size", "14pt")
		.attr("font-weight", "bold")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Life expectancy");

	// derive x axis
	var xAxisCall = d3
		.axisBottom(xScale)
		.tickValues([400, 4000, 40000]);

	graph
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxisCall)
		.selectAll("text")
		.text(d => d)
		.attr("y", 10)
		.attr("x", 0)
		.attr("text-anchor", "middle");

	// Label x-axis
	graph
		.append("g")
		.attr("class", "x-axis-label")
		.attr("transform", "translate(" + width / 2 + ", " + (height + 60) + ")")
		.append("text")
		.attr("font-family", "Arial")
		.attr("font-size", "14pt")
		.attr("font-weight", "bold")
		.attr("text-anchor", "middle")
		.text("GDP per capita");	

	// draw countries
	var countries = data.countries;

	var countryCircles = 
		graph.append("g")
			 .attr("class", "countryCircles")
			 .selectAll("circle")
		     .data(countries, d => d.country);

	countryCircles.exit().remove();
	
	countryCircles
		.attr("cx", (d) => xScale(d.income))
		.attr("cy", (d) => yScale(d.life_exp))
		.attr("r", 5);

	countryCircles
		.enter()
		.append("circle")
		.attr("cx", (d) => xScale(d.income))
		.attr("cy", (d) => yScale(d.life_exp))
		.attr("r", 5)
		.attr("fill", "red");

});