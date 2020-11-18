// CLASS for the sling
function Sling(x, y) {
    this.image = loadImage("Assets/sling.jpg");
    this.pos = createVector(x, y);
    this.show = function () {
        image(this.image, this.pos.x, this.pos.y);
    }
}