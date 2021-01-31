// Noah Lim
//2D Array assignment
//platformer game

const ROWS = 15;
const COLS = 15;
let grid, cellWidth, cellHeight;
let playerX = 0; 
let playerY = 0; 
let someMaze;
let playerImg, wallImg, grassImg, keyIMG;
let coinScore = 0;
let px; 
let py;
let dx = - 1;
let dy = 1;

function preload() {
  background
  someMaze = loadJSON("assets/mymaze.json");
  playerImg = loadImage("assets/character.png");
  wallImg = loadImage("assets/00.png");
  grassImg = loadImage("assets/gras.png");
  keyIMG = loadImage("assets/secret_key.png");
  gameBackground = loadImage("assets/ominous.jpg");
}

function setup() {
  let myCanvas = createCanvas(windowWidth*0.8, windowHeight*0.8);
  myCanvas.position(windowWidth*0.1, windowHeight*0.1);
  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;
  //add player to grid
  grid[playerY][playerX] = 9;
}

function draw() {
  background(220);
  displayGrid();
  scoreBoard();
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 0) { //if empty
    grid[y][x] = 1;     
  }
  else if (grid[y][x] === 1) { //if wall
    grid[y][x] = 2;       
  }
  else if (grid[y][x] === 2) { //if key 
    grid[y][x] = 0;    
  }
}

function keyPressed() {
  if (key === "d") {
    movePlayer(playerX+1, playerY, playerX, playerY, "right");
  }
  if (key === "a") {
    movePlayer(playerX-1, playerY, playerX, playerY, "left");
  }
  if (key === "s") {
    movePlayer(playerX, playerY+1, playerX, playerY, "down");
  }
  if (key === "w") {
    movePlayer(playerX, playerY-1, playerX, playerY, "up");
  }
  if (key === "m") {
    grid = someMaze;
  }
  if (key === "g") {
    playerY = playerY + dy;
    playerX = playerX + dx;
  }
}

function movePlayer(x, y, oldX, oldY, direction) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS && grid[y][x] !== 1) {
    if (grid[y][x] === 2) {
      coinScore += 1;
    }
    grid[y][x] = 9; //new player location
    grid[oldY][oldX] = 0; //remove player from old spot

    if (direction === "right") {
      playerX += 1;
    }
    if (direction === "left") {
      playerX -= 1;
    }
    if (direction === "down") {
      playerY += 1;
    }
    if (direction === "up") {
      playerY -= 1;
    }
  }
}

function displayGrid() { //allows for the display of images when the value of square is changed by the mousePressed function
  image(gameBackground, 0, 0, width, height);

  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      // if (grid[y][x] === 0) {
      //   // fill("white");
      //   image(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      // }

      if (grid[y][x] === 1) {
        image(wallImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 2) {
        image(keyIMG, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {

        image(playerImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      // rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let empty = [];
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}


function scoreBoard(){ // displays player score
  
  text("Coins: " + coinScore, 350, 325)
  text(playerX, 500, 325)
}

