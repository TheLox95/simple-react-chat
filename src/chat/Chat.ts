import * as io from 'socket.io-client';
import Message from '../common/Message';
import User from '../common/User';

const socket = io.connect('http://localhost:4000');

export default class Chat {
    
    onMessage(cb: Function) {
        socket.on('message', (msg: string) => {
            cb(msg);
        });
    }

    sendMessage(msg: Message) {
        socket.emit('message', msg);
    }

    onUser(cb: Function) {
        socket.on('user', (msg: string) => {
            cb(msg);
        });
    }

    addUser(user: User) {
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
