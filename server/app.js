const socketio = require("socket.io");
const express = require ("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2018;

const server = http.createServer(app)

const io = socketio(server, {
    cors: {
        origin : "*",
        methods : ["GET", "POST", "OPTIONS"],
    },
});

server.listen(PORT, () => {
    io.on("connection", (socket) => {
        console.log("HOPPAAAAA");
        console.log(socket.id);
        //io.in(roomID).emit()
        //karşılama mesajı gönder
        socket.emit("WELCOME_MESSAGE", `Sayın ${socket.id} hosgeldiniz.`)
        socket.on("NEW_BOOKMARK_EVENT",(bookmark) => {
            // io.emit("NEW_BOOKMARK_ADDED",bookmark);
            //gönderen hariç herkese bookmarks bilgisini gönder.
            socket.broadcast.emit("NEW_BOOKMARK_ADDED",bookmark);
        })
    })

    //Baglanan tek kisiye mesaj gondermek icin socket kullanilir 
    //Baglanan herkese mesaj gondermek icin ise io kullanilir.

    

})