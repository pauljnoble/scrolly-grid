import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Scroller from "src/components/Scroller";
import { useWindowSize } from "usehooks-ts";
import { Grid, Positioner, Root, ScrollerOuter, ScrollItem } from "./style";

const grids = {
  lg: [
    {
      items: [
        { cols: [2, 4], rows: [1, 4] },
        { cols: [8, 16], rows: [4, 8] },
        { cols: [2, 4], rows: [5, 9] },
      ],
    },
    {
      items: [
        { cols: [2, 6], rows: [1, 4] },
        { cols: [8, 17], rows: [5, 9] },
        { cols: [1, 3], rows: [3, 6] },
      ],
    },
    {
      items: [
        { cols: [2, 6], rows: [1, 3] },
        { cols: [8, 17], rows: [4, 9] },
        { cols: [2, 4], rows: [4, 8] },
      ],
    },
    {
      items: [
        { cols: [2, 4], rows: [2, 5] },
        { cols: [12, 17], rows: [4, 9] },
        { cols: [1, 5], rows: [6, 9] },
      ],
    },
  ],
  sm: [
    {
      items: [
        { cols: [2, 4], rows: [1, 4] },
        { cols: [3, 5], rows: [4, 7] },
        { cols: [2, 4], rows: [5, 6] },
      ],
    },
    {
      items: [
        { cols: [2, 6], rows: [1, 4] },
        { cols: [4, 6], rows: [5, 7] },
        { cols: [1, 3], rows: [3, 6] },
      ],
    },
    {
      items: [
        { cols: [2, 6], rows: [1, 3] },
        { cols: [4, 7], rows: [2, 4] },
        { cols: [2, 4], rows: [4, 7] },
      ],
    },
    {
      items: [
        { cols: [2, 4], rows: [2, 5] },
        { cols: [3, 6], rows: [4, 7] },
        { cols: [1, 5], rows: [5, 7] },
      ],
    },
  ],
};

const Tile = ({
  prevIncrement,
  nextIncrement,
  itemLayout,
  index,
  scrollYProgress,
  currRect,
  nextRect,
}: any) => {
  const xDelta = nextRect.x - currRect.x;
  const yDelta = nextRect.y - currRect.y;
  const scaleYDelta = nextRect.height / currRect.height;
  const scaleXDelta = nextRect.width / currRect.width;

  const x = useTransform(
    scrollYProgress,
    [prevIncrement, nextIncrement],
    [0, xDelta]
  );

  const y = useTransform(
    scrollYProgress,
    [prevIncrement, nextIncrement],
    [0, yDelta]
  );

  const scaleX = useTransform(
    scrollYProgress,
    [prevIncrement, nextIncrement],
    [1, scaleXDelta]
  );

  const scaleY = useTransform(
    scrollYProgress,
    [prevIncrement, nextIncrement],
    [1, scaleYDelta]
  );

  const scaleXInv = useTransform(
    scrollYProgress,
    [prevIncrement, nextIncrement],
    [1, 1 / scaleXDelta]
  );

  const scaleYInv = useTransform(
    scrollYProgress,
    [prevIncrement, nextIncrement],
    [1, 1 / scaleYDelta]
  );

  return (
    <motion.div
      style={{
        x,
        y,
        scaleX,
        scaleY,
        gridColumnStart: itemLayout.cols[0],
        gridColumnEnd: itemLayout.cols[1],
        gridRowStart: itemLayout.rows[0],
        gridRowEnd: itemLayout.rows[1],
        transformOrigin: "0 0",
        outline: "1px solid rgba(255, 255, 255, 1)",
      }}
    >
      <motion.div
        style={{ scaleX: scaleXInv, scaleY: scaleYInv, transformOrigin: "0 0" }}
      >
        {index === 2 ? <img src={`/tmp-02.jpeg`} alt="No" /> : "Grid"}
      </motion.div>
    </motion.div>
  );
};

const bp = (width: number): keyof typeof grids => {
  if (width > 768) {
    return "lg";
  }
  return "sm";
};

const App = () => {
  const refs = useRef<(HTMLElement | null)[]>([null, null]);
  const scrollerRef = useRef<HTMLDivElement>(document.createElement("div"));
  const { scrollYProgress } = useScroll({ container: scrollerRef });
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextRects, setNextRects] = useState<DOMRect[]>([]);
  const [currRects, setCurrRects] = useState<DOMRect[]>([]);

  const { width } = useWindowSize();
  const bpKey = bp(width);

  const getRects = (index: number) => {
    const childArr: HTMLElement[] = Array.prototype.slice.call(
      refs.current[index]!.children
    );
    const rects = [];
    for (let child of childArr) {
      rects.push(child.getBoundingClientRect());
    }

    return rects;
  };

  useEffect(() => {
    // Get the layouts for current, prev, next DOMRects
    let currIndex = activeIndex;
    let nextIndex = activeIndex + 1;

    if (!grids[bpKey][nextIndex]) {
      console.log("no next");
      nextIndex = grids[bpKey].length - 1;
    }

    const currRects = getRects(currIndex);
    const nextRects = getRects(nextIndex);

    setNextRects(nextRects);
    setCurrRects(currRects);
  }, [activeIndex]);

  scrollYProgress.on("change", (e) => {
    const increment = 1 / (grids[bpKey].length - 1);
    const implied = Math.floor(e / increment);

    if (activeIndex !== implied) {
      setActiveIndex(implied);
    }
  });

  return (
    <>
      <Root>
        <Positioner>
          {!!currRects.length &&
            currRects.map((c, i) => {
              if (!grids[bpKey][activeIndex]) {
                console.log("no found");
              }

              return (
                <Tile
                  key={i}
                  itemLayout={grids[bpKey][activeIndex].items[i]}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  currRect={c}
                  nextRect={nextRects[i]}
                  prevIncrement={(1 / (grids[bpKey].length - 1)) * activeIndex}
                  nextIncrement={
                    (1 / (grids[bpKey].length - 1)) * (activeIndex + 1)
                  }
                />
              );
            })}
        </Positioner>

        {grids[bpKey].map((grid, i) => {
          const lastIndex = grid.items.length - 1;

          return (
            <Grid ref={(el) => (refs.current[i] = el)}>
              {grid.items.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      gridColumnStart: item.cols[0],
                      gridColumnEnd: item.cols[1],
                      gridRowStart: item.rows[0],
                      gridRowEnd: item.rows[1],
                    }}
                  ></div>
                );
              })}
            </Grid>
          );
        })}
      </Root>
      <ScrollerOuter ref={scrollerRef}>
        {/* <Scroller> */}
        {grids[bpKey].map((_, i) => (
          <ScrollItem key={i}>{i}</ScrollItem>
        ))}
        {/* </Scroller> */}
      </ScrollerOuter>
    </>
  );
};

export default App;
