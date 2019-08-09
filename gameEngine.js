"use strict";

document.getElementById("cellsInARow").innerHTML = config.CELLS_IN_A_ROW;
document.getElementById("cellsInAColumn").innerHTML = config.CELLS_IN_A_COLUMN;

const resetButton = document.getElementById("resetButton");
resetButton.style.display = 'inline-block';
resetButton.style['background-color'] = config.CELL_COLOR;

const canvas = document.getElementById("canvas");
canvas.height = config.CELLS_IN_A_ROW * config.CELL_SIZE_IN_PIXELS;
canvas.width = config.CELLS_IN_A_COLUMN * config.CELL_SIZE_IN_PIXELS;
canvas.style.display = 'block';

const ctx = canvas.getContext('2d');
ctx.fillStyle = config.CELL_COLOR;

let game;;

let fpsInterval;

let lastTimestamp = null;

function initialize() {
  game = new Game(config.CELLS_IN_A_ROW, config.CELLS_IN_A_COLUMN);
  fpsInterval = 1000 / config.FPS;
}

function tick(timestamp) {	
	draw();
	
	if (lastTimestamp != null) {
		let frameTime = timestamp - lastTimestamp;
		if (frameTime >= fpsInterval) {
			lastTimestamp = timestamp;
			game.nextState();
		}
	} else {
		lastTimestamp = timestamp;
	}
	
	window.requestAnimationFrame(tick)
}

function draw() {
	for(let columnIndex = 0; columnIndex < config.CELLS_IN_A_COLUMN; columnIndex++) {
		for(let rowIndex = 0; rowIndex < config.CELLS_IN_A_ROW; rowIndex++) {
			let cell = game.getCell(rowIndex, columnIndex);
			let x = columnIndex * config.CELL_SIZE_IN_PIXELS;
			let y = rowIndex * config.CELL_SIZE_IN_PIXELS;
			
			if (cell.isAlive()) {
				ctx.fillRect(x, y, config.CELL_SIZE_IN_PIXELS, config.CELL_SIZE_IN_PIXELS);
			} else {
				ctx.clearRect(x, y, config.CELL_SIZE_IN_PIXELS, config.CELL_SIZE_IN_PIXELS);
			}
		}
	}
}

function resetGame() {
  initialize();
}

initialize();
window.requestAnimationFrame(tick);
