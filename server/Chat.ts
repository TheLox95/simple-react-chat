import { Server as ServerClass } from './Server';
const Server = new ServerClass();
import * as ioModule from 'socket.io';
const io = ioModule.listen(Server.instance, {path: '/api'});
import UserStore from './UserStore';
const userStoreObj = new UserStore();

io.on('connection', (socket) => {
    socket.on('message', msg => {
      socket.emit('message', msg);
      socket.broadcast.emit('message', msg);      
    });

    socket.on('user', user => {
      if (userStoreObj.exist(user.name)) {
        return;
      }
      
      userStoreObj.save(user);

      socket.emit('user', userStoreObj.users);        
      socket.broadcast.emit('user', userStoreObj.users);            
    });

    socket.on('disconnection', user => {
      userStoreObj.remove(user);

      socket.broadcast.emit('disconnection', user);            
    });
    
    socket.emit('user', userStoreObj.users);
    
});

Server.listen();