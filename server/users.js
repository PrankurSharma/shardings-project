const users = [];

const addUser = (id, username, room) => {
    const existingUser = users.find(user => user.username.trim().toLowerCase() === username.trim().toLowerCase());

    if(existingUser){
        return { error: "Username has been already taken." };
    }
    if(!username && !room){
        return { error: "Please fill both the details in order to proceed." };
    }
    if(!username){
        return { error: "Please enter the username." };
    }
    if(!room){
        return { error: "Please enter the room." };
    }

    const user = { id, username, room };
    users.push(user);
    return { user };
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const deleteUser = (id) => {
    const idx = users.findIndex(user => user.id === id);
    if(idx === -1) {
        return users.splice(idx, 1)[0];
    }
}

const getUsers = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = { addUser, getUser, deleteUser, getUsers };