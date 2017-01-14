(function(){
	'use strict';
	window.snakeapp = {};
})();
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

(function(){
	'use strict';

	function removeallchilds(node){
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}
	
	function init(config){
		var root = document.getElementById("root");
		removeallchilds(root);
		var cell_width = root.offsetWidth/config.columns;
		var cell_height = root.offsetHeight/config.rows;
		

		for(var i = 0; i < config.rows; i++){
			for(var j = 0; j < config.columns; j++){
				var cell = document.createElement("span");
				cell.style.width = cell_width + "px";
				cell.style.height = cell_height + "px";
				cell.id = i + "_" + j;
				cell.className = "cells";
				root.appendChild(cell);
			}
		}
	}
	
	snakeapp.init = init;
})();

(function(){

		function generateMeal(config){
			config.meal = 1;
			var row = (Math.floor(Math.random()*1000) + config.cols^3)%config.rows;
			var col = (Math.floor(Math.random()*1000) + config.rows^3)%config.columns;
			config.mealposition = {x: row, y:col};
		}
		
		snakeapp.generateMeal = generateMeal;		
})();

(function(){
	function Position(row, col) {
		this.row = row;
		this.col = col;
	}
	
	function Direction(x, y){
		this.x = x;
		this.y = y;
	}

	function Node(position, direction, color, parent){
		this.position = position;
		this.direction = direction;
		this.color = color;
		this.prev_direction = direction;
		this.parent = parent;
		this.next = null;
	}


	function Snakebody(config) {
		
		this.init = init;
		this.config = config;	
		this.move = move;
		this.addToTail = addToTail;
		this.paintCells = paintCells;		
		this.checkCollision = checkCollision;
		this.eatsMeal = eatsMeal;
		this.head_node = init();
		
		function init(){
			var position = new Position(config.rows/2, config.columns/2);
			var direction = new Direction(0, 0);
			var color = config.colors[Math.floor((Math.random() * 10))];
			return new Node(position, direction, color, null);
		}		

		function move(){
			var node = this.head_node; 
			while(node) {
				node.position.row += node.direction.x;
				node.position.col += node.direction.y;
				node.prev_direction = node.direction;
				if(node.parent)
					node.direction = node.parent.prev_direction;
				node = node.next;
			}
		}

		function addToTail(){
			var node = this.head_node;
			while(node.next) {
				node = node.next;
			}
			
			var position = new Position(node.position.row - node.direction.x, node.position.col - node.direction.y);
		 	var direction = new Direction(node.direction.x, node.direction.y);	
			var color = config.colors[Math.floor((Math.random() * 10))];
			node.next = new Node(position, direction, color, node);
		}
		
		function paintCells(){
			var node = this.head_node;
			while(node) {
				var element = document.getElementById(node.position.row + "_" + node.position.col);
				element.style.background = node.color;
				node = node.next;
			}
		}
		
		function checkCollision(){
			var node = this.head_node;
			while(node){
				if((node.position.row + node.direction.x) < 0 || (node.position.row + node.direction.x) >= this.config.rows)
					return true;
				if((node.position.col+node.direction.y) < 0 || (node.position.col + node.direction.y) >= this.config.columns)
					return true;
				var itselfnode = node;
				while(itselfnode){
					if(itselfnode !== node){
						if(itselfnode.position.row == node.position.row && itselfnode.position.col == node.position.col)
	return true;
					}
					itselfnode = itselfnode.next;
				}
				node = node.next;
			}
		}
		
		function eatsMeal(){
			if(this.head_node.position.row == this.config.mealposition.x && this.head_node.position.col== this.config.mealposition.y){
			return true;
}
			return false;
		}
		
		init();
	}

	snakeapp.snakebody = new Snakebody(snakeapp.config);
})();

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
