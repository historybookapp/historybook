import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import tw, { css } from 'twin.macro'
import {
  signIn,
  getCsrfToken,
  getProviders,
  SessionProvider,
} from 'next-auth/client'
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import Boom from '@hapi/boom'

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ csrfToken, providers }) => {
  const router = useRouter()
  const callbackUrl =
    (router.query.callbackUrl as string | undefined) ||
    `${process.env.NEXT_PUBLIC_SITE}/home`
  const loginError = router.query.error as string | undefined

  const loginErrors: { [key: string]: string } = {
    Signin: 'Try signing with a different account.',
    OAuthSignin: 'Try signing with a different account.',
    OAuthCallback: 'Try signing with a different account.',
    OAuthCreateAccount: 'Try signing with a different account.',
    EmailCreateAccount: 'Try signing with a different account.',
    Callback: 'Try signing with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  }

  function validateEmail(value: string): string | undefined {
    let error
    if (!value) {
      error = 'Email is required'
    } else if (!value.includes('@')) {
      error = 'Please input a valid email address'
    }
    return error
  }

  async function signInWithEmail(email: string): Promise<void> {
    await signIn('email', { email, csrfToken, callbackUrl })
  }

  return (
    <div
      css={[
        tw`flex justify-center items-center`,
        css`
          min-height: 100vh;
        `,
      ]}>
      <Head>
        <title>Sign in</title>
      </Head>

      <main tw="max-w-xl w-full mx-auto px-10 justify-center items-center">
        <h1 tw="text-3xl font-bold text-center">Sign in</h1>

        <div tw="mt-7">
          {loginError && (
            <Text
              tw="px-5 py-3 mb-7 rounded-md font-bold"
              color="red.700"
              bg="red.50">
              {loginErrors[loginError] || 'An error occurred.'}
            </Text>
          )}

          <Formik
            validateOnBlur={false}
            initialValues={{ email: '' }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true)
              signInWithEmail(values.email).finally(() => {
                actions.setSubmitting(false)
              })
            }}>
            {(f) => (
              <Form>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}>
                      <Input
                        {...field}
                        required
                        type="email"
                        placeholder="john@appleseed.com"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  tw="mt-4"
                  colorScheme="brand"
                  isLoading={f.isSubmitting}
                  type="submit">
                  Sign in with email
                </Button>
              </Form>
            )}
          </Formik>

          <hr tw="mt-5" />

          <div tw="space-y-5 flex flex-col items-center justify-center">
            {Object.keys(providers).map((key) => {
              const provider = providers[key]

              return (
                <div key={key}>
                  {provider.type === 'oauth' && (
                    <form action={provider.signinUrl} method="POST">
                      <input type="hidden" name="csrfToken" value={csrfToken} />

                      <Button type="submit" tw="">
                        Sign in with {provider.name}
                      </Button>
                    </form>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  csrfToken: string
  providers: {
    [provider: string]: SessionProvider
  }
}> = async ({ req }) => {
  const csrfToken = await getCsrfToken({ req })
  const providers = await getProviders()

  if (!csrfToken) {
    throw Boom.badImplementation('Could not generate csrfToken.')
  }

  if (!providers) {
    throw Boom.badImplementation('Could not get providers.')
  }

  return {
    props: {
      csrfToken,
      providers,
    },
  }
}

export default Page
