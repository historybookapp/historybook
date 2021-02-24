import { FC } from 'react'
import { Box, AspectRatio } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import tw, { css } from 'twin.macro'

import { Prisma } from '../../common/prisma'
import { LookUpWebMedium, LookUpWebResponse } from '../../types/api'
import Image from '../Image'

dayjs.extend(relativeTime)

interface Props {
  record:
    | Prisma.RecordGetPayload<{
        include: {
          media: true
          tags: true
        }
      }>
    | LookUpWebResponse
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
          <Box flex={1} ml={4} d="flex" alignItems="center">
            <AspectRatio w="180px" ratio={4 / 3}>
              <Image
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
    </Wrapper>
  )
}

export default RecordItem
