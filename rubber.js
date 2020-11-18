class Rubber {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.1,
            length: 150,
        };
        this.rubber = Constraint.create(options);
        World.add(world, this.rubber);
    }
    show() {
        if (this.rubber.bodyA) {
            var pointA = this.rubber.bodyA.position;
            var pointB = this.rubber.pointB;
            push();
            stroke(0);
            strokeWeight(5);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
            line(pointA.x, pointA.y, pointB.x + 180, pointB.y);
            pop();
        }
    }
}