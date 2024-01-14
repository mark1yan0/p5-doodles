class Cell {
  constructor(x, y, size) {
    this.pos = new p5.Vector(x, y);
    this.size = size;
    this.value = 0;
    this.isMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
    this.gridIndex = {
      i: this.pos.x / this.size,
      j: this.pos.y / this.size,
    };
  }

  show() {
    if (this.isFlagged) {
      fill(0);
    } else {
      fill(100);
    }

    if (this.isRevealed) {
      stroke(0);
      noFill();
      rect(this.pos.x, this.pos.y, this.size, this.size);
      if (this.isMine) {
        fill(100);
        ellipse(
          this.pos.x + this.size / 2,
          this.pos.y + this.size / 2,
          this.size / 1.5
        );
      } else {
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(SIZE * 0.5);
        if (this.value !== 0) {
          text(
            this.value,
            this.pos.x + this.size / 2,
            this.pos.y + this.size / 2
          );
        }
      }
    } else {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }

  flag() {
    this.isFlagged = true;
  }

  setIsMine() {
    this.isMine = true;
  }

  reveal(grid) {
    this.isRevealed = true;
    // reveal all empty cells
    if (typeof grid !== 'undefined') {
      this.floodFill(grid);
    }
  }

  floodFill(grid) {
    this.forEachNeighbour(grid, neighbour => {
      if (this.value === 0 && !neighbour.isRevealed) {
        neighbour.reveal(grid);
      }
    });
  }

  countNeighbours(grid) {
    if (this.isMine) {
      this.value = -1;
      return;
    }

    this.forEachNeighbour(grid, neighbour => {
      if (neighbour.isMine) {
        this.value++;
      }
    });
  }

  forEachNeighbour(grid, cb) {
    /**
      i - 1 | j - 1, i | j - 1, i + 1 | j - 1
      i - 1 | j, i | j, i + 1, j
      i - 1 | j + 1, i | j + 1, i + 1 | j + 1
      */
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          grid[this.gridIndex.i + i] &&
          grid[this.gridIndex.i + i][this.gridIndex.j + j]
        ) {
          const neighbour = grid[this.gridIndex.i + i][this.gridIndex.j + j];
          cb(neighbour);
        }
      }
    }
  }
}
