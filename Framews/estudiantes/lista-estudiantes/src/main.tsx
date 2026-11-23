import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./CSS/index.css";
import "./CSS/styles.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
