(function(){
	
	function keydownhandler(e) {
		var dir = snakeapp.snakebody.head_node.direction;
		e.preventDefault();
		switch(e.keyCode){
			case 32:
				snakeapp.config.currentstate = 1 - snakeapp.config.currentstate;
				break;
			case 37:
				if( !(dir.x === 0 && dir.y === 1) )
					dir = {x: 0, y: -1};
				break;
			case 38:
				if( !(dir.x === 1 && dir.y === 0) )
					dir = {x: -1, y: 0};
				break;
			case 39:
				if( !(dir.x === 0 && dir.y === -1))
					dir = {x: 0, y: 1};
				break;
			case 40: if( !(dir.x === -1 && dir.y === 0) )
					dir = {x: 1, y: 0}; 
				break;
		}
		snakeapp.snakebody.head_node.direction = dir;
	}
	
	function justhandlespace(e){
		if(e.keyCode == 32 && snakeapp.config.gameover != 1)
		{
			e.preventDefault();
			snakeapp.config.currentstate = 1 - snakeapp.config.currentstate;
			if(snakeapp.config.currentstate == 1){
				resume();
			}
		}
		
		if(e.keyCode == 32 && snakeapp.config.gameover === 1)
		{
			snakeapp.start();
		}
	}

	function addListeners(){
		window.addEventListener("keydown", keydownhandler, true);
		snakeapp.config.listening = 1;
	}
	
	function removeListeners(){
		window.removeEventListener("keydown", keydownhandler, true);
		window.addEventListener("keydown", justhandlespace, true);
		snakeapp.config.listening = 0;
	}
	
	function gameover() {
		snakeapp.config.gameover = 1;
		snakeapp.config.level = 1;
		snakeapp.config.speed = 180;
		snakeapp.config.score = 0;
		clearInterval(snakeapp.config.tick);
		snakeapp.score = 0;
		snakeapp.snakebody.head_node = snakeapp.snakebody.init();
		removeListeners();
	}

	function resume(){
		if(!snakeapp.config.listening) addListeners();
		snakeapp.config.tick = setInterval(snakeapp.gametick, snakeapp.config.speed);	
	}
	
	function pause(){
		if(!snakeapp.config.listening) removeListeners();
		snakeapp.config.currentstate = 0;
	}

	snakeapp.pause = pause;
	snakeapp.resume = resume;
	snakeapp.gameover = gameover;
		
})();
