/**
 * Created by sergey on 26.03.17.
 */
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

class GameObject {
    constructor(str) {
        this.image = new PIXI.Sprite(PIXI.loader.resources[str].texture);
        this.image.x = 0;
        this.image.y = 0;
        this.image.vx = 0;
        this.image.vy = 0;
        this.setCenter();

        this.vectorMove = {};
        this.vectorMove.x = 0;
        this.vectorMove.y = 0;
    }

    setPosition(x, y) {
        this.image.x = x;
        this.image.y = y;
        this.setCenter();
    }

    setCenter() {
        this.centerX = this.image.x + this.image.width / 2;
        this.centerY = this.image.y + this.image.height / 2;
    }

    getPosition() {
        return {x: this.image.x, y: this.image.y };
    }

    getCenter() {
        return {x: this.centerX, y: this.centerY };
    }

    getSize() {
        return {width: this.image.width, height: this.image.height};
    }

    getImage() {
        return this.image;
    }

}

class Platform extends GameObject{

    getPosBall(ballSize, side) {
        return {
            x: this.image.x + this.image.width / 2 - ballSize.width / 2,
            y: this.image.y - side * ballSize.height
        };
    }
    
    

}

class Ball extends GameObject{
    constructor(str) {
        super(str);
        this.state = 0;
    }
}

let state;

// let platformMy = new Platform("images/platform1.png");
// let platformEnemy = new Platform("images/platform2.png");
// let ball = new Ball("images/ball.png");

function setup() {

    let platformMy = new Platform("images/platform1.png");
    let platformEnemy = new Platform("images/platform2.png");
    let ball = new Ball("images/ball.png");

    let rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0xEEEEEE);
    rectangle.drawRect(0, 0, 400, 600);
    rectangle.endFill();
    stage.addChild(rectangle);

    platformMy.setPosition(90, 540);
    stage.addChild(platformMy.getImage());

    platformEnemy.setPosition(40, 40);
    stage.addChild(platformEnemy.getImage());

    ball.setPosition(platformMy.getPosBall(ball.getSize(), 1).x, platformMy.getPosBall(ball.getSize(), 1).y);
    stage.addChild(ball.getImage());

    keyboardControls();

    state = play();

    gameLoop();
}

function gameLoop(){
    requestAnimationFrame(gameLoop);
    renderer.render(stage);
}

function play() {
    
}

function checkCollision() {
    
}

function keyboardControls() {
    let left = keyboard(37),
        A = keyboard(65),
        D = keyboard(68),
        space = keyboard(32),
        right = keyboard(39);

    left.press = function() {
        platform1.vx = -5;
    };
    left.release = function() {
        if (!right.isDown && platform1.vy === 0) {
            platform1.vx = 0;
        }
    };

    A.press = function() {
        platform2.vx = -5;
    };
    A.release = function() {
        if (!D.isDown && platform2.vy === 0) {
            platform2.vx = 0;
        }
    };

    right.press = function() {
        platform1.vx = 5;
    };
    right.release = function() {
        if (!left.isDown && platform1.vy === 0) {
            platform1.vx = 0;
        }
    };

    D.press = function() {
        platform2.vx = 5;
    };
    D.release = function() {
        if (!A.isDown && platform2.vy === 0) {
            platform2.vx = 0;
        }
    };

    space.press = function() {
        
    };
    space.release = function() {};
}


function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}