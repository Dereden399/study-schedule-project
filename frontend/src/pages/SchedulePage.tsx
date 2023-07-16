import { Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const SchedulePage = () => {
  const id = useParams().id;
  return <Container maxW={"xl"}>Hello, {id}</Container>;
};

export default SchedulePage;
