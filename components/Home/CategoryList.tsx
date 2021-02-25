import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Box, Heading, useToken } from '@chakra-ui/react'
import tw, { css } from 'twin.macro'

import { fetchCategoryList } from '../../common/http'

const CategoryList: FC<{
  selectCategory?: (slug: string) => void
}> = ({ selectCategory }) => {
  const router = useRouter()
  const [orange100] = useToken(
    // the key within the theme, in this case `theme.colors`
    'colors',
    // the subkey(s), resolving to `theme.colors.red.100`
    ['orange.100'],
    // a single fallback or fallback array matching the length of the previous arg
  )
  const { data } = useQuery('categoryList', fetchCategoryList, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  function clickHandler(slug: string) {
    if (selectCategory) {
      selectCategory(slug)
    }
  }

  return (
    <>
      {data?.length ? (
        <Box>
          <Heading as="div" size="sm" my={4}>
            Categories
          </Heading>

          <Box d="flex" flexDirection="column" mt={3}>
            {data.map((category) => (
              <Box
                w="100%"
                ml={-4}
                key={category.slug}
                d="flex"
                alignItems="center">
                <Box
                  onClick={() => clickHandler(category.slug)}
                  w="100%"
                  px={4}
                  py={2}
                  borderRadius={7}
                  _hover={{ bg: 'orange.50', cursor: 'pointer' }}
                  css={[
                    tw`transition-colors`,
                    router.query.category === category.slug &&
                      css`
                        background-color: ${orange100};
                        font-weight: 600;

                        &:hover {
                          background-color: ${orange100};
                        }
                      `,
                  ]}>
                  {category.locales.default}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  )
}

export default CategoryList
