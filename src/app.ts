import { App } from '@tsxp/core'
import { json, urlencoded } from 'express'
import { User } from './controllers/user'
import { Token } from './utils/token'

export const { app, listen } = new App({
    prefix: '/api',
    middlewares: [json(), urlencoded({ extended: true })],
    controllers: [User],
    context: async (req) => {
        const { user } = await Token.parse(req)
        return { user }
    }
})
