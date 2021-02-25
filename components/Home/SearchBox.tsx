import { SearchIcon } from '@chakra-ui/icons'
import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { SearchParams } from '../../types/api'

const SearchBox: FC<{
  onSearch?: (params: SearchParams) => void
  searchParams: SearchParams
}> = ({ onSearch, searchParams }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function validate(values: Record<string, any>): Record<string, string> {
    const errors: {
      keyword?: string
    } = {}

    if (!values.keyword || !values.keyword.trim()) {
      errors.keyword = 'Keyword is required'
    }

    return errors
  }

  function submitHandler(params: SearchParams): void {
    if (onSearch) {
      onSearch(params)
    }
    onClose()
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Search history"
        icon={<SearchIcon />}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search history</ModalHeader>

          <Formik
            validate={validate}
            validateOnBlur={false}
            initialValues={{ keyword: searchParams.keyword || '' }}
            onSubmit={(values) => {
              submitHandler(values)
            }}>
            {(f) => (
              <>
                <ModalBody>
                  <Form>
                    <Field name="keyword">
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.keyword && form.touched.keyword
                          }>
                          <Input
                            {...field}
                            autoComplete="off"
                            isRequired
                            autoFocus
                            placeholder="Type in a keyword"
                          />
                          <FormErrorMessage>
                            {form.errors.keyword}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Form>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="brand" onClick={f.submitForm}>
                    Search
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchBox
