// DEDICATED CHILD CLASS for ground
class Ground extends Fixed {
    constructor(x) {
        super(x/2, 750, x, 100);
        this.image = loadImage("Assets/ground.png");
    }
}