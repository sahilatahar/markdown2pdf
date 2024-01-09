import previewIcon from "../assets/preview.svg";
import closeIcon from "../assets/close.svg";
import PropTypes from "prop-types";
import { useState } from "react";

function PreviewButton({ previewRef }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const togglePreview = () => {
    if (isPreviewOpen) {
      previewRef.current.classList.add("translate-x-full");
    } else {
      previewRef.current.classList.remove("translate-x-full");
    }
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <button
      className="z-100 fixed bottom-6 right-6 rounded-full bg-white p-3 sm:hidden print:hidden"
      style={{ border: "1px solid #282b2e" }}
      onClick={togglePreview}
    >
      <img src={isPreviewOpen ? closeIcon : previewIcon} alt="preview" />
    </button>
  );
}

PreviewButton.propTypes = {
  previewRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default PreviewButton;
