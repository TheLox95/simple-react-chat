import User from '../src/common/User';

export default class UserStore {
    private _set = new Map<string, User>();

    save(user: User) {
        this._set.set(user.name, user);
    }

    exist(userName: string) {
        return this._set.has(userName);
    }

    remove(userName: string) {
        this._set.delete(userName);
    }

    forEach(cb: (value1: User, key: string, map: Map<string, User>) => void) {
        this._set.forEach(cb);
    }

}