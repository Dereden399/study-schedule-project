import {
  Button,
  Container,
  Heading,
  IconButton,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import InfoSign from "../components/InfoSign";
import { SettingsIcon } from "@chakra-ui/icons";
import CoursesList from "../components/CoursesList";
import Calendar from "../components/Calendar";

const SchedulePage = () => {
  const id = useParams().id;
  const schedule = useAppSelector((state) =>
    state.schedule.schedules.find((x) => x.id == id)
  );

  if (!schedule) return <ScheduleNotFound />;

  return (
    <Container maxW={"8xl"} pt="5rem">
      <Heading as="h1" size={"xl"}>
        {schedule.name}
        <IconButton aria-label="Edit schedule" icon={<SettingsIcon />} ms={1} />
      </Heading>
      <Stack direction={{ base: "column", lg: "row" }} mt="5" spacing={1}>
        <Button
          colorScheme="teal"
          w="full"
          display={{ base: "flex", md: "none" }}
        >
          Open courses menu
        </Button>
        <CoursesList />
        <Calendar />
      </Stack>
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
