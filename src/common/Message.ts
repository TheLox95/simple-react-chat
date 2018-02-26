import User from './User';

export default class Message {
    
    constructor(public body: string, public user: User) {}
}