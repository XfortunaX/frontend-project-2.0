//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;
//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(400, 600);
document.body.appendChild(renderer.view);
loader
    .add("images/platform1.png")
    .add("images/platform2.png")
    .add("images/ball.png")
    .load(setup);

//Define any variables that are used in more than one function
var platform1, platform2, ball, state, rect;
var ball_state = 0;
var speed = 5;
var time_game = 0;
var vect_move = { x: 0, y: 0 };

function setup() {

    //Create an alias for the texture atlas frame ids
    //Create the `platform1` sprite
    var rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0xEEEEEE);
    rectangle.drawRect(0, 0, 400, 600);
    rectangle.endFill();
    stage.addChild(rectangle);

    platform1 = new Sprite(resources["images/platform1.png"].texture);
    platform1.y = 540;
    platform1.x = 90;
    platform1.vx = 0;
    platform1.vy = 0;
    stage.addChild(platform1);

    platform2 = new Sprite(resources["images/platform2.png"].texture);
    platform2.y = 40;
    platform2.x = 90;
    platform2.vx = 0;
    platform2.vy = 0;
    stage.addChild(platform2);

    ball = new Sprite(resources["images/ball.png"].texture);
    ball.y = platform1.y - ball.height;
    ball.x = platform1.x + 30;
    ball.vx = 0;
    ball.vy = 0;
    stage.addChild(ball);

    //Capture the keyboard arrow keys
    var left = keyboard(37),
        A = keyboard(65),
        D = keyboard(68),
        // up = keyboard(38),
        space = keyboard(32),
        right = keyboard(39);
        // down = keyboard(40);

    //Left arrow key `press` method
    left.press = function() {
        //Change the platform1's velocity when the key is pressed
        platform1.vx = -5;
        platform1.vy = 0;
    };
    //Left arrow key `release` method
    left.release = function() {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the platform1 isn't moving vertically:
        //Stop the platform1
        if (!right.isDown && platform1.vy === 0) {
            platform1.vx = 0;
        }
    };

    A.press = function() {
        //Change the platform1's velocity when the key is pressed
        platform2.vx = -5;
        platform2.vy = 0;
    };
    //Left arrow key `release` method
    A.release = function() {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the platform1 isn't moving vertically:
        //Stop the platform1
        if (!D.isDown && platform2.vy === 0) {
            platform2.vx = 0;
        }
    };

    //Up
    // up.press = function() {
    //     platform1.vy = -5;
    //     platform1.vx = 0;
    // };
    // up.release = function() {
    //     if (!down.isDown && platform1.vx === 0) {
    //         platform1.vy = 0;
    //     }
    // };

    //Right
    right.press = function() {
        platform1.vx = 5;
        platform1.vy = 0;
    };
    right.release = function() {
        if (!left.isDown && platform1.vy === 0) {
            platform1.vx = 0;
        }
    };

    D.press = function() {
        platform2.vx = 5;
        platform2.vy = 0;
    };
    D.release = function() {
        if (!A.isDown && platform2.vy === 0) {
            platform2.vx = 0;
        }
    };

    space.press = function() {
        if(ball_state === 0) {
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
        // ball.vx *= 2;
        // ball.vy *= 2;
        time_game = 0;
    }
    platform1.x += platform1.vx;
    platform1.y += platform1.vy;
    platform2.x += platform2.vx;
    platform2.y += platform2.vy;
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
    if(ball.x <= 1 && ball_state === 1) {
        ball.vx = -ball.vx;
    }
    if(ball.x + ball.width >= 399 && ball_state === 1) {
        ball.vx = -ball.vx;
    }
    if(ball.y + ball.height > 600 || ball.y < 0) {
        ball.y = platform1.y - ball.height;
        ball.x = platform1.x + 30;
        ball_state = 0;
    }

    if(ball_state === 1) {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
}
//The `keyboard` helper function
function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}