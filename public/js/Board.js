let colors = [
    [255, 255, 255],    // white
    [3, 98, 252],       // blue
    [252, 190, 3],      // yellow
    [252, 88, 88],      // red
    [70, 219, 112]      // green
];

const SQUARE_SIZE = 35;

class Board
{
    constructor(x, y, w, h, table) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.table = table;
    }

    set config(setting) {
        this.position = setting.position;
        this.w = setting.width;
        this.h = setting.height;
        this.table = setting.table;
    }

    set position(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }

    draw() {
        for (let i=0;i<this.h;i++) {
            for (let j=0;j<this.w;j++) {
                var code = parseInt(this.table[i][j], 10);
                fill(colors[code]);
                noStroke();
                square(this.x + SQUARE_SIZE * j, this.y + SQUARE_SIZE * i, SQUARE_SIZE);
            }
        }
    }
}
