// Took from github.com/ScholtenSeb/chakra-ui-react-datepicker (and changed a bit)

import { FC, forwardRef, useCallback, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StyleObjectOrFn,
  Text,
  useTheme,
  css as chakraCSS,
  InputProps,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { ClassNames, ClassNamesContent } from "@emotion/react";

const CustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputGroup>
      <Input {...props} ref={ref} />
      <InputRightElement
        userSelect="none"
        pointerEvents="none"
        children={<CalendarIcon />}
      />
    </InputGroup>
  );
});

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  return (
    <Stack
      pb={1}
      direction={"row"}
      alignItems="center"
      textAlign="left"
      pl={4}
      pr={2}
    >
      <Text flex={1} fontSize="sm" fontWeight="medium">
        {new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
        }).format(date)}
      </Text>
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Previous Month"
        icon={<ChevronLeftIcon fontSize="14px" />}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Next Month"
        icon={<ChevronRightIcon fontSize="14px" />}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Stack>
  );
};

function useDatePickerStyles() {
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
    return chakraCSS(defaultStyles)(theme);
  }, [
    bgColor,
    borderColor,
    dayColor,
    dayHoverColor,
    dayTodayColor,
    headerColor,
    theme,
  ]);
}

export interface DatePickerProps {
  value: Date;
  onChange: (date: Date | null) => void;
  showTime: boolean;
}

export const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  showTime,
}) => {
  const styles = useDatePickerStyles();
  const render = useCallback(
    ({ css }: ClassNamesContent) => {
      return (
        <ReactDatePicker
          dateFormat={showTime ? "dd MMMM, yyyy, HH:mm" : "dd MMMM, yyyy"}
          showPopperArrow={false}
          popperClassName={css({ marginTop: "4px!important" })}
          calendarClassName={css(styles)}
          selected={value}
          onChange={(date) =>
            Array.isArray(date) ? onChange(date[0]) : onChange(date)
          }
          customInput={<CustomInput />}
          renderCustomHeader={CustomHeader}
          showTimeSelect={showTime}
          timeFormat="HH:mm"
          timeIntervals={15}
          withPortal
        />
      );
    },
    [onChange, showTime, styles, value]
  );

  return <ClassNames>{render}</ClassNames>;
};
