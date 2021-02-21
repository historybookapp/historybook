import { NextPage } from 'next'
import Head from 'next/head'
import tw, { styled, css } from 'twin.macro'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/client'

const Card = styled.a`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
  min-width: 300px;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

const Page: NextPage = () => {
  const [session] = useSession()

  return (
    <div
      css={css`
        min-height: 100vh;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}>
      <Head>
        <title>Historybook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
        <h1
          css={css`
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          `}>
          Welcome to{' '}
          <Text tw="font-bold" color="brand.400" as="span">
            Historybook
          </Text>
        </h1>

        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 800px;
            margin-top: 3rem;

            @media (max-width: 600px) {
              width: 100%;
              flex-direction: column;
            }
          `}>
          {!session && (
            <Link href="/auth/signin">
              <Card>
                <h3>Sign in &rarr;</h3>
                <p>Sign in to Storybook.</p>
              </Card>
            </Link>
          )}

          {session && (
            <>
              <Link href="/home">
                <Card>
                  <h3>Home &rarr;</h3>
                  <p>View your history book.</p>
                </Card>
              </Link>

              <Card onClick={() => signOut()}>
                <h3>Sign out &rarr;</h3>
                <p>Signed in as {session.user.email}</p>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Page
