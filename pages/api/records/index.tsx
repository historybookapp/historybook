import { NextApiHandler } from 'next'
import Boom from '@hapi/boom'
import { getSession } from 'next-auth/client'
import joi from 'joi'
import _ from 'lodash'

import handlerWrapper, { sendOk } from '../../../common/handlerWrapper'
import hashids from '../../../common/hashids'
import prisma, { Prisma } from '../../../common/prisma'
import { sanitizeRecord } from '../../../common/utils'

const postHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  const schema = joi.object({
    domain: joi.string().required(),
    url: joi.string().required(),
    title: joi.string().required(),
    description: joi.string(),
    favicon: joi.string(),
    media: joi.array().items(
      joi.object({
        name: joi.string().required(),
        source: joi.string().required(),
        mediaType: joi.string().valid('image', 'video'),
      }),
    ),
  })
  const value = await schema.validateAsync(req.body)
  const { media } = value
  const { hid } = session.user
  const userId = hashids.decode(hid)
  const record: Prisma.RecordCreateInput = {
    ...value,
    userId,
    media: {
      create: media.map((medium) => ({
        userId,
        ...medium,
      })),
    },
  }

  const createRecord = await prisma.record.create({
    data: record,
    include: {
      media: {
        select: {
          name: true,
          source: true,
          mediaType: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  })

  sendOk(res, sanitizeRecord(createRecord))
}

const getHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  const { hid } = session.user
  const userId = hashids.decode(hid)
  const { lastRecordHid, size = 20 } = req.query
  const lastRecordId = lastRecordHid
    ? hashids.decode(lastRecordHid as string)
    : undefined

  const findRecords = await prisma.record.findMany({
    where: {
      userId,
    },
    take: Number(size),
    skip: lastRecordId ? 1 : 0,
    cursor: lastRecordId
      ? {
          id: lastRecordId,
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      media: {
        select: {
          name: true,
          source: true,
          mediaType: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  })

  sendOk(res, {
    list: findRecords.map((record) => sanitizeRecord(record)),
    lastRecordHid: findRecords.length
      ? hashids.encode(_.last(findRecords).id)
      : undefined,
  })
}

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    throw Boom.unauthorized()
  }

  switch (req.method) {
    case 'POST':
      await postHandler(req, res)
      break
    case 'GET':
      await getHandler(req, res)
      break
    default:
      throw Boom.methodNotAllowed()
  }
}

export default handlerWrapper(handler)
