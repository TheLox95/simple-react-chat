import { createServer } from 'http';
const server = createServer();
import * as ioModule from 'socket.io';
const io = ioModule.listen(server);

io.on('connection', (socket) => {
    socket.on('message', msg => {
      socket.emit('message', msg);
      socket.broadcast.emit('message', msg);      
    });
});

server.listen(4000, function (err: string) {
  if (err) { throw err; }
  // console.log('listening on port 3000');
});