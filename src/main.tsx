import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { AppProviders } from "@/appProviders";

import "@/index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
