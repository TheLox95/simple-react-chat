import { createServer } from 'http';
const server = createServer();
import * as ioModule from 'socket.io';
const io = ioModule.listen(server);
import UserStore from './UserStore';
const userStoreObj = new UserStore();

io.on('connection', (socket) => {
    socket.on('message', msg => {
      socket.emit('message', msg);
      socket.broadcast.emit('message', msg);      
    });

    socket.on('user', user => {
      if (userStoreObj.exist(user)) {
        return;
      }

      userStoreObj.save(user);

      userStoreObj.forEach((userItem) => {
        socket.emit('user', userItem);        
        socket.broadcast.emit('user', userItem);
      });            
    });

    socket.on('disconnect', user => {
      userStoreObj.remove(user);

      socket.broadcast.emit('disconnect_res', user);            
    });

});

server.listen(4000, function (err: string) {
  if (err) { throw err; }
  // console.log('listening on port 3000');
});