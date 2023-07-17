import { Box, Heading } from "@chakra-ui/react";
import { Course } from "../types";

const CoursesList = ({ courses }: { courses: Course[] }) => {
  return (
    <Box bg={"gray.100"} rounded={"lg"}>
      <Heading>Courses here...</Heading>
      {courses.map((x) => (
        <Heading>{x.name}</Heading>
      ))}
    </Box>
  );
};

export default CoursesList;
