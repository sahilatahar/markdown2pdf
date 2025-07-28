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
      className="absolute left-0 top-0 max-h-full min-h-full w-full min-w-[50%] translate-x-full overflow-auto transition-transform duration-500 sm:static sm:w-[50%] sm:translate-x-0 print:static print:w-full print:translate-x-0 print:overflow-visible print:h-auto print:max-h-none print:min-h-0"
      ref={previewRef}
    >
      <MarkdownPreview
        source={text}
        className="preview overflow-auto p-2 print:overflow-visible print:h-auto print:max-h-none"
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
        style={{ 
          listStyleType: "disc"
        }}
      />
      
      {/* Simple print styles with 10mm margin */}
      <style jsx>{`
        @media print {
          .preview {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            padding: 0mm !important;
            margin: 0 !important;
          }
          
          /* GitHub-style table styling for print */
          .preview table {
            width: 100% !important;
            max-width: 100% !important;
            table-layout: auto !important;
            border-collapse: collapse !important;
            border-spacing: 0 !important;
            margin: 16px 0 !important;
            border: 1px solid #d1d9e0 !important;
            border-radius: 6px !important;
            overflow: hidden !important;
          }
          
          .preview table th {
            background-color: #f6f8fa !important;
            border: 1px solid #d1d9e0 !important;
            border-bottom: 2px solid #d1d9e0 !important;
            padding: 6px 13px !important;
            font-weight: 600 !important;
            text-align: left !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            color: #24292f !important;
          }
          
          .preview table td {
            border: 1px solid #d1d9e0 !important;
            border-top: none !important;
            padding: 6px 13px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            color: #24292f !important;
          }
          
          .preview table tr {
            border-top: 1px solid #d1d9e0 !important;
          }
          
          .preview table tr:first-child {
            border-top: none !important;
          }
          
          .preview table tr:nth-child(2n) {
            background-color: #f6f8fa !important;
          }
          
          .preview table tr:nth-child(2n+1) {
            background-color: #ffffff !important;
          }
          
          /* Ensure right border is visible */
          .preview table th:last-child,
          .preview table td:last-child {
            border-right: 1px solid #d1d9e0 !important;
          }
          
          /* Ensure bottom border is visible */
          .preview table tr:last-child td {
            border-bottom: 1px solid #d1d9e0 !important;
          }
          
          /* Ensure images fit within page */
          .preview img {
            max-width: 100% !important;
            height: auto !important;
          }
          
          /* Handle code blocks properly */
          .preview pre, .preview code {
            white-space: pre-wrap !important;
            word-wrap: break-word !important;
          }
        }
      `}</style>
    </div>
  );
}

MdPreviewComponent.propTypes = {
  previewRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default MdPreviewComponent;
