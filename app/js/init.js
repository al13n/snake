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
