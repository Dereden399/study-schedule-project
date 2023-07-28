import {
  Box,
  HStack,
  Heading,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Course } from "../types";
import { SettingsIcon } from "@chakra-ui/icons";
import EditCourseModal from "./ModalsAndOther/EditCourseModal";

const CourseBox = ({ course }: { course: Course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <EditCourseModal isOpen={isOpen} onClose={onClose} course={course} />
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
            onClick={() => onOpen()}
          />
        </HStack>
      </Box>
    </>
  );
};

export default CourseBox;
