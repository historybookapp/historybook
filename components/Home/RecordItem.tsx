import { FC } from 'react'
import { Box, AspectRatio, Image } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import tw, { css } from 'twin.macro'

import { Prisma } from '../../common/prisma'

dayjs.extend(relativeTime)

interface Props {
  record: Prisma.RecordGetPayload<{
    include: {
      media: true
      tags: true
    }
  }> & { hid: string }
}

const RecordItem: FC<Props> = (props) => {
  const { record } = props

  return (
    <a href={record.url} target="__blank" rel="noreferrer">
      <Box
        px={4}
        py={3}
        bg="brand.50"
        borderWidth="1px"
        borderColor="brand.100"
        borderRadius="lg"
        overflow="hidden"
        d="flex"
        css={css`
          &:hover .record-title {
            text-decoration: underline;
          }
        `}>
        <Box d="flex" flexDirection="column" overflow="hidden">
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
              <AspectRatio w="18px" h="18px" ratio={1} mr={1}>
                <Image src={record.favicon} objectFit="cover" />
              </AspectRatio>
            )}
            <span>
              {record.domain} · {dayjs(record.createdAt).fromNow()}
            </span>
          </Box>

          {record.description && <Box mt={2}>{record.description}</Box>}
        </Box>

        {record.media.length ? (
          <Box flex={1} ml={4}>
            <AspectRatio w="180px" ratio={4 / 3}>
              <Image
                src={record.media[0].source}
                alt={record.media[0].name}
                objectFit="cover"
              />
            </AspectRatio>
          </Box>
        ) : (
          undefined
        )}
      </Box>
    </a>
  )
}

export default RecordItem
