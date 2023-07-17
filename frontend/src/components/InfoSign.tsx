import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const InfoSign = ({
  header,
  info,
  iconSize,
}: {
  header: string;
  info: string | React.ReactNode;
  iconSize: number;
}) => {
  return (
    <VStack
      bg={useColorModeValue("gray.200", "gray.700")}
      p={"5"}
      rounded={"lg"}
      color={useColorModeValue("gray.400", "gray.500")}
      textAlign={"center"}
    >
      <InfoOutlineIcon w={`${iconSize}rem`} h={`${iconSize}rem`} />
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
