const io = require('socket.io');


const setupSocket = (socket) => {
    this.users.push({id: socket.id, name: `guest${this.users.length}`, typing: false});
    this.io.emit('get users', this.users);
};

const getUser = (id) => this.users.filter(user => id == user.id)[0];
/**
* Updates current user-obj (based on this.socket), then makes sure all the clients updates the users
* @param {object} obj - object keys & values for user
*
*/
const updateUser = (obj, socket) => {
    this.users = this.users.map(user =>
    socket.id == user.id ? Object.assign(user, obj) : user);
    this.io.emit('get users', this.users);
};

/**
* Sends message and makes sure user isn't typing anymore
*/
const sendMessage = (socket) => {
    socket.on('send message', (text) => {
        this.messages.push({name: getUser(socket.id).name, text: text});
        this.io.emit('update messages', this.messages);
        updateUser({typing: false}, socket);
    });
    socket.on('update messages', () => {
        this.io.emit('update messages', this.messages);
    });
};


/**
* Updates guest socket to a real name
*/
const createUser = (socket) => {
    socket.on('new user', (name) => {
        updateUser({ name: name }, socket);
        this.messages.push({text: `${name} has joined the server`, name: "server"});
    });
};

/**
* Changes the typing status for user based on typing event
*/
const isTyping = (socket) => {
    socket.on('start typing', () => {
        updateUser({typing: true}, socket);
    });

    socket.on('stop typing', () => {
        updateUser({typing: false}, socket);
    });
};

/**
* Disconnects the socket and removes the user from this.users basd on socket.id
*/
const disconnect = (socket) => {
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');

        this.messages.push({text: `${getUser(socket.id).name} has disconnected`, name: "server"});
        this.users = this.users.filter(user => socket.id != user.id);

        this.io.emit('get users', this.users);
        this.io.emit('update messages', this.messages);
    });
};


/**
* Main container for the socketChat
*/
const socketChat = (server) => {
    this.io = new io(server);
    this.users = [{id: "server", name: 'server', typing: false}];
    this.messages = [];
    this.io.on('connection', socket => {
        console.log("New client connected with id : " + socket.id);
        console.log("USERS: ", this.users);
        setupSocket(socket);
        createUser(socket);
        sendMessage(socket);
        isTyping(socket);
        disconnect(socket);
        console.log(this.users.length + " clients are connected");
    });
};

module.exports = { socketChat };
