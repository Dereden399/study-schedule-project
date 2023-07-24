import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import {
  Calendar,
  Components,
  Navigate,
  SlotInfo,
  ToolbarProps,
  View,
  ViewsProps,
  luxonLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useAppSelector from "../hooks/useAppSelector";
import { Course } from "../types";
import { useCallback, useMemo } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const localizer = luxonLocalizer(DateTime);

const CustomToolbar = (props: ToolbarProps<Course, object>) => {
  return (
    <Flex
      direction={{ base: "column-reverse", md: "row" }}
      alignItems={"center"}
      justifyContent={"space-between"}
      mb="3"
    >
      <Tabs position="relative" variant="unstyled">
        <TabList>
          {(props.views as View[]).map((viewName) => (
            <Tab onClick={() => props.onView(viewName)} key={viewName}>
              {props.localizer.messages[viewName]}
            </Tab>
          ))}
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="teal" borderRadius="1px" />
      </Tabs>
      <Heading size="lg">{props.label}</Heading>
      <ButtonGroup isAttached size="md" variant={"outline"} colorScheme="teal">
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={() => props.onNavigate(Navigate.PREVIOUS)}
        >
          {props.localizer.messages.previous}
        </Button>
        <Button
          onClick={() => props.onNavigate(Navigate.TODAY)}
          variant={"solid"}
        >
          {props.localizer.messages.today}
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={() => props.onNavigate(Navigate.NEXT)}
        >
          {props.localizer.messages.next}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

const MyCalendar = ({
  openAddCourseModal,
  openEditCourseModal,
}: {
  openAddCourseModal: (initStart: Date, initEnd: Date) => void;
  openEditCourseModal: (course: Course) => void;
}) => {
  const courses = useAppSelector((state) => state.course.courses);
  const views = useMemo<ViewsProps<Course, object>>(() => {
    return { month: true, week: true, day: true };
  }, []);
  const components = useMemo<Components<Course, object>>(
    () => ({ toolbar: CustomToolbar }),
    []
  );

  const handleSelectEvent = useCallback(
    (event: Course) => {
      openEditCourseModal(event);
    },
    [openEditCourseModal]
  );

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      openAddCourseModal(slotInfo.start, slotInfo.end);
    },
    [openAddCourseModal]
  );

  return (
    <Box h="50rem" w="full">
      <Calendar
        localizer={localizer}
        events={courses}
        popup
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        views={views}
        components={components}
      />
    </Box>
  );
};

export default MyCalendar;
