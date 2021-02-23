import { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Box } from '@chakra-ui/react'
import tw, { css } from 'twin.macro'

import RecordList from '../../components/Home/RecordList'
import PageContainer from '../../components/PageContainer'

const Page: NextPage = () => {
  return (
    <PageContainer>
      <Head>
        <title>Home</title>
      </Head>

      <div tw="w-full max-w-7xl mx-auto flex">
        <Box
          position="sticky"
          top="6rem"
          w="300px"
          h="100%"
          overflowY="scroll"
          p={6}
          css={css`
            height: calc(((100vh - 1.5rem) - 64px) - 42px);
            overscroll-behavior: contain;
          `}>
          <p>Side bar</p>
        </Box>
        <Box flex="1" overflowY="scroll" tw="px-4 sm:px-6 xl:px-8 pt-10 pb-10">
          <Heading as="h2" size="md">
            My History
          </Heading>

          <Box mt={5}>
            <RecordList />
          </Box>
        </Box>
      </div>
    </PageContainer>
  )
}

export default Page
