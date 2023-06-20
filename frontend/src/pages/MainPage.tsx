import { Button, Heading, Container } from "@chakra-ui/react";
import { useState } from "react";

const MainPage = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <Container>
      <Heading as={"h1"} size={"lg"}>
        Hello
      </Heading>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
      </div>
    </Container>
  );
};

export default MainPage;
