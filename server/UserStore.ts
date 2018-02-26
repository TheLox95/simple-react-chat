export default class UserStore {
    private _set = new Set<string>();

    save(user: string) {
        this._set.add(user);
    }

    exist(user: string) {
        return this._set.has(user);
    }

    forEach(cb: (value1: string, value2: string, set: Set<String>)) {
        this._set.forEach(cb);
    }

}