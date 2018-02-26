import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export default class Chat {
    
    onMessage(cb: Function) {
        socket.on('message', (msg: string) => {
            cb(msg);
        });
    }

    sendMessage(msg: string) {
        socket.emit('message', msg);
    }

    onUser(cb: Function) {
        socket.on('user', (msg: string) => {
            cb(msg);
        });
    }

    addUser(user: string) {
        socket.emit('user', user);        
    }

    disconnect(user: string) {
        console.warn(user);
        socket.emit('disconnection', user.toString());
    }

    onDisconnect(cb: Function) {
        socket.on('disconnection', (msg: string) => {
            cb(msg);
        });
    }
}
