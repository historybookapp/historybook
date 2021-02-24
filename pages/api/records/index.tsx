import { NextApiHandler } from 'next'
import Boom from '@hapi/boom'
import { getSession } from 'next-auth/client'
import joi from 'joi'
import _ from 'lodash'

import handlerWrapper, { sendOk } from '../../../common/handler-wrapper'
import hashids from '../../../common/hashids'
import prisma, { Prisma } from '../../../common/prisma'
import { sanitizeRecord } from '../../../common/utils'
import { MediaScene } from '../../../types/api'

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
        url: joi.string(),
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
        url: undefined,
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

  sendOk(res, sanitizeRecord(createRecord, 'card'))
}

const getHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  const { hid } = session.user
  const userId = hashids.decode(hid)
  const schema = joi.object({
    nextCursor: joi.string(),
    size: joi.number().min(0).default(20),
    scene: joi.string().valid('card').default('card'),
    keyword: joi.string(),
  })
  const query = await schema.validateAsync(req.query)
  const { nextCursor, size, scene, keyword } = query
  const nextRecordId = nextCursor
    ? hashids.decode(nextCursor as string)
    : undefined

  const findRecords = await prisma.record.findMany({
    where: {
      userId,
      ...(keyword
        ? {
            OR: [
              {
                title: {
                  contains: keyword,
                },
              },
              {
                description: {
                  contains: keyword,
                },
              },
              {
                domain: {
                  contains: keyword,
                },
              },
            ],
          }
        : undefined),
    },
    take: size,
    skip: nextRecordId ? 1 : 0,
    cursor: nextRecordId
      ? {
          id: nextRecordId,
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

  const list = findRecords.map((record) =>
    sanitizeRecord(record, scene as MediaScene),
  )
  const isFullSize = list.length === Number(size)

  sendOk(res, {
    list,
    nextCursor: list.length && isFullSize ? _.last(list).hid : null,
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
