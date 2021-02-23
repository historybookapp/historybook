import { FC } from 'react'
import tw, { css } from 'twin.macro'
import { Heading, IconButton, useDisclosure, Box } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

import AddRecordModal from './Home/AddRecordModal'

const NavBar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="header"
      h="4.5rem"
      position="sticky"
      d="flex"
      alignItems="center"
      top={0}
      left={0}
      right={0}
      backgroundColor="white"
      tw="shadow z-30">
      <nav tw="w-full max-w-7xl mx-auto px-7 flex justify-between items-center">
        <Heading as="div" size="md" fontWeight="bold" color="brand.500">
          Historybook
        </Heading>

        <div>
          <IconButton
            onClick={() => onOpen()}
            colorScheme="brand"
            aria-label="SearchBox database"
            fontSize="25px"
            borderRadius="10px"
            icon={<PlusSquareIcon />}
          />
        </div>
      </nav>

      <AddRecordModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default NavBar
