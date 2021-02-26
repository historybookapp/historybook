import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import tw, { css } from 'twin.macro'
import { Avatar, Badge, Button } from '@chakra-ui/react'
import Link from 'next/link'

import PageContainer from '../components/PageContainer'

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const [session] = useSession()

  return (
    <PageContainer title="Profile">
      <div tw="py-8 mx-7">
        <Link href="/home">
          <Button>Back</Button>
        </Link>

        {session && (
          <div tw="mt-7 p-7 border border-solid rounded-lg space-y-4 flex flex-col items-center md:flex-row md:space-x-4">
            <div>
              <Avatar
                w={100}
                h={100}
                bg="gray.300"
                name={session.user.name || undefined}
                src={session.user.image || undefined}
              />
            </div>
            <div tw="w-full">
              <div>
                <b>Username:</b> {session.user.name || <Badge>Not set</Badge>}
              </div>
              <div>
                <b>Email:</b> {session.user.email}
              </div>
              <div tw="mt-4">
                <Button disabled>Edit profile</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Page
