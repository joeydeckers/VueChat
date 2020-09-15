const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

http.listen(process.env.PORT || 3000, () => {
    console.log(`Working on: ${process.env.PORT || 3000}`);
})
