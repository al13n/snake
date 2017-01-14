(function(){
	'use strict';
	
	var config = {
		rows : 20,
		columns : 20,
		colors : [ "red", "blue", "green", "yellow", "magenta", "grey", "cyan", "purple", "yellow", "green" ],
		cell_color: "peachpuff",
		gameover: 0,
		currentstate: 0,
		listening: 0,
		meal: 0,
		mealposition: null,
		level: 1,
		speed: 180,
		score: 0,	
	};
	
	snakeapp.config = config;
})();
