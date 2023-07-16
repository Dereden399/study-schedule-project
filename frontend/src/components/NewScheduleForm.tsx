import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  FormikHelpers,
  Formik,
  Form,
  FieldInputProps,
  FormikProps,
  Field,
} from "formik";

interface InitValuesType {
  name: string;
  description: string;
}

interface MyFieldProps {
  field: FieldInputProps<string>;
  form: FormikProps<InitValuesType>;
}

const initialValues: InitValuesType = {
  name: "",
  description: "",
};

const NewScheduleForm = ({ onClose }: { onClose: () => void }) => {
  const submitHandler = (
    values: InitValuesType,
    action: FormikHelpers<InitValuesType>
  ) => {
    console.log(values);
    action.setSubmitting(false);
    onClose();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {(props) => (
        <Form>
          <VStack spacing={6}>
            <Field name="name">
              {({ field, form }: MyFieldProps) => (
                <FormControl
                  isInvalid={form.touched.name && Boolean(form.errors.name)}
                >
                  <FormLabel fontSize={"2xl"}>Schedule's name</FormLabel>
                  <Input
                    placeholder="Schedule..."
                    {...field}
                    type="text"
                    size={"lg"}
                  />
                  <FormErrorMessage fontSize={"lg"}>
                    {form.errors.name}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }: MyFieldProps) => (
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
