(function(){
	function start(){
		snakeapp.init(snakeapp.config);
		snakeapp.config.currentstate = 1;
		snakeapp.config.gameover = 0;
		snakeapp.resume();
	}
	
	snakeapp.start = start;
	window.onload = start;
})();
