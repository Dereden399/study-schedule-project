import { Box, useDisclosure } from "@chakra-ui/react";
import { DateTime } from "luxon";
import {
  Calendar,
  Components,
  SlotInfo,
  ViewsProps,
  luxonLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useAppSelector from "../../hooks/useAppSelector";
import { CalendarEvent } from "../../types";
import { useCallback, useMemo, useState } from "react";
import { ClassNames } from "@emotion/react";
import AddCourseModal from "../ModalsAndOther/AddCourseModal";
import EditCourseModal from "../ModalsAndOther/EditCourseModal";
import CustomToolbar from "./CustomToolbar";
import CustomHeader from "./CustomHeader";
import useCalendarStyles from "./useCalendarStyles";

const localizer = luxonLocalizer(DateTime);

const MyCalendar = () => {
  const styles = useCalendarStyles();
  const courses = useAppSelector((state) => state.course.courses);
  const events = useMemo<CalendarEvent[]>(
    () =>
      courses.map((x) => {
        return {
          title: x.title,
          info: x.info,
          allDay: x.allDay,
          start: new Date(x.start),
          end: new Date(x.end),
          id: x.id,
        };
      }),
    [courses]
  );
  const views = useMemo<ViewsProps<CalendarEvent, object>>(() => {
    return { month: true, week: true, day: true };
  }, []);
  const components = useMemo<Components<CalendarEvent, object>>(
    () => ({
      toolbar: CustomToolbar,
      month: { header: CustomHeader },
      week: { header: CustomHeader },
      day: { header: CustomHeader },
    }),
    []
  );
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [initStartDateForModal, setInitStartDate] = useState<Date | null>(null);
  const [initEndDateForModal, setInitEndDate] = useState<Date | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<CalendarEvent | null>(null);

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      setCourseToEdit(event);
      onEditOpen();
    },
    [onEditOpen]
  );

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      setInitStartDate(slotInfo.start);
      setInitEndDate(slotInfo.end);
      onAddOpen();
    },
    [onAddOpen]
  );

  return (
    <>
      <AddCourseModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        initStart={initStartDateForModal}
        initEnd={initEndDateForModal}
      />
      <EditCourseModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        course={courseToEdit}
      />
      <ClassNames>
        {({ css }) => (
          <Box h="50rem" w="full">
            <Calendar
              className={css(styles)}
              localizer={localizer}
              events={events}
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
    </>
  );
};

export default MyCalendar;
