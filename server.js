const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];
let messages = [];
let index = 0;

io.on("connection", socket => {

    socket.emit("Loggedin", {
        users: users.map(s => s.username),
        messages: messages
    })

    socket.on("newuser", user =>{
        console.log(`${username} has arrived at the party.`);
        socket.username = username;
        users.push(socket);

        io.emit('userOnline', socket.username);
    });

    socket.on("msg", msg => {
        let message = {
            index:index,
            username: socket.username,
            msg: msg
        }

        messages.push(message);

        io.emit('msg', messages);
        index++;
    });
    

    socket.on("disconnect", () =>{
        console.log(`${socket.user.name} has left the chat.`);
        io.emit('user left', socket.username);
        users.splice(users.indexOf(socket), 1);
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log(`Working on: ${process.env.PORT || 3000}`);
});
