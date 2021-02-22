import Boom from '@hapi/boom'
import joi from 'joi'
import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'
import ogs from 'open-graph-scraper'

import handlerWrapper, { sendOk } from '../../../common/handlerWrapper'
import { getImages } from '../../../common/open-graph'
import { LookUpWebMedium, LookUpWebResponse } from '../../../types/api'

const getHandler: NextApiHandler = async (req, res) => {
  const schema = joi.object({
    url: joi.string().required(),
  })
  const value: { url: string } = await schema.validateAsync(req.query)
  const { url } = value
  const site = new URL(url)

  const og = await ogs({ url, allMedia: true }).catch((data) => data)

  if (og.error === true) {
    throw Boom.badRequest('Could not retrieve information from this url.')
  }

  const imageList: LookUpWebMedium[] | undefined = og.result.ogImage
    ? getImages(url, og.result.ogImage)
    : undefined
  const result: LookUpWebResponse = {
    domain: site.hostname,
    url,
    title: og.result.ogTitle,
    description: og.result.ogDescription,
    media: [...imageList],
  }

  sendOk(res, result)
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
