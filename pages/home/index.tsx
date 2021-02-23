import { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Box, Text, Button } from '@chakra-ui/react'
import { useState } from 'react'
import tw, { css } from 'twin.macro'

import RecordList from '../../components/Home/RecordList'
import SearchBox from '../../components/Home/SearchBox'
import PageContainer from '../../components/PageContainer'
import { SearchParams } from '../../types/api'

const Page: NextPage = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({})
  const hasSearchKeys = Object.keys(searchParams).length > 0

  const onSearch = (params: SearchParams) => {
    setSearchParams((val) => ({
      ...val,
      ...params,
    }))
  }

  const onClearSearch = () => {
    setSearchParams({})
  }

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
          <Heading
            as="h2"
            size="md"
            d="flex"
            justifyContent="space-between"
            alignItems="center">
            <span>My History</span>

            <SearchBox searchParams={searchParams} onSearch={onSearch} />
          </Heading>

          {hasSearchKeys && (
            <Box
              mt={5}
              bg="gray.50"
              py={2}
              px={4}
              borderRadius={6}
              d="flex"
              justifyContent="space-between"
              alignItems="center">
              <Box>
                {searchParams.keyword ? (
                  <Text>
                    <b>Keyword:</b> {searchParams.keyword}
                  </Text>
                ) : (
                  undefined
                )}
              </Box>

              <Button onClick={() => onClearSearch()} variant="ghost">
                Clear
              </Button>
            </Box>
          )}

          <Box mt={5}>
            <RecordList searchParams={searchParams} />
          </Box>
        </Box>
      </div>
    </PageContainer>
  )
}

export default Page
