// Bouncing Balls
// Array Demo
// Jan 19th 2021

let theBouncingBalls = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  moveBall();
  displayBall();
}

function mousePressed(){
  let ball = {
    x: mouseX,
    y: mouseY,
    diameter: random(25,100),
    dx: random(-5, 5),
    dy: random(-5, 5),
    theColor: color(random(255), random(255), random(255), random(255)),
  };
  theBouncingBalls.push (ball);
}


function moveBall(){
  for (let ball of theBouncingBalls) {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    if (ball.x + ball.diamter/2 >= width || ball.x - ball.diamter/2 <= 0){
      ball.x = ball.x * -1;
    }

    if (ball.y - ball.diamter/2 <= 0 ||ball.y + ball.diamter/2 >= height ){
      ball.y = ball.y * -1;
    }
  }
}


function displayBall(){
  for (let i=0; i<theBouncingBalls.length; i++){
    noStroke();
    fill(theBouncingBalls[i].theColor)
    ellipse(theBouncingBalls[i].x, theBouncingBalls[i].y, theBouncingBalls[i].diameter, theBouncingBalls[i].diameter);
  }
}