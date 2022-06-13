function * makeRow(col) {
    for (let i = 0;i < col;i++) {
        //yield Math.floor(Math.random() * 2);
        yield 0;
    }
}

function * tableGenerator(row, col) {
    for (let i = 0;i < row;i++) {
        yield [...makeRow(col)];
    }
}

class Config
{
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 20;
        this.height = 15;
        this.total = this.width * this.height;
        this.initial_position = [
            { x: 0, y: 0 },
            { x: 0, y: this.height - 1 },
            { x: this.width - 1, y: 0 },
            { x: this.width - 1, y: this.height - 1 }
        ];
        this.name = [
            "Blue",
            "Yellow",
            "Red",
            "Green"
        ];
        this.colors = [
            [255, 255, 255],    // white
            [3, 98, 252],       // blue
            [252, 190, 3],      // yellow
            [252, 88, 88],      // red
            [70, 219, 112]      // green
        ];
        this.table = [...tableGenerator(this.height, this.width)];
    }

    setting(count) {
        return {
            board: this.board,
            character: {
                id: count,
                color: this.colors[count],
                position: this.initial_position[count - 1]
            },
            name: this.name
        };
    };

    get board() {
        return {
            position: {
                x: this.x,
                y: this.y
            },
            width: this.width,
            height: this.height,
            table: this.table
        };
    }

    get refreshedTable() {
        return this.table;
    }

    resetTable() {
        this.table = [...tableGenerator(this.height, this.width)];
    }
}

exports.Config = Config;
