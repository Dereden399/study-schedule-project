import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import NewScheduleForm from "../NewScheduleForm";

const AddSchedulePopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover
      placement={"bottom-end"}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          leftIcon={<AddIcon />}
          size={"lg"}
          colorScheme={"teal"}
          data-cy="open-addSchedule-popover"
        >
          Add
        </Button>
      </PopoverTrigger>
      <PopoverContent w={{ sm: "full", md: "30rem" }}>
        <PopoverArrow />
        <PopoverHeader fontSize={"3xl"}>Add a new schedule</PopoverHeader>
        <PopoverBody>
          <NewScheduleForm onClose={onClose} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddSchedulePopover;
