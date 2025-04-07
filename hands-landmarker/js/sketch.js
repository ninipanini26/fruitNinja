 let hand_results;
let cam = null;
let fruits;
//let bombs;
let slicingFruit;
let bombSound;
let woosh;
let bombUp;
let p5canvas = null;
var bakgroundImage;
var slicedWatermelon;
let points;
let gravity; //gravity force
let force;
let lastFruitTime = 0; 
let lastBombTime = 0;
let bombHitTime = null; 
let flashDuration = 3000;
let font;
let prevX = null;
let prevY = null;
let interval, startTime, seconds, minutes, time, remainingTime;


function preload(){
backgroundImage=loadImage('background.jpg');
slicedWatermelon = loadImage('slicedWatermelon.png');
}

function setup() {
 //p5canvas.parent('#canvas');
  p5canvas = createCanvas(displayWidth+100, displayHeight);
    imageMode(CENTER);
  //  backgroundImage.resize(displayWidth+500, displayHeight);
    slicedWatermelon.resize(100,100);
    

    fruits = []; 
    bombs = [];
    fruits.push(new Fruit());
    //bombs.push(new Bomb());
    console.log(fruits);
    gravity = createVector(0,0.1);
    force = createVector(0, 0.2);
    
    points = 0;
    
     font = loadFont('font.ttf');
    
     startTime = millis();
     interval = 120000;
    
     slicingFruit = loadSound("slicingFruit.mp3");
    
     bombSound = loadSound("bomb.mp3");
    
     woosh = loadSound("woosh.mp3");
    
     bombUp = loadSound("bombUp.mp3");
    

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


function draw() {
 background(255);
imageMode(CENTER);
image(backgroundImage, displayWidth*0.5, displayHeight*0.5);
  if (cam) {
   image(cam, displayWidth-100, 0, displayWidth * 0.75, displayHeight * 0.75);

  }
    
//add new fruit every 3 seconds
if (millis() - lastFruitTime > 2000) {
fruits.push(new Fruit());
    if (!woosh.isPlaying()) {
        woosh.play();
    }
lastFruitTime = millis();  
  }

//add new bomb every 10 seconds
if (millis() - lastBombTime > 10000) {
bombs.push(new Bomb());
  if (!bombUp.isPlaying()) {
        bombUp.play();
    }
lastBombTime = millis();  
  }
    
 for (let p = fruits.length - 1; p >= 0; p--) {
    fruits[p].applyForce(force);
    fruits[p].applyGravity(gravity);
    fruits[p].update();
    fruits[p].display();  
   fruits[p].checkEdges();
let outOfBounds = fruits[p].checkEdges();  
    if(outOfBounds){
  //  fruits[p] = null;
   //fruits.push(new Fruit());
    fruits.splice(p, 1);  
    }
    else if(outOfBounds && points>0){
     points-=1;    
    }

  }
 
 for (let j = bombs.length - 1; j >= 0; j--) {
    bombs[j].applyForce(force);
    bombs[j].applyGravity(gravity);
    bombs[j].update();
    bombs[j].display();  
   bombs[j].checkEdges();
let outOfBounds = bombs[j].checkEdges();  
    if(outOfBounds){
  //  fruits[p] = null;
   //fruits.push(new Fruit());
    bombs.splice(j, 1);    
   console.log(bombs); 
}
  }
stroke(0);
strokeWeight(4);
textFont(font);
textSize(64);
fill(255);
image(slicedWatermelon, width/24+25, height/12-15);
text(":" + points, width/24+75, height/12);
    
  remainingTime = interval - (millis() - startTime);

  if (remainingTime < 0) {
    remainingTime = 0;
  }
  
  minutes = Math.floor(remainingTime / 60000);
  seconds = Math.floor((remainingTime % 60000) / 1000);

  text(minutes + ":" + nf(seconds, 2), width / 24-25, height / 12 + 100);
     
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
    // Check if the index finger tip (landmark 8) exists
    if (landmarks.length > 8) {
      let x = landmarks[8].x * displayWidth * 0.5;
      let y = landmarks[8].y * displayHeight * 0.5;

      // Draw a circle only at the index finger tip
      noStroke();
      circle(x, y, 20);
        
     if (prevX !== null && prevY !== null) {
        stroke(255); 
        strokeWeight(4);
        line(prevX, prevY, x, y); 
         
    
      }
        noStroke();
      prevX = x;
      prevY = y;
    }
  }

    }
if (prevX !== null && prevY !== null) {
  for (let p = fruits.length - 1; p >= 0; p--) {
    let fruit = fruits[p];
    let fruitWidth = fruit.WatermelonFull.width;
    let fruitHeight = fruit.WatermelonFull.height;

    let fruitRadius = Math.max(fruitWidth, fruitHeight) / 2;
    let d = dist(prevX, prevY, fruit.position.x, fruit.position.y);
    if (d < fruitRadius) {
      fruits.splice(p, 1); 
      points += 1;
        //fix this add slicing audio instead
         slicingFruit.play();
      text("NICE!!!", width/2, height/2);
        
    }
  }
for (let j = bombs.length - 1; j >= 0; j--) {
  let bomb1 = bombs[j];
  let bombWidth = bomb1.bomb.width;
  let bombHeight = bomb1.bomb.height;
  let bombRadius = Math.max(bombWidth, bombHeight) / 2;
  let g = dist(prevX, prevY, bomb1.position.x, bomb1.position.y);

  if (g < bombRadius) {
    bombs.splice(j, 1);
    points -= 10;
    bombHitTime = millis(); 
      //add bomb sound 
    bombSound.rate(1.5);
    bombSound.play();
  }
}


if (bombHitTime !== null) {
  if (millis() - bombHitTime < flashDuration) {
    background(255); 
  } else {
    bombHitTime = null; 
  }
}

}
}