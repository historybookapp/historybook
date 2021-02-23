import {
  Center,
  forwardRef,
  Image as OriginalImage,
  ImageProps,
} from '@chakra-ui/react'
import tw, { css } from 'twin.macro'
import { FC } from 'react'

const Fallback: FC = () => {
  return (
    <Center bg="white" color="brand.500">
      <span tw="relative flex h-3 w-3">
        <span tw="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
        <span tw="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
      </span>
    </Center>
  )
}

const Image = forwardRef<ImageProps, 'img'>((props, ref) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <OriginalImage ref={ref} {...props} fallback={<Fallback />} />
))

export default Image
