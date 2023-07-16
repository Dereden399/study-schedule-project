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
import { useCallback, useEffect, useState } from "react";

const NavBar = () => {
  const [pivot, setPivot] = useState(0);
  const [wasScrollingDown, setWasScrollingDown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleNavbarStick = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.scrollY <= 20 && !showNavbar) {
      setShowNavbar(true);
      return;
    }
    const diff = window.scrollY - pivot;
    if (diff > 0 && wasScrollingDown) {
      setPivot(window.scrollY);
    } else if (diff > 100) {
      setShowNavbar(false);
      onClose();
      setWasScrollingDown(true);
      setPivot(window.scrollY);
    } else if (diff <= 0 && !wasScrollingDown) {
      setPivot(window.scrollY);
    } else if (diff < -100) {
      setShowNavbar(true);
      setWasScrollingDown(false);
      setPivot(window.scrollY);
    }
  }, [wasScrollingDown, pivot, onClose, showNavbar]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleNavbarStick);
    }
    return () => window.removeEventListener("scroll", handleNavbarStick);
  }, [pivot, handleNavbarStick]);

  return (
    <Flex
      as={motion.nav}
      direction={"column"}
      position={"sticky"}
      top={0}
      zIndex={90}
      transition="0.1s linear"
      style={showNavbar ? { translate: "0 0%" } : { translate: "0 -100%" }}
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
