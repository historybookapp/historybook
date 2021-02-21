import { FC } from 'react'
import tw, { css } from 'twin.macro'
import { Heading } from '@chakra-ui/react'

const NavBar: FC = () => {
  return (
    <div tw="h-20 shadow sticky flex items-center">
      <nav tw="w-full max-w-7xl mx-auto px-7 flex justify-between items-center">
        <Heading as="div" size="md" fontWeight="bold" color="brand.500">
          Historybook
        </Heading>
        <div>Right menu icons</div>
      </nav>
    </div>
  )
}

export default NavBar
