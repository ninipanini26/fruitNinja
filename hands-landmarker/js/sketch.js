let hand_results;
let cam = null;
let fruits;
let p5canvas = null;
var bakgroundImage;
let gravity; //gravity force
let force;
let lastFruitTime = 0; 

function preload(){
backgroundImage=loadImage('background.jpg');
}

function setup() {
 //p5canvas.parent('#canvas');
  p5canvas = createCanvas(displayWidth, displayHeight);
    imageMode(CENTER);
    backgroundImage.resize(displayWidth, displayHeight);

    fruits = []; 
    fruits.push(new Fruit());
    console.log(fruits);
    gravity = createVector(0,0.1);
    force = createVector(0, 0.2);

  // When hands are found, the following function is called. The detection results are stored in results
  gotHands = function (results) {
    hand_results = results;
  }
}

function startWebcam() {
  if (window.setCameraStreamToMediaPipe) {
    cam = createCapture(VIDEO);
    cam.hide();
    cam.elt.onloadedmetadata = function () {
      window.setCameraStreamToMediaPipe(cam.elt);
    }

  }
    
}

//console.log(hand_results.landmarks);

function draw() {
 background(255);
//imageMode(CENTER);
image(backgroundImage, displayWidth*0.5, displayHeight*0.5);
  if (cam) {
   image(cam, displayWidth-100, 0, displayWidth * 0.75, displayHeight * 0.75);

  }
//add new fruit every 5 seconds
if (millis() - lastFruitTime > 5000) {
fruits.push(new Fruit());
lastFruitTime = millis();  
  }
    
  for (let p in fruits){
    fruits[p].applyForce(force);
    fruits[p].applyGravity(gravity);
    fruits[p].update();
    fruits[p].display();  
  }
    
    //MediaPipe Hand Indexes!!! (got from website)
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],    // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8],    // Index Finger
  [0, 9], [9, 10], [10, 11], [11, 12], // Middle Finger
  [0, 13], [13, 14], [14, 15], [15, 16], // Ring Finger
  [0, 17], [17, 18], [18, 19], [19, 20], // Pinky Finger
  [5, 9], [9, 13], [13, 17]   // Palm connections
];

if (hand_results && hand_results.landmarks) {
  for (const landmarks of hand_results.landmarks) {
    // Draw circles at each landmark
    for (let i = 0; i < landmarks.length; i++) {
      let x = landmarks[i].x * displayWidth * 0.5;
      let y = landmarks[i].y * displayHeight * 0.5;

      noStroke();
      fill(0);
      circle(x, y, 10);
    }

    // Draw proper hand connections
    stroke(0);
    strokeWeight(2);
    for (let [start, end] of HAND_CONNECTIONS) {
      let x1 = landmarks[start].x * displayWidth * 0.5;
      let y1 = landmarks[start].y * displayHeight * 0.5;
 