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
import * as Yup from "yup";
import { DatePicker } from "../DatePicker/DatePicker";
import { MyFieldProps } from "../../types";
import useAppDispatch from "../../hooks/useAppDispatch";
import addCourse from "../../store/reducers/actions/addCourse";
import { useParams } from "react-router-dom";

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

const nowTime = new Date(Date.now());

const AddCourseModal = ({
  isOpen,
  onClose,
  initStart,
  initEnd,
}: {
  isOpen: boolean;
  onClose: () => void;
  initStart: Date | null;
  initEnd: Date | null;
}) => {
  const dispatch = useAppDispatch();
  const id = useParams().id;
  const initialValues: InitValuesType = {
    title: "",
    start: initStart || new Date(nowTime.setHours(0, 0, 0, 0)),
    end: initEnd || new Date(nowTime.setHours(1, 0, 0, 0)),
    info: "",
    allDay: false,
  };

  const submitHandler = async (
    values: InitValuesType,
    action: FormikHelpers<InitValuesType>
  ) => {
    const result = await dispatch(
      addCourse({
        course: {
          ...values,
          start: values.start.toISOString(),
          end: values.end.toISOString(),
        },
        scheduleId: id || "-",
      })
    );
    action.setSubmitting(false);
    if (result.meta.requestStatus === "fulfilled") onClose();
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

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <VStack spacing={6}>
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
                        <FormLabel fontSize={"xl"}>Course's name</FormLabel>
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

                  <Flex
                    w="full"
                    direction={{ base: "column", md: "row" }}
                    gap={1}
                  >
                    <Field name="allDay">
                      {({ field }: MyFieldProps<number, InitValuesType>) => (
                        <FormControl maxW="6rem">
                          <FormLabel fontSize={"xl"}>All day?</FormLabel>
                          <Switch size={"lg"} colorScheme="teal" {...field} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="start">
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
                            <FormLabel fontSize={"xl"}>Ends</FormLabel>
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
