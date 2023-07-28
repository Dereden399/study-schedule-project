import {
  StyleObjectOrFn,
  useColorModeValue,
  useTheme,
  css,
} from "@chakra-ui/react";
import { useMemo } from "react";

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
    return css(defaultStyles)(theme);
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

export default useCalendarStyles;
