import styled from "styled-components";

const Container = styled.div<{ height?: string }>`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  height: ${props => props.height ? props.height : "auto"}
`;

const Left = styled.div`
  flex: 0 0 60px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
`;

const Right = styled.div`
  flex: 0 0 60px;
`;

export { Container, Left, Center, Right };
