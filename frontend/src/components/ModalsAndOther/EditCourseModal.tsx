import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { DatePicker } from "../DatePicker/DatePicker";
import { CalendarEvent, MyFieldProps } from "../../types";
import useAppDispatch from "../../hooks/useAppDispatch";
import editCourse from "../../store/reducers/actions/editCourse";
import { useRef } from "react";
import deleteCourse from "../../store/reducers/actions/deleteCourse";

interface InitValuesType {
  title: string;
  start: Date;
  end: Date;
  info: string;
  allDay: boolean;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
});

const EditCourseModal = ({
  course,
  isOpen,
  onClose,
}: {
  course: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const cancelBtnRef = useRef(null);
  if (!course) return null;
  const initialValues: InitValuesType = {
    title: course.title,
    start: course.start,
    end: course.end,
    info: course.info || "",
    allDay: course.allDay,
  };
  const submitHandler = async (
    values: InitValuesType,
    action: FormikHelpers<InitValuesType>
  ) => {
    const result = await dispatch(
      editCourse({
        ...values,
        start: values.start.toISOString(),
        end: values.end.toISOString(),
        id: course.id,
      })
    );
    action.setSubmitting(false);
    if (result.meta.requestStatus === "fulfilled") {
      onClose();
    }
  };

  const deleteHandler = () => {
    dispatch(deleteCourse(course.id));
    onAlertClose();
    onClose();
  };

  return (
    <>
      <AlertDialog
        size="xl"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        leastDestructiveRef={cancelBtnRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="3xl" fontWeight="bold">
              Delete Course
            </AlertDialogHeader>

            <AlertDialogBody fontSize="xl">
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelBtnRef} onClick={onAlertClose} size="lg">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteHandler}
                ml={3}
                size="lg"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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

          <Formik
            initialValues={initialValues}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
          >
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
                          <FormErrorMessage>
                            {form.errors.title}
                          </FormErrorMessage>
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
                            <FormLabel fontSize={"xl"}>
                              New start date
                            </FormLabel>
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
                              <FormLabel fontSize={"xl"}>
                                New end date
                              </FormLabel>
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
                  <Flex justifyContent={"space-between"} w="full">
                    <Button
                      variant={"outline"}
                      colorScheme="red"
                      onClick={onAlertOpen}
                    >
                      Delete
                    </Button>
                    <Box>
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
                    </Box>
                  </Flex>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCourseModal;
