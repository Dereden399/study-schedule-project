import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Stack, IconButton, Text } from "@chakra-ui/react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

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

export default CustomHeader;
