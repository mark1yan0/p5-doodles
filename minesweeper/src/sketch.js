const WIDTH = 800;
const HEIGHT = WIDTH;

const nRows = 10;
const nCols = nRows;

const SIZE = WIDTH / nRows;

let grid = [];
let gameEnded = false;
let restartButton = null;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = bootGame();
  createRestartButton();
}

function draw() {
  background(255);
  drawGrid(grid);

  if (gameEnded) {
    restartButton.show();
  } else {
    restartButton.hide();
  }
}

function mousePressed() {
  // detects if a cell is pressed
  grid.forEach(rows => {
    rows.forEach(cell => {
      if (
        mouseX > cell.pos.x &&
        mouseX < cell.pos.x + SIZE &&
        mouseY > cell.pos.y &&
        mouseY < cell.pos.y + SIZE
      ) {
        cell.setIsRevealed(true);

        if (cell.isMine) {
          gameOver('lost');
          gameEnded = true;
        }
      }
    });
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

function bootGame() {
  grid = make2DArray(nRows, nCols);
  forEachCell(grid, cell => {
    if (random(0, 1) > 0.9) {
      cell.setIsMine();
    }
  });

  forEachCell(grid, cell => {
    cell.countNeighbours(grid);
  });

  console.log('game started');
  return grid;
}

function gameOver(type) {
  switch (type) {
    case 'lost':
      console.log('game over: lost');
      forEachCell(grid, cell => {
        cell.setIsRevealed(true);
      });
      break;

    case 'win':
      console.log('game over: win');
      break;
  }
}

function createRestartButton() {
  restartButton = createButton('Restart');
  restartButton.position(0, HEIGHT + 100);
  restartButton.mousePressed(() => {
    bootGame();
    gameEnded = false;
  });
}
