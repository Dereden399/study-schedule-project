import {
  Button,
  Heading,
  Container,
  Text,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Container maxW={"5xl"} mt={"10rem"} centerContent>
      <VStack spacing={8} alignItems={"center"} textAlign={"center"}>
        <Heading
          as={"h1"}
          size={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight={"bold"}
          color={useColorModeValue("cyan.500", "cyan.300")}
        >
          Study Schedule project
        </Heading>
        <Text as={"p"} fontSize={{ base: "xl", sm: "2xl" }}>
          <Text as={"span"} color={"teal.400"}>
            Modern and convenient yet minimalistic
          </Text>{" "}
          calendar app, that helps you organize and plan your day
        </Text>
        <HStack spacing={2}>
          <Button
            size="lg"
            colorScheme={"teal"}
            variant={"solid"}
            fontSize={"2xl"}
            onClick={() => navigate("/auth/register")}
          >
            Register
          </Button>
          <Button
            size="lg"
            colorScheme={"teal"}
            variant={"outline"}
            fontSize={"2xl"}
            onClick={() => navigate("/auth/login")}
            id="login_button"
          >
            Login
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default MainPage;
