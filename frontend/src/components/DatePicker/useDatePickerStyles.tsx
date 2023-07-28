import {
  StyleObjectOrFn,
  useColorModeValue,
  useTheme,
  css,
} from "@chakra-ui/react";
import { useMemo } from "react";

const useDatePickerStyles = () => {
  const theme = useTheme();
  const bgColor = useColorModeValue("white", "gray.600");
  const borderColor = useColorModeValue("gray.100", "gray.500");
  const headerColor = useColorModeValue("gray.700", "gray.200");
  const dayColor = useColorModeValue("gray.700", "gray.200");
  const dayHoverColor = useColorModeValue("gray.100", "gray.700");
  const dayTodayColor = useColorModeValue("gray.100", "gray.500");
  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      p: 2,
      bg: bgColor,
      border: "1px solid",
      borderColor: borderColor,
      boxShadow: "sm",
      display: "flex",
      flexDirection: "row",
      ".react-datepicker-time__header": {
        textColor: headerColor,
      },
      "& .react-datepicker": {
        "&__time": {
          color: dayColor,
          bg: "none",
        },
        "&__time-list-item:not(.react-datepicker__time-list-item--selected):hover":
          {
            bg: dayHoverColor + "!important",
          },
        "&__time-list-item--selected": {
          bg: "gray.700!important",
          color: "white",
        },
        "&__header": {
          bg: "none",
          borderBottom: "none",
          textColor: headerColor,
        },
        "&__month": {
          mt: 0,
        },
        "&__day-name": {
          color: "gray.400",
          fontWeight: "medium",
          w: 7,
        },
        "&__day": {
          lineHeight: "28px",
          color: dayColor,
          w: 7,
          h: 7,
          borderRadius: "full",
        },
        "&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover":
          {
            bg: dayHoverColor,
            boxShadow: "0 0 1px 1px rgba(0,0,0,0.2)",
          },
        "&__day--today": {
          bg: dayTodayColor,
          fontWeight: "400",
        },
        "&__day--selected, &__day--keyboard-selected": {
          bg: "gray.700",
          color: "white",
        },
      },
    };
    return css(defaultStyles)(theme);
  }, [
    bgColor,
    borderColor,
    dayColor,
    dayHoverColor,
    dayTodayColor,
    headerColor,
    theme,
  ]);
};

export default useDatePickerStyles;
