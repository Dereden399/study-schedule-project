import { Heading } from "@chakra-ui/react";
import { HeaderProps } from "react-big-calendar";

const CustomHeader = (props: HeaderProps) => {
  return (
    <Heading as={"h3"} size="md">
      {props.label}
    </Heading>
  );
};

export default CustomHeader;
