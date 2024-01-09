import { useEffect } from "react";

function usePageEvents() {
  useEffect(() => {
    // Prevent user from leaving the page
    const beforeUnloadHandler = (e) => {
      const msg = "Please check and backup the change before refresh or leave.";
      return (e.returnValue = msg);
    };
    
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);
}

export default usePageEvents;
