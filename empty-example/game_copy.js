let game;
let startButton;
let playing;
let canvx, canvy;


function setup() {
  let cnv = createCanvas(1000, 500);
  canvx = (windowWidth - width) / 2;
  canvy = (windowHeight - height) / 2;
  cnv.position(canvx, canvy);
  rectMode(CENTER);
  fill(255)

  startButton = createButton('PLAY PONG');
  startButton.position(canvx + 500, canvy + 250);
  game = new Game(2);
  let playGame = game.playGame.bind(game);
  startButton.mousePressed(playGame);
  noLoop()
}


function draw() {
  background(0);
  textSize(32)
  text(game.getPlayerOneScore(), 100, 50);
  text(game.getPlayerTwoScore(), width - 100, 50);

  frameRate(60);
  if (playing) {
    game.playGame();
  }

}

class Game {
  constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
    this.startingX = width / 2;
    this.startingY = height / 2;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.ball = new Ball(this.startingX, this.startingY, 20);
    this.paddleOne = new Paddle(50, this.startingY, 25, 100, 5);
    this.paddleTwo = new Paddle(width - 50, this.startingY, 25, 100, 5);
    this.maxScore = 5;
    console.log(this.score);
  }

  getNumberOfPlayers() {
    return this.numberOfPlayers;
  }
  getStartingX() {
    return this.startingX;
  }
  getStartingY() {
    return this.startingY;
  }
  getPlayerOneScore() {
    return this.playerOneScore;
  }
  getPlayerTwoScore() {
    return this.playerTwoScore;
  }
  getBall() {
    return this.ball;
  }
  getPaddleOne() {
    return this.paddleOne;
  }
  getPaddleTwo() {
    return this.paddleTwo;
  }
  setPlayerOneScore(score) {
    this.playerOneScore = score;
  }
  setPlayerTwoScore(score) {
    this.playerTwoScore = score;
  }

  playerOneScored() {
    let score = this.playerOneScore + 1;
    game.setPlayerOneScore(score)
    if (this.playerOneScore == this.maxScore) {
      //playerOne wins
      playing = false;

    }
  }
  playerTwoScored() {
    let score = this.playerTwoScore + 1;
    game.setPlayerTwoScore(score)
    if (this.playerTwoScore == this.maxScore) {
      //playerTwo wins
      playing = false
    }
  }


  playGame() {
    loop()
    startButton.hide()
    this.ball.create()
    this.ball.move()
    this.paddleOne.move("arrows");
    this.paddleTwo.move("letters")
    playing = true;
    this.checkIfScored()
  }

  checkIfScored() {
    let ball = this.ball
    if (ball.getX() - ball.getRadius() / 2 < 0) {
      this.playerTwoScored();
      console.log(this.playerTwoScore)
      this.resetBall();
    }
    if (ball.getX() + ball.getRadius() /2  > width) {
      this.playerOneScored();
      console.log(this.playerOneScore)
      this.resetBall();
    }
  }
  resetBall() {
    this.ball = new Ball(this.startingX, this.startingY, 20);
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
  move(input) {
    if (input == "letters") {
      if (keyIsDown("115")) { this.y =  this.y + 10}
      if (keyIsDown(119)) { this.y = this.y - 10}
      rect(this.x, mouseY, this.width, this.height)
    } else if (input == "arrows") {
      if (keyIsDown(DOWN_ARROW)) { this.y =  this.y + 10}
      if (keyIsDown(UP_ARROW)) { this.y = this.y - 10}
      rect(this.x, this.y, this.width, this.height)
    }
  }
  getY() {
    return this.y;
  }
  getX() {
    return this.x
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getAcceleration() {
    return this.acceleration;
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

  getY() {
    return this.y;
  }
  getX() {
    return this.x
  }
  getRadius() {
    return this.radius;
  }
  getAcceleration() {
    return this.acceleration;
  }
  getXDirection() {
    return this.xDirection;
  }
  getYDirection() {
    return this.yDirection;
  }

    
  create() {
    circle(this.x, this.y, this.radius)
  }
  move() {
    this.x = this.x + this.acceleration * this.xDirection;
    this.y = this.y + this.acceleration * this.yDirection;
      
    //invert when ball hits y edge
    if (this.y > height - this.radius / 2 || this.y < this.radius / 2) {
      this.yDirection *= -1;
    }
    //invert when ball hits paddleOne
      // if ((this.x < game.getPaddleOne().getX() + this.radius) &&
      //     (this.x < game.getPaddleOne().getX() + game.getPaddleOne().getWidth()) &&
      //     (this.y = game.getPaddleOne().getY() + this.radius) &&
      //     (this.y = game.getPaddleOne().getY() + game.getPaddleOne().getHeight())) {
      //     console.log(this.y);  
      //   this.xDirection *= -1;
      // }
    if ((this.y < game.getPaddleOne().getY() + game.getPaddleOne().getHeight()/ 2) &&
        (this.y + game.getBall().getRadius() > game.getPaddleOne().getY() - game.getPaddleOne().getHeight() / 2) &&
        (this.x - game.getBall().getRadius() <  game.getPaddleOne().getX() + game.getPaddleOne().getWidth() / 2)) {
        
          this.xDirection *= -1;
    }

    if ((this.y < game.getPaddleTwo().getY() + game.getPaddleTwo().getHeight()/ 2) &&
        (this.y + game.getBall().getRadius() > game.getPaddleTwo().getY() - game.getPaddleTwo().getHeight() / 2) &&
        (this.x + game.getBall().getRadius() > game.getPaddleTwo().getX() - game.getPaddleTwo().getWidth() / 2)) {
        
          this.xDirection *= -1;
    }

    //invert when ball hits paddleTwo
      // if ((this.x > game.getPaddleTwo().getX() - this.radius) &&
      //     this.x > game.getPaddleTwo().getX() - game.getPaddleTwo().getWidth() &&
      //     this.y < game.getPaddleTwo.getY() + game.getPaddleTwo().getHeight() / 2) {
      //     // this.y + this.radius <= game.getPaddleTwo().getY()) {
            
      //   this.xDirection *= -1;
      // }
  }
}