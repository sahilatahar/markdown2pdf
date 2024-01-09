import { useRef } from "react";
import FileInput from "./FileInput";
import { printHandler } from "../utils/printUtils";

function Header() {
  const fileInputRef = useRef(null);

  const onConvert = () => {
    printHandler();
    window.print();
  };

  const onChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-1 bg-secondary px-1 py-1 sm:px-4 print:hidden">
      <h1 className="min-w-fit text-lg font-bold">markdown2pdf</h1>
      <div className="flex gap-1">
        <button
          className="rounded-sm border border-black px-3 py-1"
          onClick={onChooseFile}
        >
          📁 Choose
        </button>
        <button
          className="rounded-sm border border-black px-3 py-1"
          onClick={onConvert}
        >
          🎉 Convert
        </button>
      </div>

      <FileInput fileInputRef={fileInputRef} />
    </header>
  );
}

export default Header;
