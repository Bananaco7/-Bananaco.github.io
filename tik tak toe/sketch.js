//tik tak toe

let grid = createEmptyGrid(3, 3);
let rows, cols, cellWidth, cellHeight;

let bgMusic; 
let clickSound;
let xImage;
let turns = 0;

function preload() {
  bgMusic = loadSound("assets/background.mp3");
  clickSound = loadSound("assets/clickSound.wav");
  xImage = loadImage("assets/x.png");
}

function setup() {
  let myCanvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  myCanvas.position(windowWidth * 0.1, windowHeight * 0.1);
  bgMusic.loop();
  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;

  
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === 0) { // only makes a sound when in the grid
    clickSound.play();
    turns += 1;
  }
  if (turns > 3) {
    checkWinner();
  }
}

function toggleCell(x, y) {
  //check that the coordinates are in the array
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}


function displayGrid() {
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      
      }
      if (grid[y][x] === 1) {
        fill("green");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
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

function checkWinner() {
  let winCondition = 0;
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      if (grid[y][x] === 1) {
        winCondition++;
      }
    }
    if (winCondition === 3) {
      console.log("you win");
    }
    else {
      winCondition = 0;
    }
  }
}