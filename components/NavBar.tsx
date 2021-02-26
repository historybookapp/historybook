import { useSession, signOut } from 'next-auth/client'
import { FC } from 'react'
import tw, { css } from 'twin.macro'
import {
  Heading,
  IconButton,
  useDisclosure,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import Link from 'next/link'

import AddRecordModal from './Home/AddRecordModal'

const NavBar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [session] = useSession()

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
      <nav tw="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Heading as="div" size="md" fontWeight="bold" color="brand.500">
          Historybook
        </Heading>

        <div tw="flex items-center space-x-5">
          <IconButton
            onClick={() => onOpen()}
            colorScheme="brand"
            aria-label="SearchBox database"
            fontSize="25px"
            borderRadius="10px"
            icon={<PlusSquareIcon />}
          />

          {session && (
            <Menu>
              <MenuButton>
                <Avatar
                  bg="gray.300"
                  name={session.user.name || undefined}
                  src={session.user.image || undefined}
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <Link href="/profile">
                    <MenuItem>My Account</MenuItem>
                  </Link>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>
      </nav>

      <AddRecordModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default NavBar
