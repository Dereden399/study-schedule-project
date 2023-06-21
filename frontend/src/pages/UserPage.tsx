import { Container, Heading } from "@chakra-ui/react";
import { LoremIpsum } from "react-lorem-ipsum";

const UserPage = () => {
  return (
    <Container>
      <Heading as={"h1"} size={"xl"}>
        User page here...
      </Heading>
      <LoremIpsum p={20} />
    </Container>
  );
};

export default UserPage;
