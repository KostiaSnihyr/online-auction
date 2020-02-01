class LocalStorage {
    constructor() {
        this._storage = localStorage;
        this._users = [];
        let users = this._storage.getItem('users');
        if(users) this._users = JSON.parse(users);
    }
    logged(login, password) {
        for (let i = 0; i < this._users.length; i++) {
            if(this._users[i].log === login && this._users[i].pas === password) return true;
        }
        return false;
    }
    isUserExist(login) {
        for (let i = 0; i < this._users.length; i++) {
            if(this._users[i].log === login) return true;
        }
        return false;
    }
    addUser(login, password) {
        this._users.push( {log: login, pas: password} );
        this._storage.setItem('users', JSON.stringify(this._users));
    }
}

var storage = new LocalStorage();