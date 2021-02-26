import Boom from '@hapi/boom'
import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

import handlerWrapper, { sendOk } from '../../common/handler-wrapper'

const getHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  sendOk(res, {
    ...session?.user,
  })
}

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    throw Boom.unauthorized()
  }

  switch (req.method) {
    case 'GET':
      await getHandler(req, res)
      break
    default:
      throw Boom.methodNotAllowed()
  }
}

export default handlerWrapper(handler)
