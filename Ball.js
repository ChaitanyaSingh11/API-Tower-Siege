class Ball {
    constructor() {
        var options = {
            restitution: 0.8,
            density: 1,
        }
        this.r = 31;
        this.body = Bodies.circle(150, 350, this.r, options);
        World.add(world, this.body);
        this.ball = createImg("Assets/fire ball.gif");
        this.sun = loadImage("Assets/sun.png");
    }
    show() {
        var pos = this.body.position;
        this.ball.position(pos.x-30, pos.y - 90);
        push();
        imageMode(CENTER);
        image(this.sun, pos.x, pos.y, this.r * 2, this.r * 2);
        pop();
    }
}