import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import tw, { css } from 'twin.macro'
import { useSession, signIn, csrfToken } from 'next-auth/client'
import { Input, Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props,
) => {
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
    await signIn('email', { email, csrfToken: props.csrfToken })
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

        <div tw="mt-10">
          <Formik
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
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}>
                      <Input
                        {...field}
                        autoFocus
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
                  colorScheme="green"
                  isLoading={f.isSubmitting}
                  type="submit">
                  Sign in with email
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  csrfToken: string
}> = async (context) => {
  return {
    props: {
      csrfToken: await csrfToken(context),
    },
  }
}

export default Page
