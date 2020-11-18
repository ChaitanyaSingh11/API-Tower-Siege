// DEDICATED CHILD CLASS for platform
class Platform extends Fixed {
    constructor(x,y,w) {
        super(x, y, w, 50);
        this.image = loadImage("Assets/platform.png");
        this.body.friction = 5;
    }
}