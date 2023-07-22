import {
  Button,
  HStack,
  Heading,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Course } from "../types";
import CourseBox from "./CourseBox";
import { useEffect, useState } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import AddCourseModal from "./AddCourseModal";
import useAppSelector from "../hooks/useAppSelector";

const CoursesList = () => {
  const courses = useAppSelector((state) => state.course.courses);
  const [filter, setFilter] = useState("");
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (filter.length >= 3) {
      setSortedCourses(
        courses.filter((x) =>
          x.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setSortedCourses(courses);
    }
  }, [courses, filter]);

  return (
    <VStack spacing={2} w={"full"} maxW={"md"}>
      <Heading>All Courses</Heading>
      <HStack justifyContent={"space-between"} w="full">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search courses..."
        />
        <Button
          leftIcon={<PlusSquareIcon />}
          colorScheme="teal"
          onClick={onOpen}
        >
          Add
        </Button>
      </HStack>
      {sortedCourses.map((x) => (
        <CourseBox course={x} key={x.id} />
      ))}
      <AddCourseModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default CoursesList;
