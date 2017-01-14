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
