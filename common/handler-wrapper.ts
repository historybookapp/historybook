import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Boom from '@hapi/boom'
import joi from 'joi'
import { ValidationError } from 'yup'
import cors from 'cors'

import { isDev } from './utils'

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default function handlerWrapper(
  handler: NextApiHandler,
): NextApiHandler {
  return async (req, res): Promise<void> => {
    try {
      await runMiddleware(
        req,
        res,
        cors({
          maxAge: 3600,
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          origin(origin, callback) {
            const whitelist = [
              'https://historybook.link',
              'https://historybook.vercel.app',
              'http://localhost:3000',
            ]

            if (!origin) {
              callback(null, true)
              return
            }
            if (origin.startsWith('chrome-extension://')) {
              callback(null, true)
              return
            }

            if (whitelist.indexOf(origin) !== -1) {
              callback(null, true)
            } else {
              callback(Boom.forbidden('Not allowed by CORS'), false)
            }
          },
        }),
      )

      await handler(req, res)
    } catch (err) {
      console.error('⚠️ ', err)

      if (Boom.isBoom(err)) {
        res.status(err.output.statusCode).send({
          code: 1,
          message: err.message,
          ...(isDev()
            ? {
                stack: err.stack,
              }
            : null),
        })
      } else if (err instanceof ValidationError) {
        res.status(400).send({
          code: 1,
          message: err.message,
          data: err.errors,
        })
      } else if (joi.isError(err)) {
        res.status(400).send({
          code: 1,
          message: err.message,
          data: err.details,
        })
      } else if (err instanceof Error) {
        res.status(500).send({
          code: 1,
          message: err.message,
          ...(isDev()
            ? {
                stack: err.stack,
              }
            : null),
        })
      } else {
        res.status(500).send({
          code: 1,
          message: typeof err === 'string' ? err : undefined,
          data: typeof err !== 'string' ? err : undefined,
        })
      }
    }
  }
}

export const sendOk = (
  res: NextApiResponse,
  payload?: Record<any, any>,
): void => {
  res.send(payload || {})
}
