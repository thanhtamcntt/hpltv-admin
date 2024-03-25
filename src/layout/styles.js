import styled from 'styled-components';

export const DivContainerWeb = styled.div`
  display: flex;
  height: auto;
`;

export const DivSider = styled.div`
  position: relative;
  width: 200px;
  max-width: 200px;
  min-width: 200px;
  background-color: #f5f5f5;
  & > div {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100vh;
    overflow: hidden;
  }
`;
