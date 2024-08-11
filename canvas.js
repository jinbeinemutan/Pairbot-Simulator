//global 変数
const w = 900;
const h = 600;
const a = 30; //1:2:Math.sqrt(3)の1
const w_ofset = ((h / 2) * Math.sqrt(3)) / 3;
const rtb_h = 17;
const rtb_w = 25;
let rtb;

class Canvas {
  constructor() {
    //make rtb[x][y][N_robot]
    rtb = new Array(rtb_w); //21
    for (let i = 0; i < rtb_w; i++) {
      rtb[i] = new Array(rtb_h);
    }
    for (let i = 0; i < rtb_w; i++) {
      for (let j = 0; j < rtb_h; j++) {
        rtb[i][j] = new Array(1).fill(0);
      }
    }
  }

  drawGrid() {
    ctx.clearRect(0, 0, w, h);
    let half_w = w / 2;
    let half_h = h / 2;

    //drawing bold line
    ctx.strokeStyle = "brack";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, half_h);
    ctx.lineTo(w, half_h);
    ctx.moveTo(half_w + w_ofset, 0);
    ctx.lineTo(half_w - w_ofset, h);
    ctx.stroke();

    //drawing thin line
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    while (half_h > 0) {
      half_h -= a * Math.sqrt(3);
      ctx.beginPath();
      ctx.moveTo(0, half_h);
      ctx.lineTo(w, half_h);
      ctx.moveTo(0, h - half_h);
      ctx.lineTo(w, h - half_h);
      ctx.stroke();
    }

    while (half_w + w_ofset > 0) {
      ctx.beginPath();
      ctx.moveTo(half_w + w_ofset, 0);
      ctx.lineTo(half_w - w_ofset, h);
      ctx.moveTo(w - half_w + w_ofset, 0);
      ctx.lineTo(w - half_w - w_ofset, h);
      //
      ctx.moveTo(half_w - w_ofset, 0);
      ctx.lineTo(half_w + w_ofset, h);
      ctx.moveTo(w - half_w - w_ofset, 0);
      ctx.lineTo(w - half_w + w_ofset, h);
      ctx.stroke();
      half_w -= 2 * a;
    }
  }

  drawRobot() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    for (let i = 0; i < rtb.length; i++) {
      for (let j = 0; j < rtb[i].length; j++) {
        let pile = 0;
        for (let k = 0; k < rtb[i][j].length; k++) {
          if (rtb[i][j][k] != 0) {
            randomColor(rtb[i][j][k]);
            let x = i - Math.floor(rtb_w / 2);
            let y = j - Math.floor(rtb_h / 2);
            ctx.beginPath();
            ctx.arc(
              450 + a * (x * Math.round(Math.sqrt(3)) + y),
              300 - y * a * Math.sqrt(3) - pile * 10,
              18,
              0,
              Math.PI * 2
            );
            ctx.stroke();
            ctx.fill();
            if (isCheet) {
              ctx.fillStyle = "black";
              ctx.fillText(
                rtb[i][j][k],
                450 + a * (x * Math.round(Math.sqrt(3)) + y),
                300 - y * a * Math.sqrt(3) - pile * 10
              );
            }

            pile++;
          }
        }
      }
    }
  }
}

function setrtb_relative(x, y, id) {
  rtb[x + Math.floor(rtb_w / 2)][y + Math.floor(rtb_h / 2)].push(id);
}
function getrtb_relative(x, y) {
  return rtb[x + Math.floor(rtb_w / 2)][y + Math.floor(rtb_h / 2)];
}

function rm_relative(x, y, id) {
  for (
    let i = 0;
    i < rtb[x + Math.floor(rtb_w / 2)][y + Math.floor(rtb_h / 2)].length;
    i++
  ) {
    if (rtb[x + Math.floor(rtb_w / 2)][y + Math.floor(rtb_h / 2)][i] == id) {
      rtb[x + Math.floor(rtb_w / 2)][y + Math.floor(rtb_h / 2)].splice(i, 1);
      break;
    }
  }
}

//仮の色
function randomColor(id) {
  switch (id % 8) {
    case 0:
      ctx.fillStyle = "#ffffff";
      break;
    case 1:
      ctx.fillStyle = "#ff0000";
      break;
    case 2:
      ctx.fillStyle = "#00ff00";
      break;
    case 3:
      ctx.fillStyle = "#0000ff";
      break;
    case 4:
      ctx.fillStyle = "#ffff00";
      break;
    case 5:
      ctx.fillStyle = "#ff00ff";
      break;
    case 6:
      ctx.fillStyle = "#00ffff";
      break;
    case 7:
      ctx.fillStyle = "grey";
      break;
  }
}
