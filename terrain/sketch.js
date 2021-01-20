// perlin noise

let rectHeights;
let bikeLocation = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectHeights = generateHeights();
}

function draw() {
  background(220);
  fill("black")
  let howMany = 100;
  for (let i = bikeLocation; i < bikeLocation + howMany; i ++){
    let rectWidth = width / howMany;
    rect(rectWidth * (i - bikeLocation), height-rectHeights[i], rectWidth, rectHeights[i])
  }

  if (keyIsPressed){
    if (key === "d"){
      bikeLocation ++;
    }
    if (key === "a"){
      bikeLocation -= 5;
    }
  }

}

function generateHeights() {
  let theHeights = [];
  for (let i = 0; i < 5000; i ++){
    let rectHeights = noise(i*0.00001) * height;
    theHeights.push(rectHeights);
  }
  return theHeights;

}