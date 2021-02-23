import { FC } from 'react'
import tw, { css } from 'twin.macro'
import NavBar from './NavBar'

const PageContainer: FC = (props) => {
  const { children } = props

  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default PageContainer
