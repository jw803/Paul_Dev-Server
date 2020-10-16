import User from '../models/user.model';

export async function getUsers() {
    const userList = await User.findAll<User>({});
    return userList;
}

export async function createUser(data: User) {
    let newUser = await User.create<User>(data);
    return newUser;
}
