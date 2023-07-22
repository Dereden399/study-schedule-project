import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { MyFieldProps } from "../types";

interface InitValuesType {
  username: string;
  password: string;
}

const initValues: InitValuesType = {
  username: "",
  password: "",
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (
    values: InitValuesType,
    actions: FormikHelpers<InitValuesType>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initValues} onSubmit={submitHandler}>
      {(props) => (
        <Form>
          <VStack spacing={6}>
            <Field name="username">
              {({ field, form }: MyFieldProps<string, InitValuesType>) => (
                <FormControl
                  isInvalid={
                    form.touched.username && Boolean(form.errors.username)
                  }
                >
                  <FormLabel fontSize={"xl"}>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    {...field}
                    type="text"
                    size={"lg"}
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: MyFieldProps<string, InitValuesType>) => (
                <FormControl
                  isInvalid={
                    form.touched.password && Boolean(form.errors.password)
                  }
                >
                  <FormLabel fontSize={"xl"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      size={"lg"}
                    />
                    <InputRightElement>
                      <IconButton
                        size={"lg"}
                        icon={
                          showPassword ? (
                            <ViewOffIcon color={"teal"} />
                          ) : (
                            <ViewIcon color={"teal"} />
                          )
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Reveal password"
                        }
                        variant={"unstyled"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              variant={"solid"}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              width={"full"}
              size={"lg"}
            >
              Sign in
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
