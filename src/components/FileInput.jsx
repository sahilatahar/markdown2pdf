import PropTypes from "prop-types";
import { useContext } from "react";
import Context from "../context/ContextProvider";

function FileInput({ fileInputRef }) {
  const { setText } = useContext(Context);

  const onChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target.error) {
          alert("Error while reading file");
          return;
        }
        const content = loadEvent.target.result;
        setText(content);
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <input
      type="file"
      accept=".md, text/markdown"
      className="hidden"
      onChange={onChange}
      ref={fileInputRef}
    />
  );
}

FileInput.propTypes = {
  fileInputRef: PropTypes.object.isRequired,
};

export default FileInput;
