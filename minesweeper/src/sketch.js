const WIDTH = 800;
const HEIGHT = WIDTH;

const nRows = 10;
const nCols = nRows;

const SIZE = WIDTH / nRows;

let grid = make2DArray(nRows, nCols);

function setup() {
  createCanvas(WIDTH, HEIGHT);

  forEachCell(grid, cell => {
    if (random(0, 1) > 0.5) {
      cell.setIsMine();
    }
  });

  forEachCell(grid, cell => {
    cell.countNeighbours(grid);
  });
}

function draw() {
  background(255);
  drawGrid(grid);
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
        cell.setIsRevealed();
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

// function cellIndex(i, j) {
//   // TODO: see how to use
//   return j * nCols + i;
// }
