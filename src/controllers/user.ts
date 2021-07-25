import { Auth, Controller, Get, Post } from '@tsxp/core'
import { Request, Response } from 'express'
import { CreateUserSchema } from '../schemas/test.schema'
import { UserService } from '../services/user'
import { Token } from '../utils/token'
import validate from '../utils/validator'

@Controller('user')
export class User {
    constructor(private userService: UserService) {}

    @Post('/create')
    async create(_req: Request, res: Response) {
        const { email, username } = _req.body as any
        const { values, errors } = validate(CreateUserSchema, { email, username })
        if (errors.length) {
            return res.status(400).send({ errors })
        }
        console.log('values', values)
        // insert values in user db.
        // user.insert(values)

        return res.send({ success: true })
    }

    @Post('/login')
    async login(_req: Request, res: Response) {
        const { email, username } = _req.body

        const { values, errors } = validate(CreateUserSchema, { email, username })

        if (errors.length) {
            return res.status(400).send({ errors })
        }

        const dbUser = this.userService.getUser(email)

        if (!dbUser.username === values.username) {
            return res.send({ errors: ['User not found!'] })
        }

        const userPayload = { id: dbUser.id, email: dbUser.email }
        const token = Token.sign(userPayload)

        return res.send({
            success: true,
            token
        })
    }

    @Auth()
    @Get('/:id')
    async getUser(_req: Request, res: Response) {
        return res.send({ data: _req.user })
    }
}
