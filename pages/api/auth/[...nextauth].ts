import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import hashids from '../../../common/hashids'
import prisma from '../../../common/prisma'

const handler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Email({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
    pages: {
      signIn: '/auth/signin',
      verifyRequest: '/auth/verify-request',
    },
    callbacks: {
      async session(session, user) {
        // eslint-disable-next-line no-param-reassign
        session.user.hid = hashids.encode((user as any).id as number)
        return session
      },
    },
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
