import MarkdownPreview from "@uiw/react-markdown-preview";
import "katex/dist/katex.min.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import Context from "../context/ContextProvider";
import Mermaid from "./Mermaid";

function extractText(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.props?.children) return extractText(node.props.children);
  return "";
}

function MdPreviewComponent({ previewRef }) {
  const { text } = useContext(Context);

  return (
    <div
  className="
    absolute left-0 top-0 max-h-full min-h-full w-full min-w-[50%] translate-x-full overflow-auto
    transition-transform duration-500
    /* small screens */
    sm:static sm:w-[50%] sm:translate-x-0
    /* print overrides */
   print:relative print:w-full print:translate-x-0 print:overflow-visible
   print:max-h-none print:min-h-0 print:h-auto print:p-0
  "
  ref={previewRef}
>
      <MarkdownPreview
        source={text}
        className="preview overflow-auto p-2 print:p-2"
        wrapperElement={{
          "data-color-mode": "light",
        }}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: ({ children = [], className }) => {
            const rawCode = extractText(children);

            if (className?.includes("language-mermaid")) {
              return <Mermaid chart={rawCode} />;
            }

            return <code className={className}>{children}</code>;
          },
        }}
        style={{ listStyleType: "disc" }}
      />
    </div>
  );
}

MdPreviewComponent.propTypes = {
  previewRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default MdPreviewComponent;
