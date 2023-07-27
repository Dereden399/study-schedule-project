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
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import InfoSign from "../components/InfoSign";
import { SettingsIcon } from "@chakra-ui/icons";
import CoursesList from "../components/CoursesList";
import MyCalendar from "../components/Calendar";
import { useRef, useState } from "react";
import AddCourseModal from "../components/AddCourseModal";
import EditCourseModal from "../components/EditCourseModal";
import { Course } from "../types";

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
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const openDrawerBtnRef = useRef<HTMLButtonElement>(null);
  const [initStartDateForModal, setInitStartDate] = useState<Date | null>(null);
  const [initEndDateForModal, setInitEndDate] = useState<Date | null>(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const openAddModalWithInit = (start: Date | null, end: Date | null) => {
    onEditClose();
    setInitStartDate(start);
    setInitEndDate(end);
    onAddModalOpen();
  };

  const openEditModalFor = (course: Course) => {
    onAddModalClose();
    setCourseToEdit(course);
    onEditOpen();
  };
  if (!schedule) return <ScheduleNotFound />;

  return (
    <Container maxW={"8xl"} pt="5rem">
      <Heading as="h1" size={"xl"}>
        {schedule.name}
        <IconButton aria-label="Edit schedule" icon={<SettingsIcon />} ms={1} />
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
          <CoursesList
            onAddModalOpen={openAddModalWithInit}
            handleEdit={openEditModalFor}
          />
        </Box>
        <MyCalendar
          openAddCourseModal={openAddModalWithInit}
          openEditCourseModal={openEditModalFor}
        />
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
            <CoursesList
              onAddModalOpen={openAddModalWithInit}
              handleEdit={openEditModalFor}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        initStart={initStartDateForModal}
        initEnd={initEndDateForModal}
      />
      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={onEditClose}
        course={courseToEdit}
      />
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
