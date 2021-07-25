import { App } from '@tsxp/core'
import { json, urlencoded } from 'express'
import { Home } from 'src/controllers/home'

export const { app, listen } = new App({
  prefix: '/api',
  middlewares: [json(),
  urlencoded({ extended: true })],
  controllers: [Home]
})

let n
