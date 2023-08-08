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
import { AuthCred, MyFieldProps } from "../types";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../store/reducers/actions/register";
import useAppDispatch from "../hooks/useAppDispatch";

const initValues: AuthCred = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(5, "Username must be at least 5 symbols long"),
  password: Yup.string().min(5, "Password must be at least 5 symbols long"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const submitHandler = async (
    values: AuthCred,
    actions: FormikHelpers<AuthCred>
  ) => {
    const result = await dispatch(register(values));
    actions.setSubmitting(false);
    if (result.meta.requestStatus == "fulfilled") {
      nav("/schedules");
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={submitHandler}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form>
          <VStack spacing={6}>
            <Field name="username">
              {({ field, form }: MyFieldProps<string, AuthCred>) => (
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
              {({ field, form }: MyFieldProps<string, AuthCred>) => (
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
