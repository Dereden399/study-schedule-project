import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MyFieldProps } from "../types";
import useAppDispatch from "../hooks/useAppDispatch";
import addSchedule from "../store/reducers/actions/addSchedule";

interface InitValuesType {
  name: string;
  description: string;
}

const initialValues: InitValuesType = {
  name: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const NewScheduleForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const submitHandler = async (
    values: InitValuesType,
    action: FormikHelpers<InitValuesType>
  ) => {
    const result = await dispatch(addSchedule(values));
    action.setSubmitting(false);
    if (result.meta.requestStatus == "fulfilled") {
      onClose();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form>
          <VStack spacing={6}>
            <Field name="name">
              {({ field, form }: MyFieldProps<string, InitValuesType>) => (
                <FormControl
                  isInvalid={form.touched.name && Boolean(form.errors.name)}
                >
                  <FormLabel fontSize={"2xl"}>Schedule's name</FormLabel>
                  <Input
                    placeholder="Schedule..."
                    {...field}
                    type="text"
                    size={"lg"}
                    data-cy="add-name"
                  />
                  <FormErrorMessage fontSize={"lg"}>
                    {form.errors.name}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }: MyFieldProps<string, InitValuesType>) => (
                <FormControl
                  isInvalid={
                    form.touched.description && Boolean(form.errors.description)
                  }
                >
                  <FormLabel fontSize={"2xl"}>Description (Optional)</FormLabel>
                  <Input
                    placeholder="Description..."
                    {...field}
                    type="text"
                    size="lg"
                    data-cy="add-description"
                  />
                  <FormErrorMessage fontSize={"lg"}>
                    {form.errors.description}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <ButtonGroup justifyContent={"end"} w={"full"}>
              <Button
                onClick={onClose}
                variant={"outline"}
                colorScheme="teal"
                size="lg"
              >
                Close
              </Button>
              <Button
                type="submit"
                variant={"solid"}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                size="lg"
                data-cy="add-submit-button"
              >
                Add
              </Button>
            </ButtonGroup>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default NewScheduleForm;
