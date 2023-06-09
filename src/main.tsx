import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
