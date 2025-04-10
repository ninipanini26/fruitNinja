class Fruit {
    constructor() {
        this.position = createVector(random(width/2), height/4); 
        this.velocity = createVector(0, -5);
        this.acceleration = createVector(0, 0);
        this.mass = random(5, 10);
        this.offScreen = false; 
        this.WatermelonFull = loadImage('watermelon.png');
        this.PomegranateFull = loadImage('PomegranateFull2.png');
        this.PineappleFull = loadImage('PineappleFull.png');
        this.angle = 0; 
        this.num =random(0, 3);
        //this.angle = 0.000000005;
        //idk why resize isn't working ToT 
        //  this.PomegranateFull.resize(50,0);
    }

    applyForce(force) {
    let f = force.div(this.mass); // Divide by mass
      this.acceleration.add(f);  // Add to acceleration
    }
    
    applyGravity(gravity){
        this.acceleration.add(gravity);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);  
        this.acceleration.mult(0);  // Clear acceleration
        this.angle += random(0.005, 0.05); 
    }

    display() {
       // image(this.WatermelonFull, this.position.x, this.position.y); 
        //console.log(this.WatermelonFull.this.position.y);
        
        
         push();  
        translate(this.position.x, this.position.y); 
        rotate(this.angle);
       // imageMode(CENTER);  
        if(this.num <= 1){
          image(this.WatermelonFull, 0, 0);     
        }else if(this.num>=1 && this.num<=2){
            image(this.PomegranateFull, 0,0);
        }else{
            image(this.PineappleFull, 0,0);
        }
       
        pop();  
        
        
    
    }

    checkEdges(){
    //console.log(this.position.y);
        if(this.position.y > 1000){
            this.offScreen = true;
        }return this.offScreen; 
    } 
}

    
    
