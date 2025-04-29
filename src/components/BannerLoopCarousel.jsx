import { useState, useEffect, useRef, useCallback } from "react";
import "./InfiniteLooper.css";

const InfiniteLooper = ({ speed, direction, children }) => {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  function resetAnimation() {
    if (innerRef.current) {
      innerRef.current.setAttribute("data-animate", "false");
      setTimeout(() => {
        innerRef.current?.setAttribute("data-animate", "true");
      }, 10);
    }
  }

  const setupInstances = useCallback(() => {
    if (!innerRef.current || !outerRef.current) return;

    const { width } = innerRef.current.getBoundingClientRect();
    const { width: parentWidth } = outerRef.current.getBoundingClientRect();

    const widthDeficit = parentWidth - width;
    const instanceWidth = width / innerRef.current.children.length;

    if (widthDeficit > 0) {
      setLooperInstances((prev) => prev + Math.ceil(widthDeficit / instanceWidth) + 1);
    }

    resetAnimation();
  }, []);

  useEffect(() => setupInstances(), [setupInstances]);

  useEffect(() => {
    window.addEventListener("resize", setupInstances);
    return () => window.removeEventListener("resize", setupInstances);
  }, [setupInstances]);

  return (
    <div className="looper" ref={outerRef}>
      <div className="looper__innerList" ref={innerRef} data-animate="true">
        {[...Array(looperInstances)].map((_, ind) => (
          <div
            key={ind}
            className="looper__listInstance"
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "right" ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteLooper;