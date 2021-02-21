import { FC } from 'react'
import { useSWRInfinite } from 'swr'
import get from 'lodash/get'
import { VStack, Button, Text } from '@chakra-ui/react'

import { fetcher } from '../../common/http'
import { Prisma } from '../../common/prisma'
import RecordItem from './RecordItem'

const pageSize = 15
const getRequestKey = (pageIndex: number, previousPageData) => {
  // reached the end
  if (previousPageData && !get(previousPageData, 'data.list').length) {
    return null
  }
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `/records?size=${pageSize}`
  // add the cursor to the API endpoint
  return `/records?lastRecordHid=${previousPageData.data.lastRecordHid}&size=${pageSize}`
}

const RecordList: FC = () => {
  const { data, error, size, setSize } = useSWRInfinite<{
    data: {
      list: (Prisma.RecordGetPayload<{
        include: {
          media: true
          tags: true
        }
      }> & { hid: string })[]
    }
  }>(getRequestKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.data?.list?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data?.list?.length < pageSize)

  return (
    <>
      {!data && (
        <Text my={5} textAlign="center" fontSize="xl">
          loading...
        </Text>
      )}

      {data && (
        <>
          <VStack spacing={5}>
            {data.map((records) => {
              return records.data.list.map((record) => {
                return <RecordItem key={record.hid} record={record} />
              })
            })}
          </VStack>

          <Button
            mt={5}
            w="100%"
            colorScheme="brand"
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore || isReachingEnd}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoadingMore
              ? 'loading...'
              : isReachingEnd
              ? 'no more records'
              : 'load more'}
          </Button>
        </>
      )}
    </>
  )
}

export default RecordList
