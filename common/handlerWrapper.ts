import { NextApiHandler, NextApiResponse } from 'next'
import Boom from '@hapi/boom'
import joi from 'joi'

import { isDev } from './utils'

export default function handlerWrapper(
  handler: NextApiHandler,
): NextApiHandler {
  return async (req, res): Promise<void> => {
    try {
      await handler(req, res)
    } catch (err) {
      console.error(err)

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
          message: err,
        })
      }
    }
  }
}

export const sendOk = (
  res: NextApiResponse,
  payload?: Record<any, any>,
): void => {
  res.send({
    code: 0,
    data: payload,
  })
}
