// tik tac toe
// Noah Lim
// Computer Science 30 
// Teacher: Mr. Schellenberg
// 2D Array project

let grid = createEmptyGrid(3, 3); // creates the 3X3 grid
let rows, cols, cellWidth, cellHeight;
 
// preload variables
let bgMusic; 
let clickSound;
let xImage;
let oImage;
let woodTile;
let accept;


let turns = 0; // turn tracker

let resetButton = false; //state variable for the reset button
let resetx; //x cor
let resety; //y cor
let resetw; //width
let reseth; //height
let resetCheck = false; // for the reset button to be toggled on the win screen

let startScreen = true; //state variable for the startScreen

let coopButton = false; //setup for the coop game mode button
let coopx;
let coopy;
let coopw;
let cooph;

let aiButton = false; //state variable for the ai game mode
let aix;
let aiy;
let aiw;
let aih;

let moved = false; // state variable for the ai to see if it needs to make a random move
let drawCondition = true; // makes sure that the last move on the board is not a draw before win is displayed


 
function preload() { //loads all the sounds and images in the game
  bgMusic = loadSound("assets/PeacefulScene.ogg"); 
  clickSound = loadSound("assets/pop.ogg");
  xImage = loadImage("assets/redX.png");
  oImage = loadImage("assets/circle.png");
  woodTile = loadImage("assets/woodTile.jpg");
  accept = loadSound("assets/Accept.mp3");
}
 
function setup() {
  let myCanvas = createCanvas(windowWidth * 0.8, windowHeight * 0.8); // makes array smaller and centers it on the screen
  myCanvas.position(windowWidth * 0.1, windowHeight * 0.1);

  //reset button placement 
  resetw = 150;
  reseth = 50;
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
  rows = grid.length; //setting value for the rows of array
  cols = grid[0].length; //setting value for the columns of the array
  cellWidth = width/cols;
  cellHeight = height/rows;
 
  
}
 
function draw() {

  if (startScreen){ // start screen code
    resetGrid();
    resetButton = false; 
    background(66, 135, 245);
    textAlign(CENTER, CENTER);
    textFont("Tahoma");
    textSize(50);
    fill("black");
    text("TIC TAC TOE!", width/2, height/2); //game title
    fill("black");
    rect(coopx, coopy, coopw, cooph, 30);
    rect(aix, aiy, aiw, aih, 30);
    textSize(28);
    fill("white");
    text("2P Mode", 475, 435); //text for the buttons
    text("AI Mode", 725, 435);
    text("Tic Tac Toe is a pretty boring game", width/2, 600);
    if (coopButton === true) { //starts the coop game mode
      startScreen = false;
    }
    if (aiButton === true) { //starts the ai game mode
      startScreen = false;
    }
  }

  if (coopButton === true) { //code for 2P game mode or coop game mode
    background(220);
    displayGrid();
    checkWinnerX();
    checkWinnerO();
    checkDraw();
    if (resetButton === true) { // resets the screen when reset button pressed
      clear();
      coopButton = false;
      startScreen = true;
    }
  }
  if (aiButton === true) { //code for ai mode
    background(220);
    displayGrid();
    checkWinnerX();
    checkWinnerO();
    checkDraw();
    checkForAiVert();
    checkForAiHor();
    checkForAiDiag();
    if (resetButton === true) { // resets the screen when reset button pressed
      clear();
      aiButton = false;
      startScreen = true;
    }
  }
}
 
function mousePressed() { // function that triggers when the mouse is pressed
  let x = Math.floor(mouseX / cellWidth); // setting x and y variables for the rest of the if statements
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
  if (mouseX > resetx && mouseX < resetx + resetw && mouseY > resety && mouseY < resety + reseth && resetCheck === true) { // reset
    accept.play();
    resetButton = !resetButton;
    turns = 0; //resets the turns
    resetCheck = false;
  }
  if (mouseX > coopx && mouseX < coopx + coopw && mouseY > coopy && mouseY < coopy + cooph && startScreen === true) { //coop mode
    accept.play();
    coopButton = !coopButton;
  }
  if (mouseX > aix && mouseX < aix + aiw && mouseY > aiy && mouseY < aiy + aih && startScreen === true) { // ai mode
    accept.play();
    aiButton = !aiButton;
  }

}
 
function toggleCellCoop(x, y) { // toggles boxes in the array for coop mode
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

function toggleCellAi(x, y) { // toggles the boxes in the array for ai mode
  //check that the coordinates are in the array
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0 && turns % 2 === 0) {
      grid[y][x] = 1; // only one if statement because there is only one player playing the game
    }
  }
}
 
 
function displayGrid() {
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      // rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      if (grid[y][x] === 0) {
        image(woodTile, x*cellWidth, y*cellHeight, cellWidth, cellHeight); // setting the tiles before pressed
      }
      if (grid[y][x] === 1 ) {
        image(xImage, x*cellWidth, y*cellHeight, cellWidth, cellHeight); // the x image is shown when the grid value is 1
      }
      if (grid[y][x] === 2) {
        image(oImage, x*cellWidth, y*cellHeight, cellWidth, cellHeight); // the O image is shown when the grid value is 1
      }
    }
  }
}
 
function createEmptyGrid(cols, rows) { // creates the initial empty grid
  let empty = [];
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}

function checkWinnerX() { //checks to see if green player has won 
  let winCondition = 0;

  //horizontal win check
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        winCondition ++; // counts the number of xs 
      }
    }
    if (winCondition === 3 ) { //checks for the win which triggers the win screen
      drawCondition = false;
      winScreenX();

    }
    else {
      winCondition = 0;
    }
  }
  //verticle win check
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 1){
        winCondition ++;
      }
    }
    if (winCondition === 3) {
      drawCondition = false;
      winScreenX();

    }
    else {
      winCondition = 0;
    }
  }
  //diagonal win check
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1 ) {
        drawCondition = false;
        winScreenX();
      }
      if(grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1) {
        drawCondition = false;
        winScreenX();
      }
    }
  }
}



function checkWinnerO() { //checks to see if blue player has won 
  let winCondition = 0;
  
  //horizontal
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 2) {
        winCondition ++;
      }
    }
    if (winCondition === 3 ) {
      drawCondition = false;
      winScreenO();

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
      drawCondition = false;
      winScreenO();

    }
    else {
      winCondition = 0;
    }
  }
  //diagonal 

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[0][0] === 2 && grid[1][1] === 2 && grid[2][2] === 2 ) {
        drawCondition = false;
        winScreenO();
      }
      else if(grid[0][2] === 2 && grid[1][1] === 2 && grid[2][0] === 2) {
        drawCondition = false;
        winScreenO();
      }
    }
  }
}

function winScreenX() { // displays the win for x
  background("green");
  resetCheck = true;
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  textSize(30);
  fill("black");
  text("X Wins!", width/2, height/2);
  fill("black");
  fill("white");
  rect(resetx, resety, resetw, reseth, 30);
  textAlign(CENTER,CENTER);
  fill("black");
  text("Go Home", 600, 435);
}

function winScreenO() { // displays the win for o
  background("green");
  resetCheck = true;
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  textSize(30);
  fill("black");
  text("O Wins!", width/2, height/2);
  fill("white");
  rect(resetx, resety, resetw, reseth, 30);
  textAlign(CENTER,CENTER);
  fill("black");
  text("Go Home", 600, 435);
}

function drawScreen() { // displays the draw
  background("grey");
  resetCheck = true;
  textAlign(CENTER, CENTER);
  textFont("Tahoma");
  textSize(30);
  fill("white");
  text("It's a Draw!", width/2, height/2);
  fill("white");
  rect(resetx, resety, resetw, reseth, 30);
  textAlign(CENTER,CENTER);
  fill("black");
  text("Go Home", 600, 435);
}


function checkDraw() { //checks for a draw in the game
  let drawCounter = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 1 || grid[y][x] === 2) {
        drawCounter ++;
      }
    }
  }
  if (drawCounter === 9 && drawCondition === true || turns === 9) { // makes sure that last turn is not a win
    drawScreen();
  }
}

function resetGrid() { // resets the grid when the rest button is pressed
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[y][x] === 2 || grid[y][x] === 1) {
        grid[y][x] = 0;
      }
    }
  }
}


function checkForAiVert() { // Code that decides if the AI should block a vertical win
  //vertical check
  for (let x = 0; x < grid.length; x++) {
    if (grid[0][x] === 1 && grid[1][x] === 1 && turns % 2 !== 0 && grid[2][x] !== 2) {
      grid[2][x] = 2;
      turns++;
      !moved;
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
  moved = false; // this variable is so that the ai only moves once and so that the random moves can be done if there is nothing to defend
}

function checkForAiHor() { //Code that decides if the AI should block a horizontal win
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

function checkForAiDiag() { //Code that decides if the AI should block a diagonal win or move randomly
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


  if ( turns % 2 !== 0 && moved === false) { // AI completes a random movement if there is nothing to block
    let value = 0;
    let randomY = ceil(random(0,2));
    let randomX = ceil(random(0,2));
    if (grid[randomY][randomX] === 0) { // makes sure that the space is a 0 or empty before moving
      turns++;
      grid[randomY][randomX] = 2;
    }
  }
  moved = false;
}
