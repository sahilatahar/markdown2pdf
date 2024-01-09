import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)