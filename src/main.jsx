import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";
import "./global.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
