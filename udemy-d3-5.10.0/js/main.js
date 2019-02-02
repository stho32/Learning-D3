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

	console.log(data);

});