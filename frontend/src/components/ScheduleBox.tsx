import {
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Schedule } from "../types";
import { useState } from "react";
import { motion } from "framer-motion";

const ScheduleBox = ({ schedule }: { schedule: Schedule }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteHandler = () => {
    return null;
  };

  const editHandler = () => {
    return null;
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
      transition="0.1s ease-in-out"
    >
      <HStack>
        <VStack w="full" alignItems={"start"}>
          <Heading as="h3" size="xl" noOfLines={1} wordBreak={"break-all"}>
            {schedule.name}
          </Heading>
          {isOpen && (
            <Text
              ms="1"
              fontSize="xl"
              wordBreak={"break-all"}
              overflow={"scroll"}
              maxH={"7rem"}
            >
              {schedule.description
                ? schedule.description
                : "No description provided..."}
            </Text>
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
                onClick={editHandler}
                size={"lg"}
              >
                Edit
              </Button>
              <Button
                colorScheme="teal"
                variant={"outline"}
                onClick={deleteHandler}
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
