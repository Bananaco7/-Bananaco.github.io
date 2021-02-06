//tik tac toe

let grid = createEmptyGrid(3, 3);
let rows, cols, cellWidth, cellHeight;
 
let bgMusic; 
let clickSound;
let xImage;
let turns = 0;
let aiTurns = 0;

let resetButton = false; //setup for the reset button
let resetx; //x cor
let resety; //y cor
let resetw; //width
let reseth; //height

let startScreen = true; //state variable for the startScreen

let coopButton = false; //setup for the coop game mode button
let coopx;
let coopy;
let coopw;
let cooph;

let aiButton = false;
let aix;
let aiy;
let aiw;
let aih;

let horWin = false; // allows the ai to know when the player is 1 move away from winning horizontally
let vertWin = false;
let leftDiagWin = 0;
let rightDiagWin = 0;
let moved = false;


 
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

  //COOP player button placement
  coopw = 150;
  cooph = 50;
  coopx = 400;
  coopy = (windowHeight * 0.8)/2 + 50;

  //AI game mode button placement
  aiw = 150;
  aih = 50;
  aix = 650;
  aiy = (windowHeight * 0.8)/2 + 50;

  bgMusic.loop();
  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;
 
  
}
 
function draw() {

  if (startScreen){
    resetGrid();
    resetButton = false;
    background(66, 135, 245);
    textAlign(CENTER, CENTER);
    textFont("Tahoma");
    textSize(50);
    fill("black");
    text("TIK TAK TOE!", width/2, height/2);
    fill("black");
    rect(coopx, coopy, coopw, cooph);
    rect(aix, aiy, aiw, aih);
    if (coopButton === true) {
      startScreen = false;
    }
    if (aiButton === true) {
      startScreen = false;
    }
  }

  if (coopButton === true) {
    background(220);
    displayGrid();
    checkWinnerGreen();
    checkWinnerBlue();
    checkDraw();
    if (resetButton === true) {
      clear();
      coopButton = false;
      startScreen = true;
    }
  }
  if (aiButton === true) {
    background(220);
    displayGrid();
    checkWinnerGreen();
    checkWinnerBlue();
    checkDraw();
    checkForAiVert();
    checkForAiHor();
    checkForAiDiag();
    if (resetButton === true) {
      clear();
      aiButton = false;
      startScreen = true;
    }
  }
}
 
function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === 0 && coopButton === true) { // only makes a sound when in the grid
    clickSound.play();
    toggleCellCoop(x, y); 
    turns += 1; //keeps count of the turns 
  }

  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === 0 && aiButton === true && turns % 2 === 0) { // only makes a sound when in the grid
    clickSound.play();
    toggleCellAi(x, y);
    turns ++; //keeps count of the turns 
  }

  // code for the button presses
  if (mouseX > resetx && mouseX < resetx + resetw && mouseY > resety && mouseY < resety + reseth) { // reset
    resetButton = !resetButton;
  }
  if (mouseX > coopx && mouseX < coopx + coopw && mouseY > coopy && mouseY < coopy + cooph) { //coop mode
    coopButton = !coopButton;
  }
  if (mouseX > aix && mouseX < aix + aiw && mouseY > aiy && mouseY < aiy + aih) { // ai mode
    aiButton = !aiButton;
  }

}
 
function toggleCellCoop(x, y) {
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

function toggleCellAi(x, y) {
  //check that the coordinates are in the array
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0 && turns % 2 === 0) {
      grid[y][x] = 1;
      console.log("yes");
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
    if (winCondition === 2) {
      vertWin = true;
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
      if (grid[0][0] === 1 && grid[1][1] === 1) {
        leftDiagWin = 1;
      }
      if (grid[1][1] === 1 && grid[2][2] === 1 ) {
        leftDiagWin = 2;
      }
      if (grid[0][0] === 1 && grid[2][2] === 1) {
        leftDiagWin = 3;
      }
      if (grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1 ) {
        winScreenGreen();
      }


      if (grid[0][2] === 1 && grid[1][1] === 1) {
        rightDiagWin = 1;
      }
      if (grid[1][1] === 1 && grid[2][0] === 1 ) {
        rightDiagWin = 2;
      }
      if (grid[0][2] === 1 && grid[2][0] === 1) {
        rightDiagWin = 3;
      }
      if(grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1) {
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


function checkForAiVert() {
    //vertical check
  for (let x = 0; x < grid.length; x++) {
    if (grid[0][x] === 1 && grid[1][x] === 1 && turns % 2 !== 0 && grid[2][x] !== 2) {
      grid[2][x] = 2;
      turns++;
      !moved;
      console.log("hello");
    }
    if (grid[1][x] === 1 && grid[2][x] === 1 && turns % 2 !== 0 && grid[0][x] !== 2) {
      grid[0][x] = 2;
      turns++;
      !moved;
    }
    if (grid[0][x] === 1 && grid[2][x] === 1 && turns % 2 !== 0 && grid[1][x] !== 2) {
      grid[1][x] = 2;
      turns++;
      !moved;
    }
  }
  moved = false;
}

function checkForAiHor() {
  //horizontal check
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][0] === 1 && grid[y][1] === 1 && turns % 2 !== 0 && grid[y][2] !== 2) {
      grid[y][2] = 2;
      turns++;
      !moved;
    }
    if (grid[y][1] === 1 && grid[y][2] === 1 && turns % 2 !== 0 && grid[y][0] !== 2) {
      grid[y][0] = 2;
      turns++;
      !moved;
    }
    if (grid[y][0] === 1 && grid[y][2] === 1 && turns % 2 !== 0 && grid[y][1] !== 2) {
      grid[y][1] = 2;
      turns++;
      !moved;
    }
  }
  moved = false;
}

function checkForAiDiag() {
  //diagonal check from top left
  if (grid[0][0] === 1 && grid[1][1] === 1 && turns % 2 !== 0 && grid[2][2] !== 2) {
    grid[2][2] = 2;
    turns++;
    !moved;
  }
  if (grid[1][1] === 1 && grid[2][2] === 1 && turns % 2 !== 0 && grid[0][0] !== 2) {
    grid[0][0] = 2;
    turns++;
    !moved;
  }
  if (grid[0][0] === 1 && grid[2][2] === 1 && turns % 2 !== 0 && grid[1][1] !== 2) {
    grid[1][1] = 2;
    turns++;
    !moved;
  }

  //diagonal check from top right
  if (grid[0][2] === 1 && grid[1][1] === 1 && turns % 2 !== 0 && grid[2][0] !== 2) {
    grid[2][0] = 2;
    turns++;
    !moved;
  }
  if (grid[1][1] === 1 && grid[2][0] === 1 && turns % 2 !== 0 && grid[0][2] !== 2) {
    grid[0][2] = 2;
    turns++;
    !moved;
  }
  if (grid[0][2] === 1 && grid[2][0] === 1 && turns % 2 !== 0 && grid[1][1] !== 2) {
    grid[1][1] = 2;
    turns++;
    !moved;
  }


  if ( turns % 2 !== 0 && moved === false) {
    turns++;
    grid[ceil(random(0,2))][ceil(random(0,2))] = 2
    console.log("it works");
  }
  moved = false;
}
