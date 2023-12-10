class Cell {
  constructor(x, y, size) {
    this.pos = new p5.Vector(x, y);
    this.size = size;
    this.value = 0;
    this.isMine = false;
    this.isRevealed = false;
  }

  show() {
    fill(100);
    if (this.isRevealed) {
      noFill();
      if (this.isMine) {
        this.value = -1;
        fill(100);
        ellipse(
          this.pos.x + this.size / 2,
          this.pos.y + this.size / 2,
          this.size / 1.5
        );
      } else {
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
}
