import { FC } from 'react'
import tw, { css } from 'twin.macro'
import Head from 'next/head'

import NavBar from './NavBar'

const PageContainer: FC<{
  title?: string
}> = ({ children, title = 'Historybook' }) => {
  return (
    <>
      <Head>{title && <title>{title}</title>}</Head>
      <NavBar />
      <div tw="w-full max-w-7xl mx-auto">{children}</div>
    </>
  )
}

export default PageContainer
