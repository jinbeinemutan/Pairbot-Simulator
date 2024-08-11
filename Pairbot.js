class Pairbot {
  constructor(x, y, id) {
    this.robA = new Robot(x, y, id);
    this.robB = new Robot(x, y, id);
    this.isLong = false;
    this.isActivate = false;
    this.AsyncPhase = 0;
  }

  pairLookPhase() {
    this.robA.lookPhase();
    this.robB.lookPhase();
  }

  pairComputePhase() {
    this.robA.computePhase();
    this.robB.computePhase();
  }
  pairMovePhase() {
    let isMoveA = false;
    let isMoveB = false;
    if (this.isLong) {
      isMoveA = this.robA.movePhase();
    }
    isMoveB = this.robB.movePhase();

    if (isMoveA || isMoveB) {
      this.isLong = !this.isLong;
    }
  }

  setisLong() {
    this.isLong = this.robA.x != this.robB.x || this.robA.y != this.robB;
  }

  ActAsyncPhase() {
    switch (this.AsyncPhase) {
      case 0:
        this.pairLookPhase();
        break;
      case 1:
        this.pairComputePhase();
        break;
      case 2:
        this.pairMovePhase();
        break;
    }
    this.AsyncPhase = (this.AsyncPhase + 1) % 3;
  }

  getIsLong(){
    return this.isLong;
  }
}
