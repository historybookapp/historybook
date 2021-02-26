import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/base.css'
import { isServer } from '../common/utils'
import theme from '../styles/theme'

if (isServer()) {
  if (!process.env.NEXT_PUBLIC_SITE) {
    throw new Error('Please define NEXT_PUBLIC_SITE in your .env file!')
  }

  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_SITE
}

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  </>
)

export default App
