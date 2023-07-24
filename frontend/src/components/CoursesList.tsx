import { Button, HStack, Heading, Input, VStack } from "@chakra-ui/react";
import { Course } from "../types";
import CourseBox from "./CourseBox";
import { useEffect, useState } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import useAppSelector from "../hooks/useAppSelector";

const CoursesList = ({
  onAddModalOpen,
  handleEdit,
}: {
  onAddModalOpen: (start: Date | null, end: Date | null) => void;
  handleEdit: (course: Course) => void;
}) => {
  const courses = useAppSelector((state) => state.course.courses);
  const [filter, setFilter] = useState("");
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);

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
          onClick={() => onAddModalOpen(null, null)}
        >
          Add
        </Button>
      </HStack>
      {sortedCourses.map((x) => (
        <CourseBox course={x} key={x.id} handleEdit={handleEdit} />
      ))}
    </VStack>
  );
};

export default CoursesList;
