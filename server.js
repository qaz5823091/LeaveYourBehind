const { Config } = require('./public/js/Config');

const MAXIMUM_PLAYERS = 4;
const TIME_LIMIT = 30;

var config = new Config();

var express = require('express');
var path = require('path');
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// mount on port 3000
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

console.log("Server is running!");
var client_sockets = [];

io.sockets.on('connection', newConnection);
function newConnection(socket) {
    console.log('socket id: ', socket.id);
    client_sockets.push(socket);
    console.log(client_sockets.length);
    if (client_sockets.length > MAXIMUM_PLAYERS) {
        socket.emit('message', {
            status: 'error',
            msg: "人數已達上限"
        });
        client_sockets.pop();
        return ;
    }

    io.to(socket.id).emit('config', config.setting(client_sockets.length));
    socket.on('character', refreshTable);
    function refreshTable(data) {
        config.table[data.y][data.x] = data.id;
        socket.broadcast.emit('other', data);
        io.sockets.emit('table', config.refreshedTable);
    }

    if (client_sockets.length == MAXIMUM_PLAYERS){
        setTimeout(gameStart, 3000);
        function gameStart() {
            io.emit('message', {
                status: 'start',
                msg: '遊戲開始'
            });
            config.resetTable();
        }
    }

    socket.on('message', getMessage);
    function getMessage(data) {
        if (data['status'] == 'end') {
            client_sockets = [];
        }
    }

    socket.on('disconnect', (id) => {
    });
}

server.listen(PORT, () => {
    console.log('listening on *:', PORT);
});
