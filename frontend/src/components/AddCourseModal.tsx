import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { DatePicker } from "./DatePicker";
import { MyFieldProps } from "../types";

interface InitValuesType {
  name: string;
  startDate: Date;
  endDate: Date;
  info: string;
}

const nowTime = new Date(Date.now());

const initialValues: InitValuesType = {
  name: "",
  startDate: new Date(nowTime.setHours(12, 0, 0, 0)),
  endDate: new Date(nowTime.setHours(13, 0, 0, 0)),
  info: "",
};

const AddCourseModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const textGrayColor = useColorModeValue("gray.600", "gray.400");

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
        <ModalHeader fontSize={"xl"}>Add Course</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {(props) => (
            <Form>
              <ModalBody>
                <VStack spacing={6}>
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
                        <FormLabel fontSize={"xl"}>Course's name</FormLabel>
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
                  <Field name="info">
                    {({ field }: MyFieldProps<string, InitValuesType>) => (
                      <FormControl>
                        <FormLabel fontSize={"xl"}>
                          Additional info (Optional)
                        </FormLabel>
                        <Textarea
                          placeholder="Info..."
                          resize={"none"}
                          {...field}
                          size="lg"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <HStack justifyContent={"space-between"} w="full">
                    <Field name="startDate">
                      {({
                        field,
                        form,
                      }: MyFieldProps<Date, InitValuesType>) => (
                        <FormControl>
                          <FormLabel fontSize={"xl"}>Starts</FormLabel>
                          <DatePicker
                            value={field.value}
                            onChange={(val) =>
                              form.setFieldValue(field.name, val)
                            }
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="endDate">
                      {({
                        field,
                        form,
                      }: MyFieldProps<Date, InitValuesType>) => (
                        <FormControl>
                          <FormLabel fontSize={"xl"}>Ends</FormLabel>
                          <DatePicker
                            value={field.value}
                            onChange={(val) =>
                              form.setFieldValue(field.name, val)
                            }
                          />
                        </FormControl>
                      )}
                    </Field>
                  </HStack>
                  <Text
                    color={textGrayColor}
                    hidden={
                      props.values.startDate.getTime() !==
                      props.values.endDate.getTime()
                    }
                    as="i"
                  >
                    Runs all day
                  </Text>
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
                  Add
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddCourseModal;
