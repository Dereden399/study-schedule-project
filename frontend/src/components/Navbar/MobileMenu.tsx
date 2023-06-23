import { VStack, useColorModeValue, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <VStack
    as={motion.div}
    transition={"0.05s ease-in-out"}
    initial={{ y: "-100%" }}
    animate={{ y: "0%" }}
    exit={{ y: "-100%" }}
    spacing={4}
    alignItems={"center"}
    display={{ base: "flex", md: "none" }}
    pb={4}
    pt={"1rem"}
    position={"absolute"}
    top={"3rem"}
    width={"full"}
    bg={useColorModeValue("gray.100", "gray.900")}
    fontSize={"xl"}
  >
    <Link as={RouterLink} to="/" onClick={closeMenu}>
      Home
    </Link>
    <Link as={RouterLink} to="/schedules" onClick={closeMenu}>
      Schedules
    </Link>
  </VStack>
);

export default MobileMenu;
