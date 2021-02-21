import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#ffefdb',
    100: '#ffd9ad',
    200: '#fec57e',
    300: '#fdb54d',
    400: '#fca71c',
    500: '#e37f03',
    600: '#b05600',
    700: '#7f3500',
    800: '#4d1a00',
    900: '#1d0500',
  },
}
const theme = extendTheme({ colors })

export default theme
