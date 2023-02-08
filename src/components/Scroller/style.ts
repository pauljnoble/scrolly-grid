import styled from "styled-components";

export const Root = styled.div`
  > div {
    height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
    color: #eee;
    pointer-events: none;
  }
`;
