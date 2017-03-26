//Aliases
let Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;

let stage = new Container(),
    renderer = autoDetectRenderer(400, 600);
document.body.appendChild(renderer.view);

loader
    .add("images/platform1.png")
    .add("images/platform2.png")
    .add("images/ball.png")
    .load(setup);

//Define any variables that are used in more than one function
let platformMy = createObject("images/platform1.png");
let platformEnemy = createObject("images/platform2.png");
let ball = createObject("images/ball.png");
let time_game = 0;

function setup() {

    platformMy.image.x = 90;
    platformMy.image.y = 540;
    stage.addChild(platformMy.image);

    platformEnemy.image.x = 40;
    platformEnemy.image.y = 90;
    stage.addChild(platformEnemy.image);

    ball.image.y = platformMy.image.y - ball.image.height;
    ball.image.x = platformMy.image.x + 30;
    ball.state = 0;
    ball.vectorMove = {};
    ball.vectorMove.x = 0;
    ball.vectorMove.y = 0;
    stage.addChild(ball.image);

    let left = keyboard(37),
        space = keyboard(32),
        right = keyboard(39);

    //Left arrow key `press` method
    left.press = function() {
        platformMy.image.vx = -5;
    };
    //Left arrow key `release` method
    left.release = function() {
        if (!right.isDown && platformMy.image.vy === 0) {
            platformMy.image.vx = 0;
        }
    };

    //Right
    right.press = function() {
        platformMy.image.vx = 5;
    };
    right.release = function() {
        if (!left.isDown && platformMy.image.vy === 0) {
            platformMy.image.vx = 0;
        }
    };

    space.press = function() {
        if(ball.state === 0) {
            pushBall(ball, platformMy);
            vect_move.x = ball.x + ball.width / 2 - platform1.x - platform1.width / 2;
            vect_move.y = ball.y + ball.height / 2 - platform1.y - 3 * platform1.height;
            ball.vx = vect_move.x / 15;
            ball.vy = vect_move.y / 15;
            ball_state = 1;
        }
    };
    space.release = function() {
        // if (!left.isDown && platform1.vy === 0) {
        //     platform1.vx = 0;
        // }
    };

    //Down
    // down.press = function() {
    //     platform1.vy = 5;
    //     platform1.vx = 0;
    // };
    // down.release = function() {
    //     if (!up.isDown && platform1.vx === 0) {
    //         platform1.vy = 0;
    //     }
    // };

    //Set the game state

    state = play;

    //Start the game loop
    gameLoop();
}
function gameLoop(){
    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);
    //Update the current game state
    state();
    //Render the stage
    // stage.x = 400;
    renderer.render(stage);
}
function play() {
    //Use the platform1's velocity to make it move
    time_game++;
    if(time_game > 100) {
        speed++;
        time_game = 0;
    }
    platform1.x += platform1.vx;
    platform1.y += platform1.vy;
    platform2.x += platform1.vx;
    platform2.y += platform1.vy;
    if((ball.x + ball.width / 2 <= platform1.x || ball.x + ball.width / 2 >= platform1.x + platform1.width) && ball_state === 0) {
        ball.x += platform1.vx;
    }
    if(ball.y <= platform2.y + platform2.height &&
        ball.x + ball.width / 2 >= platform2.x && ball.x + ball.width / 2 <= platform2.x + platform2.width
        && ball.x && ball_state === 1) {
        vect_move.x = ball.x + ball.width / 2 - platform2.x - platform2.width / 2;
        vect_move.y = ball.y + ball.height / 2 - platform2.y + 3 * platform2.height;
        ball.vx = vect_move.x / 15;
        ball.vy = vect_move.y / 15;
        ball_state = 1;
    }
    if(ball.y + ball.height >= platform1.y &&
        ball.x + ball.width / 2 >= platform1.x && ball.x + ball.width / 2 <= platform1.x + platform1.width
        && ball.x && ball_state === 1) {
        vect_move.x = ball.x + ball.width / 2 - platform1.x - platform1.width / 2;
        vect_move.y = ball.y + ball.height / 2 - platform1.y - 3 * platform1.height;
        ball.vx = vect_move.x / 15;
        ball.vy = vect_move.y / 15;
        ball_state = 1;
    }
    if(ball_state === 1) {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
}

function createObject(str) {
    let obj = {};
    obj.image = new Sprite(resources[str].texture);
    obj.image.vx = 0;
    obj.image.vy = 0;
    obj.centerX = obj.image.x + obj.image.width / 2;
    obj.centerY = obj.image.y + obj.image.height / 2;
    return obj;
}

function pushBall(b, p) {

}