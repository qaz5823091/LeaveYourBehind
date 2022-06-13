const { Config } = require('./public/js/Config');

const MAXIMUM_PLAYERS = 4;
const TIME_LIMIT = 30;

var config = new Config();

var express = require('express');
var app = express();

// mount on port 3000
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT);

app.use(express.static('public'));

console.log("Server is running!");

var socket = require('socket.io');
var client_sockets = [];
var io = socket(server);


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
/*
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', `Welcome to ${user.room}`);

        console.log(getAllRoomNumbers());
        socket.broadcast.emit('roomNumber', {
            numbers: getAllRoomNumbers()
        });

        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                `${user.username} has joined the room.`
            );

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', msg);
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                `${user.username} has left the room`
            );

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});
*/
