import { chakra, HTMLChakraProps } from "@chakra-ui/react";

export const Logo = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    height="12"
    width="auto"
    viewBox="0 0 89 89"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 4h-3V2.5a.5.5 0 00-1 0V4h-7V2.5a.5.5 0 00-1 0V4h-3A2.503 2.503 0 002 6.5v13A2.503 2.503 0 004.5 22h15a2.502 2.502 0 002.5-2.5v-13A2.502 2.502 0 0019.5 4zM21 19.5c0 .828-.672 1.5-1.5 1.5h-15C3.67 21 3 20.328 3 19.5V11h18v8.5zm0-9.5H3V6.5C3 5.672 3.67 5 4.5 5h3v1.5a.5.5 0 001 0V5h7v1.5a.5.5 0 001 0V5h3c.828 0 1.5.672 1.5 1.5V10z"
    />
  </chakra.svg>
);
