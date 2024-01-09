import MarkdownPreview from "@uiw/react-markdown-preview";
import PropTypes from "prop-types";
import { useContext } from "react";
import Context from "../context/ContextProvider";

function MdPreviewComponent({ previewRef }) {
  const { text } = useContext(Context);

  return (
    <div
      className="absolute left-0 top-0 max-h-full min-h-full w-full min-w-[50%] translate-x-full overflow-auto transition-transform duration-500 sm:static sm:w-[50%] sm:translate-x-0 print:w-full print:translate-x-0 print:overflow-hidden print:p-0"
      ref={previewRef}
    >
      <MarkdownPreview
        source={text}
        className="preview overflow-auto p-4"
        wrapperElement={{
          "data-color-mode": "light",
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
