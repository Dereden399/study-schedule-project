import { useState } from "react";
import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <Flex
        h={16}
        bg={useColorModeValue("gray.100", "gray.900")}
        alignContent={"center"}
        justifyContent={"space-between"}
      >
        <h1>Hello</h1>
        <h2>Tab2</h2>
      </Flex>
      <Container>
        <h1>Hello</h1>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </Container>
    </Box>
  );
}

export default App;
