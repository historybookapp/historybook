import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import theme from '../styles/theme'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => (
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
