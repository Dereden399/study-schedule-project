import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Schedule } from "../types";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import EditScheduleModal from "./ModalsAndOther/EditScheduleModal";
import useAppDispatch from "../hooks/useAppDispatch";
import deleteSchedule from "../store/reducers/actions/deleteSchedule";

const ScheduleBox = ({ schedule }: { schedule: Schedule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const cancelBtnRef = useRef(null);
  const dispatch = useAppDispatch();

  const deleteHandler = async () => {
    await dispatch(deleteSchedule(schedule.id));
    onAlertClose();
  };

  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.700")}
      px="2"
      py="4"
      rounded={"lg"}
      w="full"
      cursor={"pointer"}
      as={motion.div}
      h={isOpen ? "12rem" : "5rem"}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
      _hover={isOpen ? {} : { transform: "scale(1.01)" }}
      transition="0.1s ease-in-out"
      shadow={"md"}
    >
      <AlertDialog
        size="xl"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        leastDestructiveRef={cancelBtnRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="3xl" fontWeight="bold">
              Delete Schedule
            </AlertDialogHeader>

            <AlertDialogBody fontSize="xl">
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelBtnRef} onClick={onAlertClose} size="lg">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteHandler}
                ml={3}
                size="lg"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <EditScheduleModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        schedule={schedule}
      />
      <HStack>
        <VStack w="full" alignItems={"start"}>
          <Heading as="h3" size="xl" noOfLines={1} wordBreak={"break-all"}>
            {schedule.name}
          </Heading>
          {isOpen && (
            <Box
              maxH="7rem"
              overflowX={"hidden"}
              w="full"
              ms="1"
              overflowY={"scroll"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "100px",
                  background: "teal",
                },
              }}
            >
              <Text
                fontSize="xl"
                wordBreak={"break-all"}
                onClick={(e) => e.stopPropagation()}
              >
                {schedule.description
                  ? schedule.description
                  : "No description provided..."}
              </Text>
            </Box>
          )}
        </VStack>
        <VStack onClick={(e) => e.stopPropagation()}>
          <Link
            as={RouterLink}
            to={`/schedules/${schedule.id}`}
            fontSize={"2xl"}
          >
            Open
          </Link>
          {isOpen && (
            <>
              <Button
                colorScheme="teal"
                variant={"solid"}
                onClick={onModalOpen}
                size={"lg"}
              >
                Edit
              </Button>
              <Button
                colorScheme="teal"
                variant={"outline"}
                onClick={onAlertOpen}
                size={"lg"}
              >
                Delete
              </Button>
            </>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};

export default ScheduleBox;
