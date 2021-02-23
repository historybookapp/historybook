import { FC } from 'react'
import tw, { css } from 'twin.macro'
import { Heading, IconButton, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

import AddRecordModal from './Home/AddRecordModal'

const NavBar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div tw="h-20 shadow sticky flex items-center">
      <nav tw="w-full max-w-7xl mx-auto px-7 flex justify-between items-center">
        <Heading as="div" size="md" fontWeight="bold" color="brand.500">
          Historybook
        </Heading>

        <div>
          <IconButton
            onClick={() => onOpen()}
            colorScheme="brand"
            aria-label="Search database"
            fontSize="25px"
            borderRadius="10px"
            icon={<PlusSquareIcon />}
          />
        </div>
      </nav>

      <AddRecordModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default NavBar
