const WIDTH = 800;
const HEIGHT = WIDTH;

const nRows = 10;
const nCols = nRows;

const SIZE = WIDTH / nRows;

let grid = [];
let gameEnded = false;
let gameEndedMessage = null;
let restartButton = null;

let totalCells = nRows * nCols;
let numOfRevealed = 0;
let numOfMines = 0;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = bootGame();
  createRestartButton();
  gameEndedMessage = createP();
  gameEndedMessage.position(100, HEIGHT + 100);
}

function draw() {
  background(255);
  drawGrid(grid);

  if (gameEnded) {
    restartButton.show();
    gameEndedMessage.show();
  } else {
    restartButton.hide();
    gameEndedMessage.hide();
  }
}

function mousePressed() {
  // detects if a cell is pressed
  forEachCell(grid, cell => {
    if (
      mouseX > cell.pos.x &&
      mouseX < cell.pos.x + SIZE &&
      mouseY > cell.pos.y &&
      mouseY < cell.pos.y + SIZE
    ) {
      if (cell.isRevealed) {
        return;
      }

      cell.reveal(grid);
      // TODO: solve way to count auto revealed cells
      numOfRevealed++;

      if (cell.isMine) {
        gameOver('lost');
        return;
      }

      if (numOfRevealed + numOfMines === totalCells) {
        gameOver('win');
      }
    }
  });
}

function bootGame() {
  grid = make2DArray(nRows, nCols);
  forEachCell(grid, cell => {
    if (random(0, 1) > 0.95) {
      cell.setIsMine();
      numOfMines++;
    }
  });

  forEachCell(grid, cell => {
    cell.countNeighbours(grid);
  });

  console.log('game started');
  return grid;
}

/**
 *
 * @param {'lost' | 'win'} type
 */
function gameOver(type) {
  gameEnded = true;
  switch (type) {
    case 'lost':
      gameEndedMessage.elt.textContent = 'Game Over: try again';
      forEachCell(grid, cell => {
        cell.reveal();
      });
      break;

    case 'win':
      gameEndedMessage.elt.textContent = "Congratulations: You've won!";
      forEachCell(grid, cell => {
        if (!cell.isRevealed) {
          cell.reveal();
        }
      });
      break;
  }
}

function createRestartButton() {
  restartButton = createButton('Restart');
  restartButton.position(0, HEIGHT + 100);
  restartButton.mousePressed(() => {
    numOfMines = 0;
    numOfRevealed = 0;
    bootGame();
    gameEnded = false;
  });
}

// draws grid
function drawGrid(grid) {
  grid.forEach(rows => {
    rows.forEach(cell => {
      cell.show();
    });
  });
}

function forEachCell(grid, cb) {
  grid.forEach(rows => {
    rows.forEach(cell => {
      cb(cell);
    });
  });
}

/**
 *
 * @param {Number} rows
 * @param {Number} columns
 * @returns {Array<Array<number>>}
 */
function make2DArray(rows, columns) {
  let arr = [];

  // creating two-dimensional array
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < columns; j++) {
      arr[i][j] = new Cell(i * SIZE, j * SIZE, SIZE);
    }
  }

  return arr;
}
