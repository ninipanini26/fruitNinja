class Fruit {
    constructor() {
        this.position = createVector(random(width), height/4); 
        this.velocity = createVector(0, -5);
        this.acceleration = createVector(0, 0);
        this.mass = random(5, 10);
        this.WatermelonFull = loadImage('watermelon.png');
        this.PomegranateFull = loadImage('PomegranateFull.png');
        this.angle = 0; 
        this.num =random(0, 2);
        //this.angle = 0.000000005;
          this.PomegranateFull.resize(100,100);
    }

    applyForce(force) {
    let f = force.div(this.mass); // Divide by mass
      this.acceleration.add(f);  // Add to acceleration
    }
    
    applyGravity(gravity){
        this.acceleration.add(gravity