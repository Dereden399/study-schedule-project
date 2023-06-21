import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import PCMenu from "./PCMenu";
import AvatarMenu from "./AvatarMenu";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Flex
      as={motion.nav}
      direction={"column"}
      position={{ base: "sticky", md: "relative" }}
      top={0}
      zIndex={90}
    >
      <Flex
        h={"4rem"}
        px={4}
        alignItems={"center"}
        bg={useColorModeValue("gray.100", "gray.900")}
        justifyContent={"space-between"}
        zIndex={95}
      >
        <Button onClick={onToggle} display={{ base: "flex", md: "none" }}>
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
        <PCMenu closeMenu={onClose} />
        <HStack spacing={4} alignItems={"center"}>
          <Button onClick={toggleColorMode}>
            {colorMode == "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <AvatarMenu closeMenu={onClose} />
        </HStack>
      </Flex>
      <AnimatePresence>
        {isOpen && <MobileMenu closeMenu={onClose} />}
      </AnimatePresence>
    </Flex>
  );
};

export default NavBar;
