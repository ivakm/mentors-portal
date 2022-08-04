import User from './User.js'

class UserService {
    async create(user) {
        const createdUser = await User.create(user);
        return createdUser;
    }

    //todo it must receive an id
    async getUser() {
        const user = await User.find();
        return user;
    }
}

export default new UserService();