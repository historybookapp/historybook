import { NextPage } from 'next'
import tw, { css } from 'twin.macro'
import { Text, Heading, Stack } from '@chakra-ui/react'

const Page: NextPage = () => {
  return (
    <div
      css={[
        tw`flex flex-col justify-center items-center text-center`,
        css`
          min-height: 100vh;
        `,
      ]}>
      <Stack spacing={3}>
        <Heading>Check your email</Heading>
        <Text>A sign in link has been sent to your email address.</Text>
      </Stack>
    </div>
  )
}

export default Page
