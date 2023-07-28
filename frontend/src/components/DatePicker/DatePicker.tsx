// Took from github.com/ScholtenSeb/chakra-ui-react-datepicker (and changed a bit)

import { FC, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { ClassNames, ClassNamesContent } from "@emotion/react";
import CustomInput from "./CustomInput";
import CustomHeader from "./CustomHeader";
import useDatePickerStyles from "./useDatePickerStyles";

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
