import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal"></Row>
        <Row type="vertical"></Row>
        <Heading as="h1">Hello World!</Heading>
        <Button
          variation="primary"
          size="medium"
          onClick={() => alert("check ")}
        >
          Check In
        </Button>
        <Button variation="danger" size="small" onClick={() => alert("check ")}>
          Check In
        </Button>
        <Heading as="h2">Hello World!</Heading>
        <Heading as="h3">Hello World!</Heading>
        <Input type="number" placeholder="Number of guests"></Input>
      </StyledApp>
    </>
  );
}

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default App;
