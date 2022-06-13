class ScoreBoard
{
    constructor(x, y, size, table) {
        this.x = x;
        this.y = y;
        this.table = table;
    }

    set config(setting) {
        this.table = setting.table;
    }

    calculate() {
        let counter = [0, 0, 0, 0];
        let row = this.table.length, col = this.table[0].length;
        for (let i=0;i<row;i++) {
            for (let j=0;j<col;j++) {
                counter[this.table[i][j] - 1]++;
            }
        }

        return counter
    }

    findMax() {
        let score = this.calculate();
        let index = score.indexOf(Math.max(...score));
        return index;
    }

    draw() {
        let score = this.calculate();
        let total = this.table.length * this.table[0].length;
        textSize(20);
        text('blue:   ' + parseInt((score[0] / total * 10000) / 100) + " %", this.x, this.y);
        text('yellow: ' + parseInt((score[1] / total * 10000) / 100) + " %", this.x, this.y + 50);
        text('red:    ' + parseInt((score[2] / total * 10000) / 100) + " %", this.x, this.y + 100);
        text('green:  ' + parseInt((score[3] / total * 10000) / 100) + " %", this.x, this.y + 150);
    }
}
