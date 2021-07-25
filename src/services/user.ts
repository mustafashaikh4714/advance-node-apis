import { User } from 'src/models/user'

export class UserService {
    public getUser(email: string) {
        // query data from DB
        const user = User.find(email)
        // do some extra processing on data
        // ..

        return user
    }
}
