import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Heading, VStack, useColorModeValue } from "@chakra-ui/react";

const InfoSign = ({ header, info }: { header: string; info: string }) => {
  return (
    <VStack
      mt={"10rem"}
      bg={useColorModeValue("gray.200", "gray.700")}
      p={"5"}
      rounded={"lg"}
      color={useColorModeValue("gray.400", "gray.500")}
      textAlign={"center"}
    >
      <InfoOutlineIcon w="5rem" h="5rem" />
      <Heading as="h1" size="lg">
        {header}
      </Heading>
      <Heading as="h3" size="md">
        {info}
      </Heading>
    </VStack>
  );
};

export default InfoSign;
