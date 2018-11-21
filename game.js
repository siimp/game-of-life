"use strict";

class Game {
	/*
	* [row][column]
	* [0][0], [0][1]
	* [1][0], [1][1]
	*/
	constructor(cellsInARow, cellsInAColumn) {
		this.cellsInARow = cellsInARow;
		this.cellsInAColumn = cellsInAColumn;
		this.cells = [];
		
		for(let columnIndex = 0; columnIndex < this.cellsInAColumn; columnIndex++) {
			for(let rowIndex = 0; rowIndex < this.cellsInARow; rowIndex++) {
				if (columnIndex === 0) {
					this.cells[rowIndex] = [];
				}
				let isAlive = Math.random() > 0.5;
				this.cells[rowIndex][columnIndex] = new Cell(isAlive);
			}
		}
		
		this.initializeCellNeighbours();
	}
	
	getCell(rowIndex, columnIndex) {
		if (rowIndex < 0 || rowIndex >= this.cellsInARow 
			|| columnIndex < 0 || columnIndex >= this.cellsInAColumn) {
			return null;
		}
		
		return this.cells[rowIndex][columnIndex];
	}
		
	initializeCellNeighbours() {
		for(let columnIndex = 0; columnIndex < this.cellsInAColumn; columnIndex++) {
			for(let rowIndex = 0; rowIndex < this.cellsInARow; rowIndex++) {
				let cell = this.cells[rowIndex][columnIndex];
				
				let leftUpCell = this.getCell(rowIndex - 1, columnIndex - 1);
				cell.addNeighbour(leftUpCell);
				let upCell = this.getCell(rowIndex - 1, columnIndex);
				cell.addNeighbour(upCell);
				let rightUpCell = this.getCell(rowIndex - 1, columnIndex + 1);
				cell.addNeighbour(rightUpCell);
				
				let leftCell = this.getCell(rowIndex , columnIndex - 1);
				cell.addNeighbour(leftCell);
				let rightCell = this.getCell(rowIndex, columnIndex + 1);
				cell.addNeighbour(rightCell);
				
				let leftDownCell = this.getCell(rowIndex + 1, columnIndex - 1);
				cell.addNeighbour(leftDownCell);
				let downCell = this.getCell(rowIndex + 1, columnIndex);
				cell.addNeighbour(downCell);
				let rightDownCell = this.getCell(rowIndex + 1, columnIndex + 1);
				cell.addNeighbour(rightDownCell);
			}
		}
	}
	
	nextState() {
		for(let columnIndex = 0; columnIndex < this.cellsInAColumn; columnIndex++) {
			for(let rowIndex = 0; rowIndex < this.cellsInARow; rowIndex++) {
				let cell = this.cells[rowIndex][columnIndex];
				cell.calculateNextState();
			}
		}
		
		for(let columnIndex = 0; columnIndex < this.cellsInAColumn; columnIndex++) {
			for(let rowIndex = 0; rowIndex < this.cellsInARow; rowIndex++) {
				let cell = this.cells[rowIndex][columnIndex];
				cell.applyNextState();
			}
		}
	}
}