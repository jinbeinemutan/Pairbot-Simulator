//main関数
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

let c = new Canvas(); // canvasの初期化&rtb
let rtbArray = []; // rtbの履歴(gm)
let pairArray = []; //全てのpairbotを格納してるリスト
let pairArrayHistory = []; //pairArrayの履歴のリスト

var intervalId;
let nowAlgo = rules3;
let SYNC = "F";
let DD = "week";

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
  c.drawRobot();
});

document.getElementById("round").onsubmit = function (event) {
  event.preventDefault();
  if (intervalId) {
    clearInterval(intervalId); // タイマーが動いている場合は停止する
    intervalId = null; // タイマーIDをクリアする
    document.getElementById("isrunning").textContent = "タイマーストップ";
  }
  roudn1();
};

// document.getElementById("undo").onsubmit = function (event) {
//   event.preventDefault();
//   if (intervalId) {
//     clearInterval(intervalId); // タイマーが動いている場合は停止する
//     intervalId = null; // タイマーIDをクリアする
//     document.getElementById("isrunning").textContent = "タイマーストップ";
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
    document.getElementById("isrunning").textContent = "タイマーストップ";
  }
  pairArray = [];
  pairArrayHistory = [];
  // rtbArray.length = 1;
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 13; j++) {
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
    document.getElementById("isrunning").textContent = "タイマーストップ";
  } else {
    intervalId = setInterval(
      roudn1,
      1000 - document.getElementById("speed").value
    ); // タイマーが停止している場合は開始する
    document.getElementById("isrunning").textContent = "タイマースタート";
  }
};

let SyncSelect = document.getElementById("SYNC");
SyncSelect.options[0].selected = true;
SyncSelect.addEventListener("change", function () {
  switch (SyncSelect.value) {
    case "leaderElection":
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
AlgoSelect.options[0].selected = true;
AlgoSelect.addEventListener("change", function () {
  switch (AlgoSelect.value) {
    case "makeLine":
      nowAlgo = rules;
      break;
    case "maketriangle":
      nowAlgo = rules2;
      break;
    case "leaderElection":
      nowAlgo = rules3;
      break;
    default:
      window.alert("error: none of MyAlgo.value is selected");
  }
});

let DDSelect = document.getElementById("DuplicationDetection");
DDSelect.options[0].selected = true;
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

// 仮
function roudn1() {
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
  }
}

function pairArrayToRrtb(pairArray) {
  //  JSON.parse(JSON.stringify(pairArray));
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 13; j++) {
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
