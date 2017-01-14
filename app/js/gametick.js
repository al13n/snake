(function(){
	function gametick(){
		var config = snakeapp.config;
		document.getElementById("score").innerHTML = "SCORE: " + snakeapp.config.score;
		if(config.currentstate === 0)
		{
			snakeapp.pause();
			return ;
		}
		
		if(snakeapp.snakebody.checkCollision()){
			config.currentstate = 0;
			config.gameover = 1;
			snakeapp.gameover();
		}
		
		if(config.meal === 0){
			snakeapp.generateMeal(config);
		}
		
		for(var i = 0; i < config.rows; i++){
                        for(var j = 0; j < config.columns; j++){
				var cell = document.getElementById(i + "_" + j);
				cell.style.background = config.cell_color;
			}
		}
		
		document.getElementById(config.mealposition.x+"_"+config.mealposition.y).style.background = "white";
				
		if(snakeapp.snakebody.eatsMeal()){
			snakeapp.snakebody.addToTail();
			document.getElementById(config.mealposition.x+"_"+config.mealposition.y).style.background = config.cell_color;
			config.speed -= config.level*config.level;
			config.score += config.level*2;
			config.level++;
			config.meal = 0;
		}
		snakeapp.snakebody.move();
		snakeapp.snakebody.paintCells();
		
	}
	
	snakeapp.gametick = gametick;
})();
