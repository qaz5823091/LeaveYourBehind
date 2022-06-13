class Character
{
    constructor(id, x, y, c) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = c;
        this.start_x = 0;
        this.start_y = 0;
    }

    set config(data) {
        this.id = data.id;
        this.position = data.position;
        this.color = data.color;
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    get code() {
        return this.id;
    }

    getPosition() {
        return {x: this.x, y: this.y};
    }

    draw() {
        stroke('black');
        strokeWeight(3)
        fill(this.color);
        square(this.start_x + 5 + this.x * 35, this.start_y + 5 + this.y * 35, 25);
    }
}
