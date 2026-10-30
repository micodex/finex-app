import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { AppProviders } from "@/appProviders";

import "@/index.css";
import { BrowserRouter } from "react-router-dom";

// Check if the app is running in production mode
const basename = import.meta.env.MODE === "production" ? "/finex-app" : "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
);
