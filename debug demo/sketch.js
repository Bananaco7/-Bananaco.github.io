// player in grid


let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);

  rect(100, 100, mouseX, mouseY);
}


