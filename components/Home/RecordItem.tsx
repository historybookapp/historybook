import { useRouter } from 'next/router'
import { FC } from 'react'
import {
  Box,
  AspectRatio,
  Image,
  IconButton,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useQueryClient } from 'react-query'
import tw, { css } from 'twin.macro'

import { deleteRecord, getErrorMessage } from '../../common/http'
import { RecordListItem } from '../../hooks/use-record-list'
import { LookUpWebMedium, LookUpWebResponse } from '../../types/api'
import HBImage from '../HBImage'

dayjs.extend(relativeTime)

interface Props {
  record: RecordListItem | LookUpWebResponse
  clickable?: boolean
}

const Wrapper: FC<{ clickable: boolean; url: string }> = ({
  children,
  clickable,
  url,
}) => {
  return clickable ? (
    <a href={url} target="__blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
  )
}

const RecordItem: FC<Props> = ({ record, clickable = true }) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const router = useRouter()

  function onDeleteRecord(hid: string): void {
    deleteRecord(hid)
      .then(() => {
        return queryClient.invalidateQueries('recordList')
      })
      .catch((err) => {
        toast({
          title: 'An error occurred.',
          description: getErrorMessage(err),
          status: 'error',
          isClosable: true,
        })
      })
  }

  function viewMore(domain: string): void {
    const { query } = router
    const newQuery = new URLSearchParams({
      domain,
    })

    Object.keys(query).forEach((key) => {
      newQuery.set(key, query[key] as string)
    })

    router.push(`/home?${newQuery.toString()}`)
  }

  return (
    <Wrapper clickable={clickable} url={record.url}>
      <Box
        px={4}
        py={3}
        bg="brand.50"
        borderWidth="1px"
        borderColor="brand.100"
        borderRadius="lg"
        overflow="hidden"
        d="flex"
        css={[
          clickable &&
            css`
              &:hover .record-title {
                text-decoration: underline;
              }
            `,
        ]}>
        <Box tw="flex w-full flex-col md:flex-row">
          <Box d="flex" flexDirection="column" overflow="hidden" w="100%">
            <Box fontWeight="semibold" as="h4" className="record-title">
              <span>{record.title}</span>
            </Box>

            <Box
              mt={2}
              fontSize="sm"
              color="gray.700"
              isTruncated
              d="flex"
              flexDir="row"
              alignItems="center">
              {record.favicon && (
                <AspectRatio w="16px" h="16px" ratio={1} mr={2}>
                  <Image src={record.favicon} objectFit="cover" />
                </AspectRatio>
              )}
              <span>
                {record.domain}
                {record.createdAt && ` · ${dayjs(record.createdAt).fromNow()}`}
              </span>
            </Box>

            {record.description && <Box mt={2}>{record.description}</Box>}
          </Box>

          {record.media.length ? (
            <Box
              flex={1}
              d="flex"
              tw="ml-0 mt-3 md:mt-0 md:ml-4"
              alignItems="center"
              justifyContent="center">
              <AspectRatio w="180px" ratio={4 / 3}>
                <HBImage
                  src={
                    (record.media[0] as LookUpWebMedium).url ||
                    record.media[0].source
                  }
                  alt={record.media[0].name}
                  objectFit="contain"
                  align="center"
                />
              </AspectRatio>
            </Box>
          ) : undefined}
        </Box>

        {clickable && record.hid && (
          <Box tw="mt-0 ml-4 flex flex-col space-y-5 justify-center items-center">
            <Tooltip label="Delete record">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()

                  if (record.hid) {
                    onDeleteRecord(record.hid)
                  }
                }}
                variant="ghost"
                aria-label="Delete record"
                size="sm"
                icon={<DeleteIcon />}
                css={[tw`text-gray-600 bg-white focus:shadow-none`]}
              />
            </Tooltip>

            <Tooltip label="View more from this site">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()

                  viewMore(record.domain)
                }}
                variant="ghost"
                aria-label="View more from this site"
                size="sm"
                icon={<ViewIcon />}
                css={[tw`text-gray-600 bg-white focus:shadow-none`]}
              />
            </Tooltip>
          </Box>
        )}
      </Box>
    </Wrapper>
  )
}

export default RecordItem
