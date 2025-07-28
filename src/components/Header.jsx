import { useContext, useRef } from "react";
import Context from "../context/ContextProvider";
import { printHandler } from "../utils/printUtils";
import FileInput from "./FileInput";

function Header() {
  const { text } = useContext(Context);
  const fileInputRef = useRef(null);

  const onConvert = () => {
    printHandler();
    window.print();
  };

  const onChooseFile = () => {
    fileInputRef.current.click();
  };

  const generateFileName = (text) => {
    const lines = text.split('\n');
    let filename = '';
    
    // Look for first, second, then third heading
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('#')) {
        // Extract heading text (remove # symbols and clean up)
        filename = trimmedLine
          .replace(/^#+\s*/, '') // Remove # symbols and spaces
          .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
          .trim()
          .substring(0, 50); // Limit length to 50 characters
        
        if (filename) {
          break; // Use the first heading found
        }
      }
    }
    
    // If no heading found, use timestamp
    if (!filename) {
      filename = `markdown-${new Date().toISOString().split('T')[0]}`;
    }
    
    // Replace spaces with hyphens and make lowercase
    filename = filename.replace(/\s+/g, '-').toLowerCase();
    
    return `${filename}.md`;
  };

  const handleMarkdownSave = async () => {
    const isConfirmed = confirm("Do you want to download the markdown?");
    if (!isConfirmed) return;
    
    const filename = generateFileName(text);
    
    // Check if the File System Access API is supported (Chrome, Edge)
    if ('showSaveFilePicker' in window) {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [
            {
              description: 'Markdown files',
              accept: {
                'text/markdown': ['.md'],
              },
            },
          ],
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(text);
        await writable.close();
        return;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error saving file:', error);
        }
        return; // Don't fallback if user cancels or there's an error
      }
    }
    
    // For browsers that don't support File System Access API
    // Show alert and use traditional download
    alert('Your browser doesn\'t support the native save dialog. The file will be downloaded to your default downloads folder.');
    
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-1 bg-secondary px-1 py-1 sm:px-4 print:hidden">
      <h3 className="min-w-fit text-lg font-bold">MD2PDF</h3>
      <div className="flex gap-1">
        <button
          className="flex items-center gap-2 rounded-sm border border-black px-3 py-1"
          onClick={handleMarkdownSave}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg"
            alt="markdown"
            className="size-6"
          />
          Save
        </button>
        <button
          className="rounded-sm border border-black px-3 py-1"
          onClick={onChooseFile}
        >
          📁 Open
        </button>
        <button
          className="rounded-sm border border-black px-3 py-1"
          onClick={onConvert}
        >
          🎉 PDF
        </button>
      </div>

      <FileInput fileInputRef={fileInputRef} />
    </header>
  );
}

export default Header;
