//main関数
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

let c = new Canvas(); // canvasの初期化&rtb
let rtbArray = []; // rtbの履歴(gm)
let pairArray = []; //全てのpairbotを格納してるリスト
let pairArrayHistory = []; //pairArrayの履歴のリスト

var intervalId;

let nowAlgo = R_kim;
let SYNC = "F";
let DD = "strong";
let isCheet = false;

c.drawGrid();
c.drawRobot();

// canvasをクリックするとペアボットが出現する
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let yh = Math.round((h / 2 - y) / (a * Math.sqrt(3)));
  let xw = Math.round((x - w / 2 - a * yh) / (2 * a));
  if (getrtb_relative(xw, yh).length == 1) {
    pairArray.push(new Pairbot(xw, yh, pairArray.length + 1));
    // pairArrayHistory.push(JSON.parse(JSON.stringify(pairArray)));
    // pairArrayHistory.push(pairArray.map( list => ({...list})));
    // Objectを作り直すしかないか？
    // console.log(pairArrayHistory);
  }
  c.drawGrid();
  c.drawRobot();
});

document.getElementById("round").onsubmit = function (event) {
  event.preventDefault();
  if (intervalId) {
    clearInterval(intervalId); // タイマーが動いている場合は停止する
    intervalId = null; // タイマーIDをクリアする
    document.getElementById("AAA").value = "AutoMode start";
  }
  roudn1();
};

// document.getElementById("undo").onsubmit = function (event) {
//   event.preventDefault();
//   if (intervalId) {
//     clearInterval(intervalId); // タイマーが動いている場合は停止する
//     intervalId = null; // タイマーIDをクリアする
//     document.getElementById("AAA").value = "AutoMode start";
//   }

//   if (pairArrayHistory.length > 0) {
//     let temp = pairArrayHistory.pop();
//     console.log(temp);
//     // pairArray = JSON.parse(JSON.stringify(temp));
//     // pairArray = pairArray.map( list => ({...list}));
//     pairArrayToRrtb(temp);
//     c.drawGrid();
//     c.drawRobot();
//   }
//   // if (rtbArray.length > 1) {
//   //   rtb = JSON.parse(JSON.stringify(rtbArray.pop()));
//   //   console.log(rtb);
//   //   c.drawGrid();
//   //   c.drawRobot();
//   // }
// };

document.getElementById("all_delete").onsubmit = function (event) {
  event.preventDefault();
  if (intervalId) {
    clearInterval(intervalId); // タイマーが動いている場合は停止する
    intervalId = null; // タイマーIDをクリアする
    document.getElementById("AAA").value = "AutoMode start";
  }
  pairArray = [];
  pairArrayHistory = [];
  // rtbArray.length = 1;
  for (let i = 0; i < rtb_w; i++) {
    for (let j = 0; j < rtb_h; j++) {
      rtb[i][j].length = 1;
    }
  }
  c.drawGrid();
  c.drawRobot();
};

document.getElementById("auto").onsubmit = function (event) {
  event.preventDefault();
  if (intervalId) {
    clearInterval(intervalId); // タイマーが動いている場合は停止する
    intervalId = null; // タイマーIDをクリアする
    document.getElementById("AAA").value = "AutoMode start";
  } else {
    intervalId = setInterval(
      roudn1,
      1000 - document.getElementById("speed").value
    ); // タイマーが停止している場合は開始する
    document.getElementById("AAA").value = "AutoMode stop";
  }
};

let SyncSelect = document.getElementById("SYNC");
SyncSelect.options[0].selected = true;
SyncSelect.addEventListener("change", function () {
  switch (SyncSelect.value) {
    case "FSYNC":
      SYNC = "F";
      break;
    case "SSYNC":
      SYNC = "S";
      break;
    case "ASYNC":
      SYNC = "A";
      break;
    default:
      window.alert("error: none of SYNC.value is selected");
  }
});

let AlgoSelect = document.getElementById("myAlgo");
AlgoSelect.options[4].selected = true;
AlgoSelect.addEventListener("change", function () {
  switch (AlgoSelect.value) {
    case "makeLine_x":
      nowAlgo = R_makeLine_x;
      break;
    case "LEP_x_polygon":
      nowAlgo = R_LEP_x_polygon;
      break;
    case "LEP_polygon":
      nowAlgo = R_LEP_xy_polygon;
      break;
    case "LEP_2hop":
      nowAlgo = R_LEP_2hop;
      break;
    case "kim":
      nowAlgo = R_kim;
      break;
    case "maketriangle":
      nowAlgo = R_maketriangle_xy;
      break;
    case "makeLine":
      nowAlgo = R_makeLine_xy;
      break;
    default:
      window.alert("error: none of MyAlgo.value is selected");
  }
});

let DDSelect = document.getElementById("DuplicationDetection");
DDSelect.options[1].selected = true;
DDSelect.addEventListener("change", function () {
  switch (DDSelect.value) {
    case "strongDD":
      DD = "strong";
      break;
    case "weekDD":
      DD = "week";
      break;
    default:
      window.alert("error: none of DD.value is selected");
  }
});

document.getElementById("cheet").onsubmit = function (event) {
  event.preventDefault();
  if (!isCheet) {
    document.getElementById("cheetbotan").value = "Cheet OFF";
  } else {
    document.getElementById("cheetbotan").value = "Cheet ON";
  }
  isCheet = !isCheet;
  c.drawGrid();
  c.drawRobot();
};

// 仮
function roudn1() {
  if (nowAlgo == R_LEP_2hop && isSolved()) {
    window.alert("note: Leader Election Problem has been solved");
    if (intervalId) {
      clearInterval(intervalId); // タイマーが動いている場合は停止する
      intervalId = null; // タイマーIDをクリアする
      document.getElementById("AAA").value = "AutoMode start";
    }
    return 0;
  }
  if (SYNC == "A") {
    for (let i = 0; i < 3; i++) {
      let r = Math.floor(Math.random() * pairArray.length);
      pairArray[r].ActAsyncPhase();
    }
    c.drawGrid();
    c.drawRobot();
  } else {
    if (SYNC == "F") {
      for (let i = 0; i < pairArray.length; i++) {
        pairArray[i].isActivate = true;
      }
    } else if (SYNC == "S") {
      for (let i = 0; i < pairArray.length; i++) {
        pairArray[i].isActivate = randomBoolean = (() =>
          Math.random() >= 0.5)();
      }
    }

    for (let i = 0; i < pairArray.length; i++) {
      if (pairArray[i].isActivate) {
        pairArray[i].pairLookPhase();
        pairArray[i].pairComputePhase();
      }
    }

    // rtbArray.push(JSON.parse(JSON.stringify(rtb)));
    // console.log(rtbArray);

    // pairArrayHistory.push(JSON.parse(JSON.stringify(pairArray)));
    // pairArrayHistory.push(pairArray.map( list => ({...list})));
    // console.log(pairArrayHistory);
    for (let i = 0; i < pairArray.length; i++) {
      if (pairArray[i].isActivate) {
        pairArray[i].pairMovePhase();
      }
    }
    c.drawGrid();
    c.drawRobot();
    console.log("\n");
  }
}

function pairArrayToRrtb(pairArray) {
  //  JSON.parse(JSON.stringify(pairArray));
  for (let i = 0; i < rtb_w; i++) {
    for (let j = 0; j < rtb_h; j++) {
      rtb[i][j] = [0];
    }
  }
  for (let i = 0; i < pairArray.length; i++) {
    setrtb_relative(
      pairArray[i].robA.x,
      pairArray[i].robA.y,
      pairArray[i].robA.id
    );
    setrtb_relative(
      pairArray[i].robB.x,
      pairArray[i].robB.y,
      pairArray[i].robB.id
    );
  }
}

// 簡易型 非連結で2グループを同時にやろうとすると終わる
function isSolved() {
  let shortcount = [];
  for (let i = 0; i < pairArray.length; i++) {
    if (!pairArray[i].getIsLong()) {
      shortcount.push(i);
    }
  }
  if (shortcount.length <= 3) {
    if (shortcount.length < 3) {
      return true;
    }
    return !(
      Math.abs(
        pairArray[shortcount[0]].robA.x - pairArray[shortcount[1]].robA.x
      ) +
        Math.abs(
          pairArray[shortcount[0]].robA.y - pairArray[shortcount[1]].robA.y
        ) >
        2 ||
      Math.abs(
        pairArray[shortcount[1]].robA.x - pairArray[shortcount[2]].robA.x
      ) +
        Math.abs(
          pairArray[shortcount[1]].robA.y - pairArray[shortcount[2]].robA.y
        ) >
        2 ||
      Math.abs(
        pairArray[shortcount[2]].robA.x - pairArray[shortcount[0]].robA.x
      ) +
        Math.abs(
          pairArray[shortcount[2]].robA.y - pairArray[shortcount[0]].robA.y
        ) >
        2 ||
      Math.abs(
        pairArray[shortcount[0]].robA.x -
          pairArray[shortcount[1]].robA.x +
          pairArray[shortcount[0]].robA.y -
          pairArray[shortcount[1]].robA.y
      ) > 1 ||
      Math.abs(
        pairArray[shortcount[0]].robA.x -
          pairArray[shortcount[2]].robA.x +
          pairArray[shortcount[0]].robA.y -
          pairArray[shortcount[2]].robA.y
      ) > 1 ||
      Math.abs(
        pairArray[shortcount[2]].robA.x -
          pairArray[shortcount[1]].robA.x +
          pairArray[shortcount[2]].robA.y -
          pairArray[shortcount[1]].robA.y
      ) > 1
    );
  } else {
    return false;
  }
}
