import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 80%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  z-index: 10;
`;

const Row = styled.div`
  padding: 8px 12px;
  &:nth-of-type(2n) {
    background-color: #dddddd;
  }
`;

export { Container, Row };