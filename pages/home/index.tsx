import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { getSession } from 'next-auth/client'
import {
  Heading,
  Box,
  Text,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import tw, { css } from 'twin.macro'
import loadable from '@loadable/component'

import CategoryList from '../../components/Home/CategoryList'
import RecordList from '../../components/Home/RecordList'
import SearchBox from '../../components/Home/SearchBox'
import PageContainer from '../../components/PageContainer'
import { SearchParams } from '../../types/api'

const SideDrawer = loadable(() => import('../../components/Home/SideDrawer'))

const Page: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [searchParams, setSearchParams] = useState<SearchParams>({})
  const hasSearchKeys = useMemo(() => {
    return searchParams.category || searchParams.keyword || searchParams.domain
  }, [searchParams])

  const changeRoute = (params: Partial<SearchParams>) => {
    const urlParams = new URLSearchParams()

    Object.keys(params).forEach((key) => {
      const val = params[key]
      if (typeof val !== 'undefined') {
        urlParams.set(key, val)
      }
    })

    const urlParamsString = urlParams.toString()

    router.push(`/home${urlParamsString ? `?${urlParamsString}` : ''}`)
  }

  const onSearch = (params: SearchParams) => {
    changeRoute({
      ...searchParams,
      ...params,
    })
  }

  const onSelectCategory = (category: string) => {
    onClose()
    changeRoute({
      ...searchParams,
      category,
    })
  }

  const onClearSearch = () => {
    changeRoute({})
  }

  useEffect(() => {
    const result: Partial<SearchParams> = {}

    if (router.query.keyword) {
      result.keyword = router.query.keyword as string
    } else {
      result.keyword = undefined
    }
    if (router.query.category) {
      result.category = router.query.category as string
    } else {
      result.category = undefined
    }
    if (router.query.domain) {
      result.domain = router.query.domain as string
    } else {
      result.domain = undefined
    }
    console.log(result)
    setSearchParams((val) => ({
      ...val,
      ...result,
    }))
  }, [router.query])

  return (
    <PageContainer title="Home">
      <div tw="flex md:px-4">
        <Box
          position="sticky"
          top="6rem"
          w="300px"
          overflowY="scroll"
          css={[
            tw`hidden md:block py-6 pl-4 pr-6`,
            css`
              height: calc(((100vh - 1.5rem) - 64px) - 42px);
              overscroll-behavior: contain;
            `,
          ]}>
          <CategoryList selectCategory={onSelectCategory} />
        </Box>

        <Box css={[tw`block md:hidden`]}>
          <SideDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            selectCategory={onSelectCategory}
          />
        </Box>

        <Box
          flex="1"
          overflowY="scroll"
          css={[
            tw`pr-6 md:pr-2 pl-6 pt-10 pb-10`,
            css`
              min-height: calc(100vh - 4.5rem);
            `,
          ]}>
          <Heading
            as="h2"
            size="md"
            d="flex"
            justifyContent="space-between"
            alignItems="center">
            <span>My History</span>

            <div tw="space-x-5">
              <IconButton
                tw="inline-flex md:hidden"
                onClick={() => onOpen()}
                aria-label="Open side bar"
                icon={<HamburgerIcon />}
              />

              <SearchBox searchParams={searchParams} onSearch={onSearch} />
            </div>
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
                {searchParams.category ? (
                  <Text>
                    <b>Category:</b> {searchParams.category}
                  </Text>
                ) : undefined}

                {searchParams.keyword ? (
                  <Text>
                    <b>Keyword:</b> {searchParams.keyword}
                  </Text>
                ) : undefined}

                {searchParams.domain ? (
                  <Text>
                    <b>Domain:</b> {searchParams.domain}
                  </Text>
                ) : undefined}
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
