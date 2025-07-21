import mermaid from "mermaid";
import PropTypes from "prop-types";
import { memo, useEffect, useRef } from "react";

// Initialize Mermaid globally once
if (!mermaid.initialized) {
  mermaid.initialize({ startOnLoad: false, theme: "default" });
  mermaid.initialized = true;
}

const Mermaid = memo(({ chart }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const containerElem = containerRef.current;

    const renderChart = async () => {
      if (!containerElem) return;

      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).substring(2, 9)}`,
          chart,
        );
        if (isMounted && containerElem) {
          containerElem.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid syntax error:", error);
        // ⛔ Throw to block the page
        throw new Error(`Mermaid syntax error: ${error.message}`);
      }
    };

    renderChart();

    return () => {
      isMounted = false; // prevent innerHTML after unmount
      if (containerElem) {
        containerElem.innerHTML = "";
      }
    };
  }, [chart]);

  return <div ref={containerRef} />;
});

Mermaid.propTypes = {
  chart: PropTypes.string.isRequired,
};

Mermaid.displayName = "Mermaid";

export default Mermaid;
