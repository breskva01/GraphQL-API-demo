class UserRepo {
    constructor() {
        this.users = [];
        this.idCounter = 1;
    }

    getUsers() {
        return this.users;
    }

    addUser(name, email) {
        const newUser = {id: this.idCounter++, name, email};
        this.users.push(newUser);
        return newUser;
    }
}

module.exports = new UserRepo();