import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  StyleObjectOrFn,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  useTheme,
  css as chakraCSS,
  useColorModeValue,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import {
  Calendar,
  Components,
  HeaderProps,
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
import { ClassNames } from "@emotion/react";

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

const CustomHeader = (props: HeaderProps) => {
  return (
    <Heading as={"h3"} size="md">
      {props.label}
    </Heading>
  );
};

const useCalendarStyles = () => {
  const theme = useTheme();
  const eventBg = useColorModeValue("teal", "teal.400");
  const indicatorBg = useColorModeValue("teal.400", "teal.200");
  const calendarBg = useColorModeValue("gray.50", "gray.700");
  const offrangeBg = useColorModeValue("gray.100", "#37455C");
  const todayBg = useColorModeValue("#eaf6ff", "gray.800");
  const borderColor = useColorModeValue("$ddd", "gray.500");
  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      bg: calendarBg,
      p: "2",
      rounded: "xl",
      ".rbc-event": {
        bg: eventBg,
      },
      ".rbc-off-range-bg": {
        bg: offrangeBg,
      },
      ".rbc-current-time-indicator": {
        bg: indicatorBg,
        h: "3px",
      },
      ".rbc-today": {
        bg: todayBg,
      },
      ".rbc-header": {
        borderColor: borderColor,
      },
      ".rbc-month-view": {
        borderColor: borderColor,
      },
      ".rbc-month-row": {
        borderColor: borderColor,
        "& + &": {
          borderColor: borderColor,
        },
      },
      ".rbc-day-bg": {
        borderColor: borderColor,
        "& + &": {
          borderColor: borderColor,
        },
        ".rbc-rtl & + &": {
          borderColor: borderColor,
        },
      },
      ".rbc-timeslot-group": {
        borderColor: borderColor,
      },
      ".rbc-time-slot": {
        borderColor: borderColor,
      },
      ".rbc-time-view-resources": {
        ".rbc-time-gutter .rbc-time-header-gutter": {
          borderColor: borderColor,
        },
      },
      ".rbc-time-view": {
        borderColor: borderColor,
        ".rbc-allday-cell + .rbc-allday-cell": {
          borderColor: borderColor,
        },
      },
      ".rbc-time-header": {
        "&.rbc-overflowing": {
          borderColor: borderColor,
        },
        ".rbc-rtl &.rbc-overflowing": {
          borderColor: borderColor,
        },
        "> .rbc-row": {
          borderColor: borderColor,
        },
        "> .rbc-row.rbc-row-resource": {
          borderColor: borderColor,
        },
      },
      ".rbc-time-header-content": {
        borderColor: borderColor,
        ".rbc-rtl &": {
          borderColor: borderColor,
        },
        "> .rbc-row.rbc-row-resource": {
          borderColor: borderColor,
        },
      },
      ".rbc-time-content": {
        borderColor: borderColor,
        "> * + * > *": {
          borderColor: borderColor,
        },
        ".rbc-rtl & > * + * > *": {
          borderColor: borderColor,
        },
      },
    };
    return chakraCSS(defaultStyles)(theme);
  }, [
    borderColor,
    calendarBg,
    eventBg,
    indicatorBg,
    offrangeBg,
    theme,
    todayBg,
  ]);
};

const MyCalendar = ({
  openAddCourseModal,
  openEditCourseModal,
}: {
  openAddCourseModal: (initStart: Date, initEnd: Date) => void;
  openEditCourseModal: (course: Course) => void;
}) => {
  const styles = useCalendarStyles();
  const courses = useAppSelector((state) => state.course.courses);
  const views = useMemo<ViewsProps<Course, object>>(() => {
    return { month: true, week: true, day: true };
  }, []);
  const components = useMemo<Components<Course, object>>(
    () => ({
      toolbar: CustomToolbar,
      month: { header: CustomHeader },
      week: { header: CustomHeader },
      day: { header: CustomHeader },
    }),
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
    <ClassNames>
      {({ css }) => (
        <Box h="50rem" w="full">
          <Calendar
            className={css(styles)}
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
      )}
    </ClassNames>
  );
};

export default MyCalendar;
