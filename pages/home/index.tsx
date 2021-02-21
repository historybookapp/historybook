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

      <div tw="w-full max-w-7xl mx-auto flex flex-1 space-x-7 overflow-hidden">
        <Box w="300px" h="100%" overflowY="scroll" p={7}>
          <p>side bar</p>
        </Box>
        <Box flex="1" h="100%" overflowY="scroll" p={7}>
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
