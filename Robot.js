class Robot {
  //相対座標で入力
  constructor(x, y, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.lookCoord = new Array(7); //int[7]
    this.nextgo = [0, 0]; //(x,y)
    this.selected = false;
    this.whereispair = 0; //相方の位置
    //   3 2
    //  4 0 1
    //   5 6

    setrtb_relative(x, y, id);
  }

  //rtb配列の頭に0が入ってる前提で進めてるgm仕様
  lookPhase() {
    let surrounding = [
      getrtb_relative(this.x, this.y),
      getrtb_relative(this.x + 1, this.y),
      getrtb_relative(this.x, this.y + 1),
      getrtb_relative(this.x - 1, this.y + 1),
      getrtb_relative(this.x - 1, this.y),
      getrtb_relative(this.x, this.y - 1),
      getrtb_relative(this.x + 1, this.y - 1),
    ];

    for (let i = 0; i < surrounding.length; i++) {
      this.lookCoord[i] =
        (surrounding[i].length > 3 ? 3 : surrounding[i].length) - 1;
    }

    //自分の周りだけを調べてもし、周りに相方がいなければ、short状態
    this.whereispair = 0;
    for (let i = 1; i < surrounding.length; i++) {
      for (let j = 0; j < surrounding[i].length; j++) {
        if (surrounding[i][j] == this.id) {
          this.whereispair = i;
          break;
        }
      }
    }
  }

  computePhase() {
    this.nextgo = [0, 0];

    let now = [];
    now.push(this.whereispair);
    now = now.concat(this.lookCoord);

    let arugo = nowAlgo;

    for (let i = 0; i < arugo.length; i++) {
      if (compare(now, arugo[i])) {
        this.nextgo[0] = arugo[i][8];
        this.nextgo[1] = arugo[i][9];
        break;
      }
    }
  }

  movePhase() {
    rm_relative(this.x, this.y, this.id);
    setrtb_relative(this.x + this.nextgo[0], this.y + this.nextgo[1], this.id);
    this.x += this.nextgo[0];
    this.y += this.nextgo[1];
    return !(this.nextgo[0] == 0 && this.nextgo[1] == 0);
  }
}

function compare(now, rule) {
  if (now[0] != Math.ceil(rule[0]) && now[0] != Math.floor(rule[0])) {
    return false;
  }

  for (let i = 1; i < now.length; i++) {
    if (
      now[i] != Math.ceil(rule[i]) &&
      now[i] != Math.floor(rule[i]) &&
      rule[i] != 3
    ) {
      return false;
    }
  }
  return true;
}
