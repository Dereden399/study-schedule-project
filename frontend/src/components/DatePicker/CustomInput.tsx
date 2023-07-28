import { CalendarIcon } from "@chakra-ui/icons";
import {
  InputProps,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef } from "react";

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

export default CustomInput;
