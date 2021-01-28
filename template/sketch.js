// player in grid

const ROWS = 20;
const COLS = 20;
let grid, cellWidth, cellHeight;


function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;
}

function draw() {
  background(220);
  displayGrid();
}


function displayGrid() {
  for (let y = 0; y<ROWS; y++) {
    for (let x = 0; x<COLS; x++) {
      if (grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x] === 9) {
        fill("red");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let empty = [];
  for (let y  = 0; y < rows; y++) {
    empty.push([]);
    for (let x = 0; x < cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}