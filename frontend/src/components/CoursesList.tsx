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
import useAppSelector from "../hooks/useAppSelector";
import AddCourseModal from "./ModalsAndOther/AddCourseModal";

const CoursesList = () => {
  const courses = useAppSelector((state) => state.course.courses);
  const [filter, setFilter] = useState("");
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (filter.length >= 3) {
      setSortedCourses(
        courses.filter((x) =>
          x.title.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setSortedCourses(courses);
    }
  }, [courses, filter]);

  return (
    <VStack spacing={2} w={"full"} maxW={"md"}>
      <AddCourseModal
        isOpen={isOpen}
        onClose={onClose}
        initStart={null}
        initEnd={null}
      />
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
          onClick={() => onOpen()}
        >
          Add
        </Button>
      </HStack>
      {sortedCourses.map((x) => (
        <CourseBox course={x} key={x.id} />
      ))}
    </VStack>
  );
};

export default CoursesList;
