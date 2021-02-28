import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import { FC } from 'react'
import tw, { css } from 'twin.macro'

import CategoryList from './CategoryList'

const SideDrawer: FC<{
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  selectCategory: (slug: string) => void
}> = ({ onClose, isOpen, selectCategory }) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody>
            <Box pl={4}>
              <CategoryList selectCategory={selectCategory} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default SideDrawer
