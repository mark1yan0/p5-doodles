class Cell {
  constructor(x, y, size) {
    this.pos = new p5.Vector(x, y);
    this.size = size;
    this.value = 0;
    this.isMine = false;
    this.isRevealed = false;
    this.gridIndex = {
      i: this.pos.x / this.size,
      j: this.pos.y / this.size,
    };
  }

  show() {
    fill(100);
    if (this.isRevealed) {
      noFill();
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
        textSize(30); // TODO: dynamic
        text(
          this.value,
          this.pos.x + this.size / 2,
          this.pos.y + this.size / 2
        );
      }
    } else {
      rect(this.pos.x, this.pos.y, this.size, this.size);
    }
  }

  setIsMine() {
    this.isMine = true;
  }

  setIsRevealed() {
    this.isRevealed = true;
  }

  countNeighbours(grid) {
    if (this.isMine) {
      this.value = -1;
      return;
    }
    /**
    i - 1 | j - 1, i | j - 1, i + 1 | j - 1
    i - 1 | j, i | j, i + 1, j
    i - 1 | j + 1, i | j + 1, i + 1 | j + 1
    */
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const currentLookup = {
          i: this.gridIndex.i + i,
          j: this.gridIndex.j + j,
        };
        if (
          grid[currentLookup.i] &&
          grid[currentLookup.i][currentLookup.j] &&
          grid[currentLookup.i][currentLookup.j].isMine
        ) {
          this.value++;
        }
      }
    }
  }
}
