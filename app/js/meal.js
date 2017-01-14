(function(){

		function generateMeal(config){
			config.meal = 1;
			var row = (Math.floor(Math.random()*1000) + config.cols^3)%config.rows;
			var col = (Math.floor(Math.random()*1000) + config.rows^3)%config.columns;
			config.mealposition = {x: row, y:col};
		}
		
		snakeapp.generateMeal = generateMeal;		
})();
