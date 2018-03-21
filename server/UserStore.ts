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

    get users() {
        return Array.from(this._set.values());
    }

}