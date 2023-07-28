import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import InfoSign from "../components/InfoSign";
import CoursesList from "../components/CoursesList";
import MyCalendar from "../components/Calendar";
import { useRef } from "react";

const SchedulePage = () => {
  const id = useParams().id;
  const schedule = useAppSelector((state) =>
    state.schedule.schedules.find((x) => x.id == id)
  );
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const openDrawerBtnRef = useRef<HTMLButtonElement>(null);

  if (!schedule) return <ScheduleNotFound />;

  return (
    <Container maxW={"8xl"} pt="5rem">
      <Heading as="h1" size={"xl"}>
        {schedule.name}
      </Heading>
      <Flex
        direction={{ base: "column", lg: "row" }}
        mt="5"
        gap={5}
        position={"relative"}
      >
        <Button
          ref={openDrawerBtnRef}
          colorScheme="teal"
          size={"lg"}
          maxW="md"
          w="full"
          alignSelf={"center"}
          display={{ base: "flex", lg: "none" }}
          onClick={onDrawerOpen}
        >
          Open courses menu
        </Button>

        <Box display={{ base: "none", lg: "flex" }} w="full" maxW="md">
          <CoursesList />
        </Box>
        <MyCalendar />
      </Flex>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        finalFocusRef={openDrawerBtnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <CoursesList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

const ScheduleNotFound = () => {
  return (
    <Container maxW={"2xl"} pt={"5rem"}>
      <InfoSign
        iconSize={15}
        header="Schedule not found..."
        info={
          <Link as={RouterLink} to="/schedules" color={"teal.400"}>
            Back to schedules
          </Link>
        }
      />
    </Container>
  );
};

export default SchedulePage;
