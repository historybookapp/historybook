import { useInfiniteQuery } from 'react-query'

import { fetcher } from '../common/http'
import { Prisma } from '../common/prisma'
import { SearchParams } from '../types/api'

const pageSize = 15

export type RecordListItem = Prisma.RecordGetPayload<{
  include: {
    media: true
    tags: true
  }
}> & { hid: string }

export default function useRecordList(searchParams: SearchParams = {}) {
  function fetchRecordList({ pageParam }: { pageParam?: string }) {
    const url = new URL(
      `/api/records?scene=card&size=${pageSize}`,
      window.location.origin,
    )

    if (pageParam) {
      url.searchParams.set('nextCursor', pageParam)
    }

    Object.keys(searchParams).forEach((key) => {
      if (typeof searchParams[key] !== 'undefined') {
        url.searchParams.set(key, <string>searchParams[key])
      }
    })

    return fetcher(url.toString())
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<{
    list: RecordListItem[]
    nextCursor: string | null
  }>(['recordList', searchParams], fetchRecordList, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: true,
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
