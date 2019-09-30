let game = true;
let startingX;
let startingY;
let paddleWidth = 50;

function setup() {

  createCanvas(1000, 500);
  rectMode(CENTER);
  startingX = width / 2;
  startingY = height / 2;
  ball = new Ball(startingX, startingY, 25);
  p1 = new Paddle(50, startingY, 25, 50, 5);
  // noLoop();
}

// function mousePressed() {
//   loop();
// }

// function mouseReleased() {
//   noLoop();
// }

function stopGame() {
  game = false;
}

function draw() {
  background(204);
  line(500, 0, 500, 1000);
  frameRate(60);
  p1.move(mouseY);
  ball.create();
  ball.move(p1.getY());
}

class Game {
  constructor() {

  }

  create() {
    
  }
}


class Paddle {
  constructor(x, y, width, height, acceleration) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.acceleration = acceleration;
  }

  create() {
    rect(this.x, this.y, this.width, this.height)
  }
  move(Y) {
    rect(this.x, this.y, this.width, this.height)
  }
  getY() {
    return mouseY;
  }
  
}

class Ball {
 constructor(x, y, radius) {
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.acceleration = 5;
   this.xDirection = Math.round(Math.random()) * 2 - 1;
   this.yDirection = Math.round(Math.random()) * 2 - 1;
 }
  
  create() {
    circle(this.x, this.y, this.radius)
  }
  move(paddleOneY) {
    this.x = this.x + this.acceleration * this.xDirection;
    this.y = this.y + this.acceleration * this.yDirection;
    // if ((this.x > width - this.radius / 2 || this.x < this.radius / 2)) {
    if (this.x < this.radius / 2) {
      // this.xDirection *= -1;
      noLoop();
    }
    if (this.x > width - this.radius / 2) {
      this.xDirection *= -1;
      // noLoop();
    }
    if (this.y > height - this.radius / 2 || this.y < this.radius / 2) {
      this.yDirection *= -1;
    }
    if ((this.x < startingX - this.radius / 2) && this.y == paddleOneY) {
      this.xDirection *= -1;
      console.log("Ball y =" + this.y)
      console.log(paddleOneY)
    }
}
}