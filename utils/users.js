const users = [];

function userJoin(id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

function getAllRoomNumbers() {
    const counts = {};
    for (const user of users) {
        counts[user.room] = counts[user.room] ? counts[user.room] + 1 : 1;
    }

    return counts;
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getAllRoomNumbers
};
