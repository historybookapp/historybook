import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../styles/theme'

const App = ({ Component, pageProps }: AppProps) => (
  <div>
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  </div>
)

export default App
