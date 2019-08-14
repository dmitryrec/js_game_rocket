let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
canvas.width =
  document.documentElement.clientWidth / 1.5 > 600
    ? 600
    : document.documentElement.clientWidth / 1.5;
canvas.height =
  document.documentElement.clientHeight / 1.5 > 600
    ? 600
    : document.documentElement.clientHeight / 1.5;

let width = cvs.width;
let height = cvs.height;



let bg = new Image();
let car = new Image();
let enemy = new Image();

let speed = 5;

let xCar = width / 2 - 25;
let yCar = height - 50;

let score = 0;

let theme = new Audio();
theme.src = "audio/theme.mp3";

bg.src = "img/bg.png";
car.src = "img/c.png";
enemy.src = "img/e.png";


let keys = {
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  LEFT: 37,
  RIGHT: 39
};

let keyDown = {};

let setKey = function (keyCode) {
  keyDown[keyCode] = true;
};

let clearKey = function (keyCode) {
  keyDown[keyCode] = false;
};

let isKeyDown = function (keyName) {
  return keyDown[keys[keyName]] == true;
};

window.onkeydown = function (e) {
  setKey(e.keyCode);
};

window.onkeyup = function (e) {
  clearKey(e.keyCode);
};

let move = function () {
  if (isKeyDown("LEFT") && xCar > 0) xCar -= speed;

  if (isKeyDown("RIGHT") && xCar < width - 50) xCar += speed;
};

let enemies = [];

enemies[0] = {
  xE: 20,
  yE: -50
};

function draw() {
  theme.play()

  ctx.drawImage(bg, 0, 0, 600, 800);
  ctx.drawImage(car, xCar, yCar, 50, 50);
  for (let i = 0; i < enemies.length; i++) {
    ctx.drawImage(enemy, enemies[i].xE, enemies[i].yE, 50, 50);
    score++;
    enemies[i].yE += 5;

    if (enemies[i].yE == 50) {

      enemies.push({
        xE: Math.abs(Math.floor(Math.random() * width - 50)),
        yE: -50
      });
    }
    if (enemies[i].yE + 40 == yCar && enemies[i].xE + 40 <= xCar + 40 && xCar <= enemies[i].xE + 40 ||
      enemies[i].yE + 40 == yCar && enemies[i].xE + 40 >= xCar + 40 && enemies[i].xE <= xCar + 40 ||
      enemies[i].yE + 40 >= yCar && enemies[i].yE <= yCar + 40 && enemies[i].xE + 40 <= xCar + 40 && xCar <= enemies[i].xE + 40 ||
      enemies[i].yE + 40 >= yCar && enemies[i].yE <= yCar + 40 && xCar <= enemies[i].xE && enemies[i].xE <= xCar + 40) {

      location.reload();
    }
  }


  move();

  requestAnimationFrame(draw);
}

enemy.onload = draw;


