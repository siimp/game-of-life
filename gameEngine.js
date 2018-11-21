"use strict";

document.getElementById("cellsInARow").innerHTML = CELLS_IN_A_ROW;
document.getElementById("cellsInAColumn").innerHTML = CELLS_IN_A_COLUMN;

const resetButton = document.getElementById("resetButton");
resetButton.style.display = 'inline-block';
resetButton.style['background-color'] = CELL_COLOR;

const canvas = document.getElementById("canvas");
canvas.height = CELLS_IN_A_ROW * CELL_SIZE_IN_PIXELS;
canvas.width = CELLS_IN_A_COLUMN * CELL_SIZE_IN_PIXELS;
canvas.style.display = 'block';

const ctx = canvas.getContext('2d');
ctx.fillStyle = CELL_COLOR;

var game = new Game(CELLS_IN_A_ROW, CELLS_IN_A_COLUMN);

const fpsInterval = 1000 / FPS;
var lastTimestamp = null;

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
	for(let columnIndex = 0; columnIndex < CELLS_IN_A_COLUMN; columnIndex++) {
		for(let rowIndex = 0; rowIndex < CELLS_IN_A_ROW; rowIndex++) {
			let cell = game.getCell(rowIndex, columnIndex);
			let x = columnIndex * CELL_SIZE_IN_PIXELS;
			let y = rowIndex * CELL_SIZE_IN_PIXELS;
			
			if (cell.isAlive()) {
				ctx.fillRect(x, y, CELL_SIZE_IN_PIXELS, CELL_SIZE_IN_PIXELS);
			} else {
				ctx.clearRect(x, y, CELL_SIZE_IN_PIXELS, CELL_SIZE_IN_PIXELS);
			}
		}
	}
}

function resetGame() {
	game = new Game(CELLS_IN_A_ROW, CELLS_IN_A_COLUMN);
}

window.requestAnimationFrame(tick);