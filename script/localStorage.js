class LocalStorage {
    constructor() {
        this._storage = localStorage;

        this._users = [];
        this._prods = [];

        this._logUser = this._storage.getItem('logUser');
        if(this._logUser) this._logUser = JSON.parse(this._logUser);
        else this._logUser = null;

        let users = this._storage.getItem('users');
        if(users) this._users = JSON.parse(users);
    }
    logged(login, password) {
        for (let i = 0; i < this._users.length; i++) {
            if(this._users[i].log === login && this._users[i].pas === password) {
                this._logUser = login;
                this._storage.setItem('logUser', JSON.stringify(login));
                return true;
            }
        }
        this._logUser = null;
        this._storage.removeItem('logUser');
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
        this._logUser = login;
        this._storage.setItem('logUser', JSON.stringify(login));
    }
    getUser() {
        return this._logUser;
    }
    loadProds(prods) {
        let resultProds = this._storage.getItem('prods');
        if(resultProds) this._prods = JSON.parse(resultProds);
        else this._prods = prods;
        this._storage.setItem('prods', JSON.stringify(this._prods));

        return this._prods;
    }

    addProd = function(prod) {
        this._prods.push( prod );
        this._storage.setItem('prods', JSON.stringify(this._prods));
    }
}


var storage = new LocalStorage();