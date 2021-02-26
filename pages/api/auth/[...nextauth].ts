import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import * as envalid from 'envalid'

import hashids from '../../../common/hashids'
import prisma from '../../../common/prisma'

const { str } = envalid
const env = envalid.cleanEnv(process.env, {
  AUTH_SECRET: str(),
  EMAIL_SERVER: str(),
  EMAIL_FROM: str(),
  GITHUB_CLIENT_ID: str(),
  GITHUB_CLIENT_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
})

const handler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Email({
        server: env.EMAIL_SERVER,
        from: env.EMAIL_FROM,
      }),
      Providers.GitHub({
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
      verifyRequest: '/auth/verify-request',
    },
    callbacks: {
      async session(session, user) {
        // eslint-disable-next-line no-param-reassign
        session.user.hid = hashids.encode((user as any).id as number)
        return session
      },
    },
    secret: env.AUTH_SECRET,
  })

export default handler

declare module 'next-auth' {
  export interface User {
    hid: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}
