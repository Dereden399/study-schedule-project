import { Container, Flex, Heading, IconButton, Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import InfoSign from "../components/InfoSign";
import { useEffect, useState } from "react";
import { Course } from "../types";
import { SettingsIcon } from "@chakra-ui/icons";
import CoursesList from "../components/CoursesList";
import Calendar from "../components/Calendar";

const SchedulePage = () => {
  const id = useParams().id;
  const schedule = useAppSelector((state) =>
    state.schedule.schedules.find((x) => x.id == id)
  );
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses([
      {
        name: "Happy Birthday",
        startDate: new Date("2023-07-18"),
        endDate: new Date("2023-07-19"),
        info: "Yay",
      },
      {
        name: "Course 1",
        startDate: new Date("2023-09-03T10:15:00"),
        endDate: new Date("2023-09-03T12:00:00"),
        info: "Not Yay",
      },
    ]);
  }, []);

  if (!schedule) return <ScheduleNotFound />;

  return (
    <Container maxW={"8xl"} pt="5rem">
      <Heading as="h1" size={"xl"}>
        {schedule.name}
        <IconButton aria-label="Edit schedule" icon={<SettingsIcon />} ms={1} />
      </Heading>
      <Flex direction={{ sm: "column", md: "row" }}>
        <CoursesList courses={courses} />
        <Calendar />
      </Flex>
    </Container>
  );
};

const ScheduleNotFound = () => {
  return (
    <Container maxW={"2xl"} pt={"5rem"}>
      <InfoSign
        iconSize={15}
        header="Schedule not found..."
        info={
          <Link as={RouterLink} to="/schedules" color={"teal.400"}>
            Back to schedules
          </Link>
        }
      />
    </Container>
  );
};

export default SchedulePage;
