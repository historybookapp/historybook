import { FC } from 'react'
import tw, { css } from 'twin.macro'
import NavBar from './NavBar'

const PageContainer: FC = (props) => {
  const { children } = props

  return (
    <div tw="flex flex-col fixed top-0 left-0 right-0 bottom-0 w-full h-full">
      <NavBar />
      {children}
    </div>
  )
}

export default PageContainer
