
const express = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app = express();

//Node Server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Sockets Messages
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectada') 
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });
});



//Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto!!', process.env.PORT);
});