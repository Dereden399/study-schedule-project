import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { MyFieldProps, Schedule } from "../types";
import { Field, Form, Formik, FormikHelpers } from "formik";

interface InitValuesType {
  name: string;
  description: string;
}

const EditScheduleModal = ({
  isOpen,
  onClose,
  schedule,
}: {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
}) => {
  const initialValues: InitValuesType = {
    name: schedule.name,
    description: schedule.description || "",
  };

  const submitHandler = (
    values: InitValuesType,
    action: FormikHelpers<InitValuesType>
  ) => {
    console.log(values);
    action.setSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"xl"}>{schedule.name}</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {(props) => (
            <Form>
              <ModalBody>
                <VStack spacing={6} w="full">
                  <Field name="name">
                    {({
                      field,
                      form,
                    }: MyFieldProps<string, InitValuesType>) => (
                      <FormControl
                        isInvalid={
                          form.touched.name && Boolean(form.errors.name)
                        }
                      >
                        <FormLabel fontSize={"xl"}>New name</FormLabel>
                        <Input
                          placeholder="Name..."
                          type="text"
                          {...field}
                          size="lg"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({
                      field,
                      form,
                    }: MyFieldProps<string, InitValuesType>) => (
                      <FormControl
                        isInvalid={
                          form.touched.description &&
                          Boolean(form.errors.description)
                        }
                      >
                        <FormLabel fontSize={"xl"}>New description</FormLabel>
                        <Input
                          placeholder="Description..."
                          type="text"
                          {...field}
                          size="lg"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant={"ghost"}
                  mr={3}
                  onClick={onClose}
                  colorScheme="teal"
                >
                  Close
                </Button>
                <Button
                  colorScheme="teal"
                  type="submit"
                  isLoading={props.isSubmitting}
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default EditScheduleModal;
