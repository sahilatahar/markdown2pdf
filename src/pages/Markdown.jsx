import { useRef } from "react";
import Header from "../components/Header";
import MarkdownEditor from "../components/MdEditorComponent";
import MarkdownPreview from "../components/MdPreviewComponent";
import PreviewButton from "../components/PreviewButton";
import usePageEvents from "../hooks/usePageEvents";

function Markdown() {
  const previewRef = useRef(null);

  // Custom hook to handle page events
  usePageEvents();

  return (
    <>
      <div className="flex h-dvh max-h-dvh min-h-dvh flex-col overflow-hidden print:h-auto print:max-h-none print:min-h-0 print:overflow-visible">
        <Header />
        <section className="relative flex max-h-full flex-grow flex-row overflow-hidden print:overflow-visible print:h-auto print:max-h-none">
          <MarkdownEditor />
          <MarkdownPreview previewRef={previewRef} />
        </section>
        {/* Preview button for mobile */}
        <PreviewButton previewRef={previewRef} />
      </div>
      
      {/* Simple global print styles with 10mm margin */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 10mm;
            size: A4;
          }
          
          body {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          html {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Hide non-essential elements during print */
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Markdown;
