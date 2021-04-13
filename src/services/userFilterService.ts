import User from '../models/User';

export default function filterUserByAge(users: Array<User>, filterAge: Number): Array<User> {
    return users.filter(user => user.age > filterAge);
}
