let rules = [
  [0, 2, 1 / 2, 0, 0, 'A', 'A', 3 / 2, 1, 0],
  [0, 2, 'A', 0, 0, 'A', 3 / 2, 0, 1, -1],
  [0, 2, 1, 0, 0, 'A', 0, 0, 1, -1],
  [1, 2, 1, 0, 0, 3 / 2, 'A', 'A', 1, 0],
  [1, 1, 1, 0, 0, 0, 'A', 3 / 2, 1, 0],
  [6, 2, 'A', 0, 0, 3 / 2, 3 / 2, 1, 1, -1],
  [6, 1, 'A', 0, 0, 0, 'A', 1, 1, -1],
];

let rules2 = [
  [0, 2, 2, 0, 0, 0, 0, 0, 1, -1],
  [0, 2, 2, 'A', 'A', 1, 1, 0, 1, -1],
  [6, 2, 1, 'A', 'A', 1, 1, 1, 1, -1],
  [6, 2, 1, 'A', 'A', 0, 0, 1, 1, -1],
  [6, 1, 0, 0, 0, 'A', 'A', 1, 1, -1], //5
  [0, 2, 0, 0, 2, 1, 1, 0, 0, -1],
  [3, 2, 'A', 1, 1, 1, 'A', 'A', -1, 1], //7
  [0, 2, 1, 2, 2, 1, 1, 1, 0, -1], //8
  [0, 2, 0, 0, 0, 1, 1, 0, -1, 0],
  [0, 2, 1, 2, 0, 1, 1, 1, -1, 0], //10
  [1, 1, 1, 'A', 'A', 0, 0, 1, 1, 0],
  [1, 1, 1, 'A', 'A', 1, 1, 1, 1, 0],
  [2, 2, 'A', 1, 2, 'A', 'A', 'A', 0, 1],
  [0, 2, 0, 1, 1, 'A', 'A', 0, 1, 0],
  [0, 2, 0, 2, 2, 'A', 'A', 0, 1, 0],
  [0, 2, 1, 'A', 'A', 'A', 'A', 0, 1, 0],
  [1, 2, 1, 'A', 'A', 'A', 0, 0, 1, 0],
  [1, 1, 1, 'A', 'A', 0, 0, 0, 1, 0],
  [3, 1, 0, 1, 1, 'A', 'A', 'A', -1, 1],
];

let rules3 = [
  //隣接ペアボット数=1
  [0, 2, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, -1, 0],
  [0, 2, 1 / 2, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 0, -1],
  [0, 2, 1 / 2, 1 / 2, 2, 1 / 2, 1 / 2, 1 / 2, 1, -1],
  [0, 2, 1 / 2, 1 / 2, 1 / 2, 2, 1 / 2, 1 / 2, 1, 0],
  [0, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 2, 1 / 2, 0, 1],
  [0, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 2, -1, 1],
  //2
  [0, 2, 2, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, [-1, 0], [0, -1]],
  [0, 2, 1 / 2, 2, 2, 1 / 2, 1 / 2, 1 / 2, [0, -1], [1, -1]],
  [0, 2, 1 / 2, 1 / 2, 2, 2, 1 / 2, 1 / 2, [1, -1], [1, 0]],
  [0, 2, 1 / 2, 1 / 2, 1 / 2, 2, 2, 1 / 2, [0, 1], [0, 1]],
  [0, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 2, 2, [-1, 1], [0, 1]],
  [0, 2, 2, 1 / 2, 1 / 2, 1 / 2, 1 / 2, 2, [-1, 0], [-1, 1]],
  //3
  [0, 2, 2, 2, 2, 1 / 2, 1 / 2, 1 / 2, 0, -1],
  [0, 2, 1 / 2, 2, 2, 2, 1 / 2, 1 / 2, 1, -1],
  [0, 2, 1 / 2, 1 / 2, 2, 2, 2, 1 / 2, 1, 0],
  [0, 2, 1 / 2, 1 / 2, 1 / 2, 2, 2, 2, 0, 1],
  [0, 2, 2, 1 / 2, 1 / 2, 1 / 2, 2, 2, -1, 1],
  [0, 2, 2, 2, 1 / 2, 1 / 2, 1 / 2, 2, -1, 0],
];

//[相方の位置,{surround},{nextGo}] // length = 10

//   3 2
//  4 0 1
//   5 6

// ロボットが存在しない：0
// ロボットが1or0：0.5
// ロボットが1台：1
// ロボットが1or2台：1.5
// ロボットが2台：2
// ロボットがN台：N
// ロボットがany台：'A'
// nextGOのみ
