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

let scoresCounter = document.getElementById('score');
let levelCounter = document.getElementById('level');
let width = cvs.width;
let height = cvs.height;

let bg = new Image();
let car = new Image();
let enemy = new Image();

let speed = 7;

let xCar = width / 2 - 25;
let yCar = height - 50;

let scores = 0;
let enemiesSpd = 3;
let level=1;
let intervalReaspawnEnemies = 500;

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

setInterval(function() {

  enemies.push({
    xE: Math.abs(Math.floor(Math.random() * width - 50)),
    yE: -40
  });
}, intervalReaspawnEnemies) 

function draw() {
  // theme.play()
  scoresCounter.innerHTML = scores;
  levelCounter.innerHTML=level;

  console.log(enemiesSpd);
  ctx.drawImage(bg, 0, 0, 600, 800);
  ctx.drawImage(car, xCar, yCar, 50, 50);
  for (let i = 0; i < enemies.length; i++) {
    ctx.drawImage(enemy, enemies[i].xE, enemies[i].yE, 50, 50);
    scores++;
    if (scores % 5000 === 0){
      enemiesSpd += 1;
    level++};
    enemies[i].yE += enemiesSpd;
    intervalReaspawnEnemies+20;  
    
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


