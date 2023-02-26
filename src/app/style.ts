import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const Root = styled.div`
  position: fixed;
  margin: auto;
  left: 20px;
  right: 20px;
  bottom: 20px;
  top: 20px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid white; */
`;

const absoluteFillStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const colsSm = Array.from(Array(6).keys());
const rowsSm = Array.from(Array(8).keys());

const colsLg = Array.from(Array(16).keys());
const rowsLg = Array.from(Array(9).keys());

const commonGridStyles = css`
  ${absoluteFillStyles}
  display: grid;

  width: 100%;
  grid-column-gap: 20px;

  > span.vert {
    grid-row-start: 1;
    grid-row-end: 9;
    display: inline-block;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
  }

  > span.hoz {
    grid-column-start: 1;
    grid-column-end: 17;
    height: 1px;
    border-top: 1px solid #333;
    display: inline-block;
  }

  grid-template-columns: repeat(${colsSm.length}, 1fr);
  grid-template-rows: repeat(${rowsSm.length}, 1fr);

  ${colsSm.map((c, i) => {
    return `
    > span.vert:nth-of-type(${i + 1}) {
      grid-column-start: ${i + 1};
    }
    `;
  })}

  ${rowsSm.map((c, i) => {
    return `
    > span.hoz:nth-of-type(${i + 1 + colsSm.length - 1}) {
      grid-row-start: ${i + 1};
    }
    `;
  })}

  /* Large */
  @media (min-width: 768px) {
    grid-template-columns: repeat(${colsLg.length}, 1fr);
    grid-template-rows: repeat(${rowsLg.length}, 1fr);

    ${colsLg.map((c, i) => {
      return `
    > span.vert:nth-of-type(${i + 1}) {
      grid-column-start: ${i + 1};
    }
    `;
    })}

    ${rowsLg.map((c, i) => {
      return `
    > span.hoz:nth-of-type(${i + 1 + colsLg.length - 1}) {
      grid-row-start: ${i + 1};
    }
    `;
    })}
  }

  > div {
    overflow: hidden;
    position: relative;
    font-size: 72px;
    font-weight: 700;
  }

  img {
    position: relative;
    height: 100%;
    object-fit: cover;
  }
`;

export const Positioner = styled(motion.div)`
  ${commonGridStyles}
`;

export const Grid = styled.div`
  ${commonGridStyles}
  pointer-events: none;
`;

export const ScrollerOuter = styled.div`
  position: fixed;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  /* background-color: blue; */
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

export const ScrollItem = styled.div`
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
  opacity: 0;
`;
