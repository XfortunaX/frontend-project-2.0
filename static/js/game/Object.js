

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