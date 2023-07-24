import {
  Box,
  HStack,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Course } from "../types";
import { SettingsIcon } from "@chakra-ui/icons";

const CourseBox = ({
  course,
  handleEdit,
}: {
  course: Course;
  handleEdit: (course: Course) => void;
}) => {
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
          {course.title}
        </Heading>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<SettingsIcon />}
          onClick={() => handleEdit(course)}
        />
      </HStack>
    </Box>
  );
};

export default CourseBox;
