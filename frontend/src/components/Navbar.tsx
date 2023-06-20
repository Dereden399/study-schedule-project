import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  useColorModeValue,
  HStack,
  Heading,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      h={16}
      px={4}
      bg={useColorModeValue("gray.100", "gray.900")}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <HStack spacing={8} alignItems={"center"}>
        <Heading as={"h4"} size={"lg"} display={{ base: "none", md: "flex" }}>
          Study Schedule
        </Heading>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/">
            Home
          </Link>
          <Link as={RouterLink} to="/schedules">
            Schedules
          </Link>
        </HStack>
      </HStack>
      <HStack spacing={4} alignItems={"center"}>
        <Button onClick={toggleColorMode}>
          {colorMode == "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar name="TEST NAME" />
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/user">
              Profile
            </MenuItem>
            <MenuItem as={RouterLink} to="/schedules">
              My Schedules
            </MenuItem>
            <MenuItem as={RouterLink} to="*">
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default NavBar;
