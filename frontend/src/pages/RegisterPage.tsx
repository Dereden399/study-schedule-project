import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container py={{ base: "12", md: "24" }} px={{ base: "0", md: "8" }}>
      <VStack spacing={8}>
        <VStack spacing={2} justifyContent={"center"} alignItems={"center"}>
          <HStack spacing={4}>
            <CalendarIcon h={14} w={14} color={"teal"} />
            <Heading as={"h1"} size={{ base: "lg", md: "xl" }}>
              Create a free account now
            </Heading>
          </HStack>
          <HStack spacing={1} fontSize={"xl"}>
            <Text>Already have an account?</Text>
            <Link as={RouterLink} to="/auth/login" color={"teal"}>
              Log in
            </Link>
          </HStack>
        </VStack>
        <Box
          py={{ base: "0", md: "8" }}
          px={{ base: "4", md: "10" }}
          bg={{
            base: "transparent",
            md: useColorModeValue("white", "gray.700"),
          }}
          boxShadow={{ base: "none", md: "xl" }}
          borderRadius={{ base: "none", md: "xl" }}
          width={"full"}
        >
          <RegisterForm />
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
