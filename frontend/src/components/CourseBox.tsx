import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Course } from "../types";
import { SettingsIcon } from "@chakra-ui/icons";

const CourseBox = ({ course }: { course: Course }) => {
  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.700")}
      px="2"
      py="2"
      rounded={"lg"}
      w="full"
      shadow={"md"}
    >
      <HStack justifyContent={"space-between"} alignContent={"center"}>
        <Heading as={"h3"} size={"md"} textAlign={"center"}>
          {course.name}
        </Heading>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<SettingsIcon />}
        />
      </HStack>
    </Box>
  );
};

export default CourseBox;
