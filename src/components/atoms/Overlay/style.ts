import styled from "styled-components";

const Container = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  width: 100vw;
  height: 100%;
  transition: background-color, 200ms;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
  z-index: 100;
  ${(props) =>
    props.isActive &&
    `
    pointer-events: auto;
    background-color: rgba(0, 0, 0, 0.4);
  `}
`;

export { Container };
