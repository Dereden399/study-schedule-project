import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  Heading,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { ToolbarProps, View, Navigate } from "react-big-calendar";
import { CalendarEvent } from "../../types";

const CustomToolbar = (props: ToolbarProps<CalendarEvent, object>) => {
  return (
    <Flex
      direction={{ base: "column-reverse", md: "row" }}
      alignItems={"center"}
      justifyContent={"space-between"}
      mb="3"
    >
      <Tabs position="relative" variant="unstyled">
        <TabList>
          {(props.views as View[]).map((viewName) => (
            <Tab onClick={() => props.onView(viewName)} key={viewName}>
              {props.localizer.messages[viewName]}
            </Tab>
          ))}
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="teal" borderRadius="1px" />
      </Tabs>
      <Heading size="lg">{props.label}</Heading>
      <ButtonGroup isAttached size="md" variant={"outline"} colorScheme="teal">
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={() => props.onNavigate(Navigate.PREVIOUS)}
        >
          {props.localizer.messages.previous}
        </Button>
        <Button
          onClick={() => props.onNavigate(Navigate.TODAY)}
          variant={"solid"}
        >
          {props.localizer.messages.today}
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={() => props.onNavigate(Navigate.NEXT)}
        >
          {props.localizer.messages.next}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default CustomToolbar;
