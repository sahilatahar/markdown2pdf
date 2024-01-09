export const printHandler = () => {

    const preview = document.querySelector(".preview");
    const previewTitle = preview.querySelector("h1");

    if (previewTitle) {
      const printTitle = previewTitle.innerText;

      const currentTitle = document.title;
      document.title = printTitle;
      
      window.requestAnimationFrame(() => {
        document.title = currentTitle;
      });
    }
}