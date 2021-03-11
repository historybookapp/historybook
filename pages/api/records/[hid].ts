import Boom from '@hapi/boom'
import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'
import * as yup from 'yup'

import handlerWrapper, { sendOk } from '../../../common/handler-wrapper'
import hashids from '../../../common/hashids'
import prisma from '../../../common/prisma'

const deleteHandler: NextApiHandler = async (req, res) => {
  const schema = yup.object().shape({
    hid: yup.string().required(),
  })
  const query = await schema.validate(req.query)
  const { hid } = query
  const id = hashids.decode(hid)

  await prisma.record.delete({
    where: {
      id,
    },
  })

  sendOk(res)
}

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    throw Boom.unauthorized()
  }

  switch (req.method) {
    case 'DELETE':
      await deleteHandler(req, res)
      break
    default:
      throw Boom.methodNotAllowed()
  }
}

export default handlerWrapper(handler)
