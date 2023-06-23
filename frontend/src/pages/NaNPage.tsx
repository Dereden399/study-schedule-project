import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NaNPage = () => {
  return (
    <Container mt={"10rem"} centerContent>
      <Stack
        spacing={8}
        divider={<StackDivider borderColor={"gray.200"} />}
        direction={{ base: "column", md: "row" }}
      >
        <Flex justifyContent={"center"}>
          <QuestionOutlineIcon h={"60"} w={"60"} />
        </Flex>
        <Flex
          alignSelf={"center"}
          minW={{ base: "0.5", md: "lg" }}
          direction={"column"}
          alignItems={"center"}
          gap={"1"}
        >
          <Text
            as={"h1"}
            fontSize={{ base: "2xl", md: "5xl" }}
            textAlign={"center"}
          >
            Nobody here but us chickens
          </Text>
          <Link
            as={RouterLink}
            to="/"
            color="teal"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            To main page
          </Link>
        </Flex>
      </Stack>
    </Container>
  );
};

export default NaNPage;
