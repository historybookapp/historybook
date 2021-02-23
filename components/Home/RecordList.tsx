import { FC, Fragment } from 'react'
import { VStack, Button } from '@chakra-ui/react'

import useRecordList from '../../hooks/use-record-list'
import RecordItem from './RecordItem'

const RecordList: FC = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useRecordList()

  return (
    <>
      {data && (
        <VStack spacing={5} alignItems="stretch">
          {data.pages.map((group, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              {group.list.map((record) => {
                return <RecordItem key={record.hid} record={record} />
              })}
            </Fragment>
          ))}
        </VStack>
      )}

      <Button
        mt={5}
        w="100%"
        colorScheme="brand"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isFetchingNextPage
          ? 'Loading...'
          : !hasNextPage
          ? 'No more records'
          : 'Load More'}
      </Button>
    </>
  )
}

export default RecordList
