import {
  Container,
  HStack,
  Heading,
  Input,
  Link,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import useAppSelector from "../hooks/useAppSelector";
import InfoSign from "../components/InfoSign";
import AddSchedulePopover from "../components/ModalsAndOther/AddSchedulePopover";
import { useEffect, useState } from "react";
import ScheduleBox from "../components/ScheduleBox";
import { Schedule } from "../types";
import { Link as RouterLink } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { getSchedules } from "../store/reducers/actions/getSchedules";

const SchedulesPage = () => {
  const [filterText, setFilterText] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const dispatch = useAppDispatch();
  const { schedules, loading } = useAppSelector((state) => state.schedule);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      dispatch(getSchedules(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterText.length >= 3) {
      setFilteredSchedules(
        schedules.filter((x) =>
          x.name.toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredSchedules(schedules);
    }
  }, [filterText, schedules]);

  if (!user)
    return (
      <Container mt={"5rem"} maxW={"container.xl"}>
        <InfoSign
          iconSize={15}
          header="This page is packed with your study schedules"
          info={
            <>
              <Link as={RouterLink} to="/auth/login" color={"teal.400"}>
                Log in
              </Link>{" "}
              or{" "}
              <Link as={RouterLink} to="/auth/register" color={"teal.400"}>
                Register
              </Link>{" "}
              now to access and optimize your study routine
            </>
          }
        />
      </Container>
    );
  if (loading)
    return (
      <Container mt={"5rem"} maxW={"container.xl"} centerContent>
        <Spinner size="xl" color="teal" />
      </Container>
    );

  return (
    <Container mt={"5rem"} maxW={"container.xl"}>
      <Heading textAlign={"center"}>Your schedules</Heading>
      <HStack mt={5}>
        <Input
          placeholder="Filter..."
          size="lg"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <AddSchedulePopover />
      </HStack>
      <VStack mt="5">
        {schedules.length == 0 ? (
          <InfoSign
            header="No schedules yet"
            info={"You can add one using the button above"}
            iconSize={5}
          />
        ) : filteredSchedules.length == 0 ? (
          <InfoSign
            header="No schedules for that filter"
            info={""}
            iconSize={5}
          />
        ) : (
          filteredSchedules.map((schedule) => (
            <ScheduleBox schedule={schedule} key={schedule.id} />
          ))
        )}
      </VStack>
    </Container>
  );
};

export default SchedulesPage;
