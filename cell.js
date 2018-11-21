"use strict";

const STATE_ALIVE = 'alive';
const STATE_DEAD = 'dead';
	
class Cell {
	
	constructor(isAlive) {
		this.setIsAlive(isAlive);
		this.nextState = null;
		this.neighbours = [];
	}
	
	setIsAlive(isAlive) {
		this.state = isAlive === true ? STATE_ALIVE : STATE_DEAD;
	}
	
	isAlive() {
		return this.state === STATE_ALIVE;
	}
	
	addNeighbour(neighbourCell) {
		if (neighbourCell != null) {
			this.neighbours.push(neighbourCell);
		}
	}

	calculateNextState() {
		let aliveNeighbors = this.calculateAliveNeighbours();
		
		if (this.isAlive()) {
			this.calculateNextStateForAlive(aliveNeighbors);
		} else {
			this.calculateNextStateForDead(aliveNeighbors);
		}
	}
	
	calculateAliveNeighbours() {
		let aliveNeighbors = 0;
		this.neighbours.forEach((neighbour) => {
			if (neighbour.isAlive()) {
				aliveNeighbors++;
			}
		});
		return aliveNeighbors;
	}
	
	calculateNextStateForAlive(aliveNeighbors) {
		if (aliveNeighbors < 2) {
			this.nextState = STATE_DEAD;
		} else if (aliveNeighbors <= 3) {
			this.nextState = STATE_ALIVE;
		} else {
			this.nextState = STATE_DEAD;
		}

	}
	
	calculateNextStateForDead(aliveNeighbors) {		
		if (aliveNeighbors === 3) {
			this.nextState = STATE_ALIVE;
		}
	}
	
	applyNextState() {
		this.state = this.nextState;
		this.nextState = null;
	}
	
	
}