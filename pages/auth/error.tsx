import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Text, Heading, Button, Stack } from '@chakra-ui/react'
import tw, { css } from 'twin.macro'

const Page: NextPage = () => {
  const router = useRouter()
  const error = (router.query.error as string | undefined) || 'default'
  const signinPageUrl = '/auth/signin'

  const errors: {
    [key: string]: {
      heading: string
      message: JSX.Element
      signin?: JSX.Element
    }
  } = {
    default: {
      heading: 'Error',
      message: (
        <Button as="a" href="/">
          Go back to Historybook
        </Button>
      ),
    },
    configuration: {
      heading: 'Server error',
      message: (
        <>
          <Text>There is a problem with the server configuration.</Text>
          <Text>Check the server logs for more information.</Text>
        </>
      ),
    },
    accessdenied: {
      heading: 'Access Denied',
      message: <Text>You do not have permission to sign in.</Text>,
      signin: (
        <Button as="a" href={signinPageUrl}>
          Sign in
        </Button>
      ),
    },
    verification: {
      heading: 'Unable to sign in',
      message: (
        <>
          <Text>The sign in link is no longer valid.</Text>
          <Text>It may have been used already or it may have expired.</Text>
        </>
      ),
      signin: (
        <Button as="a" href={signinPageUrl}>
          Sign in
        </Button>
      ),
    },
  }

  const { heading, message, signin } = errors[error.toLowerCase()]

  return (
    <div
      css={[
        tw`flex flex-col justify-center items-center text-center`,
        css`
          min-height: 100vh;
        `,
      ]}>
      <Stack spacing={3}>
        <Heading>{heading}</Heading>
        <Box>{message}</Box>
        <Box>{signin}</Box>
      </Stack>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const error = (query.error as string | undefined) || 'default'

  if (
    [
      'Signin',
      'OAuthSignin',
      'OAuthCallback',
      'OAuthCreateAccount',
      'EmailCreateAccount',
      'Callback',
      'OAuthAccountNotLinked',
      'EmailSignin',
      'CredentialsSignin',
    ].includes(error)
  ) {
    return {
      redirect: {
        destination: `${process.env.NEXT_PUBLIC_SITE}/auth/signin?error=${error}`,
        permanent: false,
      },
    }
  }

  const errors: {
    [key: string]: {
      statusCode: number
    }
  } = {
    default: {
      statusCode: 200,
    },
    configuration: {
      statusCode: 500,
    },
    accessdenied: {
      statusCode: 403,
    },
    verification: {
      statusCode: 403,
    },
  }
  const { statusCode } = errors[error.toLowerCase()]

  res.statusCode = statusCode

  return {
    props: {},
  }
}

export default Page
