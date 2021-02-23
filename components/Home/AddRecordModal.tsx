import { FC, useState } from 'react'
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  FormControl,
  Input,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useQueryClient } from 'react-query'

import httpClient, { getErrorMessage } from '../../common/http'
import { LookUpWebResponse } from '../../types/api'
import RecordItem from './RecordItem'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const AddRecordModal: FC<Props> = ({ isOpen, onClose }) => {
  const [result, setResult] = useState<LookUpWebResponse>()
  const [isAdding, setIsAdding] = useState(false)
  const toast = useToast()
  const queryClient = useQueryClient()

  async function lookupURL(url: string): Promise<void> {
    const json = await httpClient
      .get<LookUpWebResponse>('/lookup/web', {
        params: {
          url,
        },
      })
      .then((res) => res.data)

    setResult(json)
  }

  function validateURL(value: string): string | undefined {
    let error
    if (!value) {
      error = 'URL is required'
    } else if (!value.startsWith('http')) {
      error = 'Please input a valid URL'
    }
    return error
  }

  function onCloseHandler(): void {
    onClose()
    setResult(undefined)
  }

  function onAddRecord(record: LookUpWebResponse): void {
    setIsAdding(true)

    httpClient
      .post('/records', {
        ...record,
      })
      .then(() => {
        onCloseHandler()

        return queryClient.resetQueries('recordList')
      })
      .catch((err) => {
        toast({
          title: 'An error occurred.',
          description: getErrorMessage(err),
          status: 'error',
          isClosable: true,
        })
      })
      .finally(() => {
        setIsAdding(false)
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Record</ModalHeader>
        <ModalCloseButton />

        <Formik
          validateOnBlur={false}
          initialValues={{ url: '' }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            lookupURL(values.url)
              .catch((err) => {
                actions.setFieldError('url', getErrorMessage(err))
              })
              .finally(() => {
                actions.setSubmitting(false)
              })
          }}>
          {(f) => (
            <>
              <ModalBody>
                <Form>
                  <Field name="url" validate={validateURL}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.url && form.touched.url}>
                        <Input
                          {...field}
                          autoComplete="off"
                          autoFocus
                          type="url"
                          placeholder="https://example.com"
                        />
                        <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Form>

                {result && (
                  <Box mt={5}>
                    <RecordItem record={result} clickable={false} />
                  </Box>
                )}
              </ModalBody>

              <ModalFooter>
                <HStack spacing={2}>
                  <Button
                    variant="ghost"
                    onClick={f.submitForm}
                    isLoading={f.isSubmitting}>
                    Look Up
                  </Button>

                  {result && (
                    <Button
                      colorScheme="brand"
                      onClick={() => onAddRecord(result)}
                      isLoading={isAdding}>
                      Add
                    </Button>
                  )}
                </HStack>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

export default AddRecordModal
