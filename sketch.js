// various constatnts for the physics engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var knightImg, knight, bg;
var boxes = [];
var x = 0;
var Hour = 0;
var col;
var score = 0;

// Adding GameState
var gameState = "Aim";

// loading knight animation
function preload() {
    knightImg = loadAnimation("Assets/Knight/Idle (1).png", "Assets/Knight/Idle (2).png", "Assets/Knight/Idle (3).png", "Assets/Knight/Idle (4).png", "Assets/Knight/Idle (5).png");
    // loading the image of bg according to the current time 
    getTime();
}


function setup() {
    createCanvas(2500, 800);

    // setting the bg according to the timing 
    if (Hour >= 06 && Hour <= 19) {
        bg = loadImage("Assets/bg.jpg");
    } else
        bg = loadImage("Assets/bg2.jpg");

    engine = Engine.create();
    world = engine.world;

    // creating a ground
    ground = new Ground(width);
    // creating a sling
    sling = new Sling(150, 350);

    // creating a semi-pyramid of boxes using array
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= i; j++) {
            x = 184 * j;
            var box = new Box(1500 + x, 250);
            boxes.push(box);
        }
    }
    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= i; j++) {
            x = 184 * j;
            var box = new Box(600 + x, 325);
            boxes.push(box);
        }
    }

    platform1 = new Platform(2000, 500, 184 * 4);
    platform2 = new Platform(1000, 650, 184 * 3);

    // creating a knight
    knight = createSprite(120, 580);
    knight.addAnimation("knightImg", knightImg);
    knight.scale = 0.5;

    // creating the fireball
    ball = new Ball();

    // creating a rubber band
    rubber = new Rubber(ball.body, {
        x: 190,
        y: 375
    });

    Engine.run(engine);
}

function draw() {
    // mapping the hours of day to the amount of black shade in the game
    col = map(Hour, 06, 19, 255, 30);
    tint(col);
    background(bg);
    Engine.update(engine);

    tint(col + 50);
    // displaying knight
    drawSprites();

    ground.show();
    // displaying the elements of array
    platform1.show();
    platform2.show();

    for (var t = 0; t < boxes.length; t++) {
        if (boxes[t].body.speed < 25) {
            boxes[t].show();
        } else {
            boxes[t].invisible(boxes[t].body);
        }
        boxes[t].score();
    }

    ball.show();
    rubber.show();
    sling.show();

    if (gameState != "launched") {
        if (mouseIsPressed) {
            Body.setPosition(ball.body, {
                x: mouseX,
                y: mouseY
            });
        }
    }

    noStroke();
    textSize(35);
    fill(255);
    text("Score : " + score, width - 300, 50);
}

// relesing the ball from the sling
function mouseReleased() {
    rubber.rubber.bodyA = null;
    gameState = "launched";
}

// reloading the sling with a ball
function keyPressed() {
    if (keyCode == 32) {
        rubber.rubber.bodyA = ball.body;
        Body.setPosition(ball.body, {
            x: 150,
            y: 350
        });
        gameState = "Aim";
    }
}

// using API to get current time of Asia, Kolkata
async function getTime() {
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    Hour = datetime.slice(11, 13);
}