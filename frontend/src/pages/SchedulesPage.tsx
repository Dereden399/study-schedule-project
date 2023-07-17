import { Container, HStack, Heading, Input, VStack } from "@chakra-ui/react";
import useAppSelector from "../hooks/useAppSelector";
import InfoSign from "../components/InfoSign";
import AddSchedulePopover from "../components/AddSchedulePopover";
import { useEffect, useState } from "react";
import ScheduleBox from "../components/ScheduleBox";
import { Schedule } from "../types";

const SchedulesPage = () => {
  const [filterText, setFilterText] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const schedules = useAppSelector((state) => state.schedule.schedules);
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
