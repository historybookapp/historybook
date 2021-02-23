import { useInfiniteQuery } from 'react-query'

import { fetcher } from '../common/http'
import { Prisma } from '../common/prisma'

const pageSize = 15
const fetchRecordList = ({ pageParam }: { pageParam?: string }) =>
  fetcher(
    `/records?size=${pageSize}${pageParam ? `&nextCursor=${pageParam}` : ''}`,
  )

export default function useRecordList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<{
    list: (Prisma.RecordGetPayload<{
      include: {
        media: true
        tags: true
      }
    }> & { hid: string })[]
    nextCursor: string
  }>('recordList', fetchRecordList, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  })

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }
}
