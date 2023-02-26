import styled from "styled-components";

export const Root = styled.div`
  overflow: hidden;

  > div {
    /* height: 100vh; */
    height: -webkit-fill-available;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
    color: #eee;
    pointer-events: none;
    /* border: 1px solid white; */
  }
`;
