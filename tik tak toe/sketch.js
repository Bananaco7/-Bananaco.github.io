//tik tak toe

let grid = createEmptyGrid(3, 3);
let rows, cols, cellWidth, cellHeight;
 
let bgMusic; 
let clickSound;
let xImage;
let turns = 0;
let resetButton = true;
let resetx; 
let resety;
let resetw;
let reseth;
let startScreen = true;
let coopButton = false;
let coopx = 600;
let coopy = 200;
let coopw = 100;
let cooph = 75;


 
function preload() {
  bgMusic = loadSound("assets/background.mp3");
  clickSound = loadSound("assets/clickSound.wav");
  xImage = loadImage("assets/x.png");
}
 
function setup() {
  let myCanvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  myCanvas.position(windowWidth * 0.1, windowHeight * 0.1);

  //reset button placement 
  resetw = 100;
  reseth = 75;
  resetx = (windowWidth * 0.8)/2 - resetw/2;
  resety = (windowHeight * 0.8)/2 + 50;

  bgMusic.loop();
  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;
 
  
}
 
function draw() {

  if (startScreen){
    resetGrid();
    resetButton = true;
    background(66, 135, 245);
    textAlign(CENTER, CENTER);
    textFont("Tahoma");
    textSize(50);
    fill("black");
    text("TIK TAK TOE!", width/2, height/2);
    fill("black");
    rect(coopx, coopy, coopw, cooph);
    if (coopButton === true) {
      startScreen = false;
    }
    
  }
  if (startScreen !== true) {
    background(220);
    displayGrid();
    checkWinnerGreen();
    checkWinnerBlue();
    checkDraw();
    if (resetButton === false) {
      clear();
      coopButton = false;
      startScreen = true;
      console.log("did");
    }
  }
}
 
function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  resetw = 100;
  reseth = 75;
  resetx = (windowWidth * 0.8)/2 - resetw/2;
  resety = (windowHeight * 0.8)/2 + 50;

 
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === 0) { // only makes a sound when in the grid
    clickSound.play();
    turns += 1;
  }
  toggleCell(x, y);  

  if (mouseX > resetx && mouseX < resetx + resetw && mouseY > resety && mouseY < resety + reseth) {
    resetButton = !resetButton;
  }
  if (mouseX > coopx && mouseX < coopx + coopw && mouseY > coopy && mouseY < coopy + cooph) {
    coopButton = !coopButton;
  }
}
 
function toggleCell(x, y) {
  //check that the coordinates are in the array
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0 && turns % 2 !== 0) {
      grid[y][x] = 1;
    }
    if (grid[y][x] === 0 && turns % 2 === 0) {
      grid[y][x] = 2;
    }
  }
}
 
 
function displayGrid() {
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      
      }
      if (grid[y][x] === 1 ) {
        fill("green");
      }
      if (grid[y][x] === 2) {
        fill("blue");
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

function checkWinnerGreen() { //checks to see if green player has won 
  let winCondition = 0;
  let diagCount = 0; //counter for the diagonal function
  
  //horizontal
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        winCondition ++;
      }
    }
    if (winCondition === 3 ) {
      winScreenGreen();

    }
    else {
      winCondition = 0;
    }
  }
  //verticle
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 1){
        winCondition ++;
      }
    }
    if (winCondition === 3) {
      winScreenGreen();

    }
    else {
      winCondition = 0;
    }
  }
  //diagonal 
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1 ) {
        winScreenGreen();
      }
      else if(grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1) {
        winScreenGreen();
      }
    }
  }
}



function checkWinnerBlue() { //checks to see if blue player has won 
  let winCondition = 0;
  let diagCount = 0; //counter for the diagonal function
  
  //horizontal
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 2) {
        winCondition ++;
      }
    }
    if (winCondition === 3 ) {
      winScreenBlue();

    }
    else {
      winCondition = 0;
    }
  }
  //verticle
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 2){
        winCondition ++;
      }
    }
    if (winCondition === 3) {
      winScreenBlue();

    }
    else {
      winCondition = 0;
    }
  }
  //diagonal 
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 2 ) {
        winScreenBlue();
      }
      else if(grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 2) {
        winScreenBlue();
      }
    }
  }
}

function winScreenGreen() {
  background("green");
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  textSize(30);
  fill("black");
  text("Green Wins!", width/2, height/2);
  fill("black");
  fill("white");
  rect(resetx, resety, resetw, reseth);
}

function winScreenBlue() {
  background("green");
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  textSize(30);
  fill("black");
  text("Blue Wins!", width/2, height/2);
  fill("white");
  rect(resetx, resety, resetw, reseth);
}

function drawScreen() {
  background("black");
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  textSize(30);
  fill("white");
  text("It's a Draw!", width/2, height/2);
  fill("white");
  rect(resetx, resety, resetw, reseth);
}


function checkDraw() {
  let drawCounter = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 1 || grid[y][x] === 2) {
        drawCounter ++;
      }
    }
  }
  if (drawCounter === 9) {
    drawScreen();
  }
}

function resetGrid() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 2 || grid[y][x] === 1) {
        grid[y][x] = 0;
      }
    }
  }
}
