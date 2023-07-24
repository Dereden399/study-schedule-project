import {
  Button,
  Flex,
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
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { DatePicker } from "./DatePicker";
import { Course, MyFieldProps } from "../types";
import { useEffect } from "react";

interface InitValuesType {
  title: string;
  start: Date;
  end: Date;
  info: string;
  allDay: boolean;
}

const nowTime = new Date(Date.now());

const initialValues: InitValuesType = {
  title: "",
  start: new Date(nowTime.setHours(0, 0, 0, 0)),
  end: new Date(nowTime.setHours(1, 0, 0, 0)),
  info: "",
  allDay: false,
};

const EditCourseModal = ({
  course,
  isOpen,
  onClose,
}: {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (course) {
      initialValues.title = course.title;
      initialValues.info = course.info || "";
      initialValues.allDay = course.allDay;
      initialValues.start = course.start;
      initialValues.end = course.end;
    }
  }, [course]);

  const submitHandler = (
    values: InitValuesType,
    action: FormikHelpers<InitValuesType>
  ) => {
    console.log(values);
    action.setSubmitting(false);
    onClose();
  };

  if (!course) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"xl"}>{course.title}</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          {(props) => (
            <Form>
              <ModalBody>
                <VStack spacing={6} w="full">
                  <Field name="title">
                    {({
                      field,
                      form,
                    }: MyFieldProps<string, InitValuesType>) => (
                      <FormControl
                        isInvalid={
                          form.touched.title && Boolean(form.errors.title)
                        }
                      >
                        <FormLabel fontSize={"xl"}>New name</FormLabel>
                        <Input
                          placeholder="Name..."
                          type="text"
                          {...field}
                          size="lg"
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="info">
                    {({ field }: MyFieldProps<string, InitValuesType>) => (
                      <FormControl>
                        <FormLabel fontSize={"xl"}>New info</FormLabel>
                        <Textarea
                          placeholder="Info..."
                          resize={"none"}
                          {...field}
                          size="lg"
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Flex
                    w="full"
                    direction={{ base: "column", md: "row" }}
                    gap={1}
                  >
                    <Field name="allDay">
                      {({ field }: MyFieldProps<number, InitValuesType>) => (
                        <FormControl maxW="6rem">
                          <FormLabel fontSize={"xl"}>All day?</FormLabel>
                          <Switch
                            size={"lg"}
                            colorScheme="teal"
                            {...field}
                            defaultChecked={course.allDay}
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="start">
                      {({
                        field,
                        form,
                      }: MyFieldProps<Date, InitValuesType>) => (
                        <FormControl>
                          <FormLabel fontSize={"xl"}>New start date</FormLabel>
                          <DatePicker
                            value={field.value}
                            onChange={(val) =>
                              form.setFieldValue(field.name, val)
                            }
                            showTime={!form.values.allDay}
                          />
                        </FormControl>
                      )}
                    </Field>
                    {!props.values.allDay && (
                      <Field name="end">
                        {({
                          field,
                          form,
                        }: MyFieldProps<Date, InitValuesType>) => (
                          <FormControl>
                            <FormLabel fontSize={"xl"}>New end date</FormLabel>
                            <DatePicker
                              value={field.value}
                              onChange={(val) =>
                                form.setFieldValue(field.name, val)
                              }
                              showTime
                            />
                          </FormControl>
                        )}
                      </Field>
                    )}
                  </Flex>
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

export default EditCourseModal;
