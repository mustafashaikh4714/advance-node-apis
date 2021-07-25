// create database model here
// this is just an example,
// remove this and create actual DB model
// for mongo checkout `Typegoose`
// for sql checkout `TypeORM`

export const User = {
    find(email: string) {
        return {
            id: 1,
            email,
            username: 'testuser'
        }
    }
}
