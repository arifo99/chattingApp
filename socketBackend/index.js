const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors());

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,  {cors: {origin: "*"}});

var nameIdMap = {}
var idNameMap = {}

io.on('connection', client => {
  client.on('new_user', (name) => {
      nameIdMap[name] = client.id;
      idNameMap[client.id] = name;
  });

  client.on('new_message', (sender, receiver, message) => {
      if(nameIdMap[receiver] == null)
        return;
        
      io.to(nameIdMap[receiver]).emit('new_message', sender, message);
  });

  client.on('disconnect', () => {
      delete nameIdMap[idNameMap[client.id]];
      delete idNameMap[client.id];
  });
});


app.get('/', (req, res) => {
    res.send("HELLO!")
});

server.listen(9000);