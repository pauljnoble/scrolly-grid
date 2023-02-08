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
  border: 1px solid white;
`;

const absoluteFillStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const cols = Array.from(Array(16).keys());
const rows = Array.from(Array(9).keys());

const commonGridStyles = css`
  ${absoluteFillStyles}
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(8, 1fr);
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

  ${cols.map((c, i) => {
    return `
    > span.vert:nth-of-type(${i + 1}) {
      grid-column-start: ${i + 1};
    }
    `;
  })}

  ${rows.map((c, i) => {
    return `
    > span.hoz:nth-of-type(${i + 1 + cols.length - 1}) {
      grid-row-start: ${i + 1};
    }
    `;
  })}

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
