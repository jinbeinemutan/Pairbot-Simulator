//main関数
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

let c = new Canvas(); // canvasの初期化&rtb
let pairArray = [];
var intervalId;
let nowAlgo = rules;
let SYNC = "F";

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

document.getElementById("all_delete").onsubmit = function (event) {
  event.preventDefault();
  if (intervalId) {
    clearInterval(intervalId); // タイマーが動いている場合は停止する
    intervalId = null; // タイマーIDをクリアする
    document.getElementById("isrunning").textContent = "タイマーストップ";
  }
  pairArray = [];
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
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

function handleSelectChange(selectElement) {
  const selectedValue = selectElement.value;

  switch (selectedValue) {
    case "makeLine":
      nowAlgo = rules;
      document.getElementById("output").textContent =
        "SSYNCで任意の構成から直線になるアルゴリズム";
      break;
    case "maketriangle":
      nowAlgo = rules2;
      document.getElementById("output").textContent =
        "SSYNCで直線から三角形を形成するアルゴリズム";
      break;
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
      window.alert("selectがバグってるよ!");
  }
}

// 仮
function roudn1() {
  //FSYNC
  if (SYNC == "F") {
    for (let i = 0; i < pairArray.length; i++) {
      pairArray[i].isActivate = true;
    }
  } else if (SYNC == "S") {
    for (let i = 0; i < pairArray.length; i++) {
      pairArray[i].isActivate = randomBoolean = (() => Math.random() >= 0.5)();
    }
  }

  for (let i = 0; i < pairArray.length; i++) {
    if (pairArray[i].isActivate) {
      pairArray[i].pairLookPhase();
      pairArray[i].pairComputePhase();
    }
  }

  for (let i = 0; i < pairArray.length; i++) {
    if (pairArray[i].isActivate) {
      pairArray[i].pairMovePhase();
    }
  }
  c.drawGrid();
  c.drawRobot();
}
