
let ball;
let p1;
let acceleration = 5;
let radius = 20;
let startingX;
let startingY;
let xd = 1;
let game = false;



function setup() {
  createCanvas(1000, 500);
  noLoop();
  rectMode(CENTER);
  ellipseMode(RADIUS);
  game = true;
  startingX = width / 2;
  startingY = height / 2;
  ball = new Ball(startingX, startingY / 2, radius, acceleration);
  p1 = new Paddle(50, startingY, 25, 50, 1);

  while (game) {
    draw()
  }
}

function draw() {
  background(204);
  line(500, 0, 500, 1000);
  frameRate(60);
  p1.move();
  ball.create();
  ball.move();

}

//create Game class

class Ball {
  constructor(x, y, radius, acceleration) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.acceleration = acceleration;
    this.yDirection = 1;
  }

  create() {
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  move() {

    this.x = this.x + acceleration * xd;
    this.y = this.y + acceleration * this.yDirection;
    if ((this.x > width - radius || this.x < this.radius)) {
      xd *= -1;
    }
    if (this.y > height - radius || this.y < this.radius) {
      this.yDirection *= -1;
    }

    if (this.x < (p1.getX() + p1.getWidth()) - this.radius) {
      xd *= -1;
    }
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

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }

  move() {
    rect(this.x, mouseY * this.acceleration, this.width, this.height)
  }
}

