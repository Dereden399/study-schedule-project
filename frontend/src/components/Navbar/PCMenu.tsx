import { HStack, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const PCMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <HStack
      spacing={8}
      alignItems={"center"}
      display={{ base: "none", md: "flex" }}
    >
      <Heading as={"h4"} size={"lg"}>
        Study Schedule
      </Heading>
      <HStack spacing={4} fontSize={"xl"}>
        <Link as={RouterLink} to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link as={RouterLink} to="/schedules" onClick={closeMenu}>
          Schedules
        </Link>
      </HStack>
    </HStack>
  );
};

export default PCMenu;
