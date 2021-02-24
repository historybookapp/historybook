import { FC } from 'react'
import tw, { css } from 'twin.macro'
import NavBar from './NavBar'

const PageContainer: FC = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default PageContainer
