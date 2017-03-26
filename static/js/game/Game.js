/**
 * Created by sergey on 26.03.17.
 */

export let platformMy = new Platform("images/platform1.png");
export let platformEnemy = new Platform("images/platform2.png");
export let ball = new Ball("images/ball.png");
//let time_game = 0;

export function setup() {

    platformMy.setPosition(90, 540);
    stage.addChild(platformMy.getImage());

    platformEnemy.setPosition(40, 90);
    stage.addChild(platformEnemy.getImage());

    ball.setPosition(platformMy.getPosBall().x, platformMy.getPosBall().y);
    stage.addChild(ball.getImage());

    // let left = keyboard(37),
    //     space = keyboard(32),
    //     right = keyboard(39);

    // //Left arrow key `press` method
    // left.press = function() {
    //     platformMy.image.vx = -5;
    // };
    // //Left arrow key `release` method
    // left.release = function() {
    //     if (!right.isDown && platformMy.image.vy === 0) {
    //         platformMy.image.vx = 0;
    //     }
    // };
    //
    // //Right
    // right.press = function() {
    //     platformMy.image.vx = 5;
    // };
    // right.release = function() {
    //     if (!left.isDown && platformMy.image.vy === 0) {
    //         platformMy.image.vx = 0;
    //     }
    // };
    //
    // space.press = function() {
    //     if(ball.state === 0) {
    //         pushBall(ball, platformMy);
    //         vect_move.x = ball.x + ball.width / 2 - platform1.x - platform1.width / 2;
    //         vect_move.y = ball.y + ball.height / 2 - platform1.y - 3 * platform1.height;
    //         ball.vx = vect_move.x / 15;
    //         ball.vy = vect_move.y / 15;
    //         ball_state = 1;
    //     }
    // };
    // space.release = function() {
    //     // if (!left.isDown && platform1.vy === 0) {
    //     //     platform1.vx = 0;
    //     // }
    // };

//    state = play;

    //Start the game loop
    gameLoop();
}
export function gameLoop(){
    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);
    //Update the current game state
 //   state();
    //Render the stage
    // stage.x = 400;
    renderer.render(stage);
}
// function play() {
//     //Use the platform1's velocity to make it move
//     time_game++;
//     if(time_game > 100) {
//         speed++;
//         time_game = 0;
//     }
//     platform1.x += platform1.vx;
//     platform1.y += platform1.vy;
//     platform2.x += platform1.vx;
//     platform2.y += platform1.vy;
//     if((ball.x + ball.width / 2 <= platform1.x || ball.x + ball.width / 2 >= platform1.x + platform1.width) && ball_state === 0) {
//         ball.x += platform1.vx;
//     }
//     if(ball.y <= platform2.y + platform2.height &&
//         ball.x + ball.width / 2 >= platform2.x && ball.x + ball.width / 2 <= platform2.x + platform2.width
//         && ball.x && ball_state === 1) {
//         vect_move.x = ball.x + ball.width / 2 - platform2.x - platform2.width / 2;
//         vect_move.y = ball.y + ball.height / 2 - platform2.y + 3 * platform2.height;
//         ball.vx = vect_move.x / 15;
//         ball.vy = vect_move.y / 15;
//         ball_state = 1;
//     }
//     if(ball.y + ball.height >= platform1.y &&
//         ball.x + ball.width / 2 >= platform1.x && ball.x + ball.width / 2 <= platform1.x + platform1.width
//         && ball.x && ball_state === 1) {
//         vect_move.x = ball.x + ball.width / 2 - platform1.x - platform1.width / 2;
//         vect_move.y = ball.y + ball.height / 2 - platform1.y - 3 * platform1.height;
//         ball.vx = vect_move.x / 15;
//         ball.vy = vect_move.y / 15;
//         ball_state = 1;
//     }
//     if(ball_state === 1) {
//         ball.x += ball.vx;
//         ball.y += ball.vy;
//     }
//}