var config;
var socket;
var board;
var character, others = [];
var score_board;
var timer;
var names;
var is_start = false;
var is_end = false;

const CONNECT_URL = "https://leave-your-behind.herokuapp.com/";

socket = io.connect(CONNECT_URL);
socket.on('config', getConfig);
socket.on('message', (msg) => {
    if (msg['status'] == 'error') {
        alert(msg);
        redirect();
    }
});

function redirect() {
    window.location.assign("localhost:3000/introduction.html");
}

function setup() {
    createCanvas(1000, 525);
    board = new Board(0, 0, 0, 0, []);
    character = new Character(2, 0, 1, [252, 190, 3]);
    score_board = new ScoreBoard(800, 150, []);
    timer = new Timer(30000);
    timer.pause();

    socket.on('other', otherDraw);
}

function getConfig(setting) {
    board.config = setting.board;
    character.config = setting.character;
    score_board.config = setting.board;
    names = setting.name;
}

function otherDraw(data) {
    others[data.id] = new Character(data.id, data.x, data.y, data.color);

}

function draw() {
    background(255);
    fill(255);
    rect(0, 0, 700, 525);

    socket.on('message', (data) => {
        if (data['status'] == 'start') {
            is_start = true;
            timer.start();
        }
    });

    socket.on('table', function(table) {
        board.table = table;
        score_board.table = table;
    });

    if (is_start) {
        board.draw();
    }

    character.draw();

    others.forEach(other => {
        if (other instanceof Character) {
            other.draw();
        }
    });

    if (timer.expired() && !is_end) {
        is_end = true;
        socket.emit('message', {
            status: 'end',
            msg: '遊戲結束'
        });
    }

    if (!is_end) {
        fill(255);
        text(Math.round(timer.getRemainingTime()/1000) % 30 + 1, 800, 100);
    }
    else {
        let winner_id = score_board.findMax();
        fill(255);
        text('Winner is ' + names[winner_id], 800, 100);
    }

    if (is_start) {
        score_board.draw();
    }
}

function keyPressed() {

    if (is_end) {
        return ;
    }
    let pos = character.getPosition();
    if (keyCode === LEFT_ARROW) {
        pos.x = (pos.x - 1 < 0) ? pos.x : pos.x - 1;
    }
    else if (keyCode === RIGHT_ARROW) {
        pos.x = (pos.x + 1 > board.w - 1) ? pos.x : pos.x + 1;
    }
    else if (keyCode === UP_ARROW) {
        pos.y = (pos.y - 1 < 0) ? pos.y : pos.y - 1;
    }
    else if (keyCode === DOWN_ARROW) {
        pos.y = (pos.y + 1 > board.h - 1) ? pos.y : pos.y + 1;
    }
    character.position = pos;
    socket.emit('character', character);
}
