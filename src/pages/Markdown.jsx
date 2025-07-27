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
    <div className="flex flex-col overflow-hidden print:h-auto print:max-h-none">
    <Header />
    <section className="relative flex flex-grow flex-row overflow-hidden print:overflow-visible print:max-h-none print:h-auto">
        <MarkdownEditor />
        <MarkdownPreview previewRef={previewRef} />
      </section>
      {/* Preview button for mobile */}
      <PreviewButton previewRef={previewRef} />
    </div>
  );
}

export default Markdown;
