class Pairbot {
  constructor(x, y, id) {
    this.robA = new Robot(x, y, id);
    this.robB = new Robot(x, y, id);
    this.isLong = false;
    this.isActivate = false;
  }

  pairLookPhase() {
    // if (this.isLong) {
    //   //short
    //   this.robA.lookPhase();
    // } else {
    //   this.robB.lookPhase();
    // }
    this.robA.lookPhase();
    this.robB.lookPhase();
  }

  pairComputePhase() {
    // if (this.isLong) {
    //   //short
    //   this.robA.computePhase();
    // } else {
    //   this.robB.computePhase();
    // }
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
}
